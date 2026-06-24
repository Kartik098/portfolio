'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { cartItems, products } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getCart() {
  const userId = await getUserId()
  const items = await db
    .select({
      id: cartItems.id,
      productId: cartItems.productId,
      quantity: cartItems.quantity,
      product: {
        id: products.id,
        name: products.name,
        price: products.price,
        image: products.image,
        stock: products.stock,
      },
    })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .where(eq(cartItems.userId, userId))
    .orderBy(desc(cartItems.createdAt))

  const total = items.reduce((sum, item) => {
    return sum + parseFloat(item.product.price) * item.quantity
  }, 0)

  return { items, total }
}

export async function addToCart(productId: string, quantity: number = 1) {
  const userId = await getUserId()

  // Check if product exists
  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, productId))
    .limit(1)

  if (!product[0]) throw new Error('Product not found')

  // Check if already in cart
  const existing = await db
    .select()
    .from(cartItems)
    .where(and(eq(cartItems.userId, userId), eq(cartItems.productId, productId)))
    .limit(1)

  if (existing[0]) {
    await db
      .update(cartItems)
      .set({ quantity: existing[0].quantity + quantity })
      .where(eq(cartItems.id, existing[0].id))
  } else {
    await db.insert(cartItems).values({
      id: `cart-${Date.now()}`,
      userId,
      productId,
      quantity,
    })
  }

  revalidatePath('/cart')
}

export async function updateCartItem(cartItemId: string, quantity: number) {
  const userId = await getUserId()

  if (quantity <= 0) {
    await db
      .delete(cartItems)
      .where(and(eq(cartItems.id, cartItemId), eq(cartItems.userId, userId)))
  } else {
    await db
      .update(cartItems)
      .set({ quantity })
      .where(and(eq(cartItems.id, cartItemId), eq(cartItems.userId, userId)))
  }

  revalidatePath('/cart')
}

export async function removeFromCart(cartItemId: string) {
  const userId = await getUserId()

  await db
    .delete(cartItems)
    .where(and(eq(cartItems.id, cartItemId), eq(cartItems.userId, userId)))

  revalidatePath('/cart')
}

export async function clearCart() {
  const userId = await getUserId()
  await db.delete(cartItems).where(eq(cartItems.userId, userId))
  revalidatePath('/cart')
}
