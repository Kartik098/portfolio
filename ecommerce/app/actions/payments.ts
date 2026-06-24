'use server'

import Stripe from 'stripe'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { orders, payments, cartItems } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
})

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function createCheckoutSession(shippingAddress: {
  fullName: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}) {
  const userId = await getUserId()

  // Get cart items
  const cartItemsData = await db
    .select()
    .from(cartItems)
    .where(eq(cartItems.userId, userId))

  if (cartItemsData.length === 0) {
    throw new Error('Cart is empty')
  }

  // Calculate total
  const total = cartItemsData.reduce((sum, item) => {
    return sum + (parseFloat(item.quantity.toString()) * 100) // Convert to cents
  }, 0)

  // Create Stripe payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'usd',
    metadata: {
      userId,
    },
  })

  // Create order
  const orderId = `order-${Date.now()}`
  await db.insert(orders).values({
    id: orderId,
    userId,
    status: 'pending',
    total: (total / 100).toString(),
    items: JSON.stringify(cartItemsData),
    shippingAddress: JSON.stringify(shippingAddress),
    stripePaymentIntentId: paymentIntent.id,
  })

  // Create payment record
  await db.insert(payments).values({
    id: `payment-${Date.now()}`,
    orderId,
    userId,
    amount: (total / 100).toString(),
    status: 'pending',
    stripePaymentIntentId: paymentIntent.id,
  })

  revalidatePath('/checkout')

  return {
    orderId,
    clientSecret: paymentIntent.client_secret,
  }
}

export async function handlePaymentSuccess(paymentIntentId: string) {
  const payment = await db
    .select()
    .from(payments)
    .where(eq(payments.stripePaymentIntentId, paymentIntentId))
    .limit(1)

  if (!payment[0]) {
    throw new Error('Payment not found')
  }

  // Update payment status
  await db
    .update(payments)
    .set({ status: 'completed' })
    .where(eq(payments.id, payment[0].id))

  // Update order status
  await db
    .update(orders)
    .set({ status: 'confirmed' })
    .where(eq(orders.id, payment[0].orderId))

  // Clear user's cart
  const order = await db
    .select()
    .from(orders)
    .where(eq(orders.id, payment[0].orderId))
    .limit(1)

  if (order[0]) {
    await db
      .delete(cartItems)
      .where(eq(cartItems.userId, order[0].userId))
  }

  revalidatePath('/account/orders')
}

export async function getOrderDetails(orderId: string) {
  const userId = await getUserId()

  const order = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1)

  if (!order[0] || order[0].userId !== userId) {
    throw new Error('Order not found or unauthorized')
  }

  return order[0]
}

export async function getUserOrders() {
  const userId = await getUserId()

  return db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(orders.createdAt)
