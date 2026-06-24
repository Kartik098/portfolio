'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { reviews, products } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function createReview(productId: string, data: {
  rating: number
  title: string
  content: string
}) {
  const userId = await getUserId()

  // Validate rating
  if (data.rating < 1 || data.rating > 5) {
    throw new Error('Rating must be between 1 and 5')
  }

  // Check if product exists
  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, productId))
    .limit(1)

  if (!product[0]) throw new Error('Product not found')

  // Create review
  const reviewId = `review-${Date.now()}`
  await db.insert(reviews).values({
    id: reviewId,
    productId,
    userId,
    rating: data.rating,
    title: data.title,
    content: data.content,
    verified: true,
  })

  // Update product rating
  const allReviews = await db
    .select()
    .from(reviews)
    .where(eq(reviews.productId, productId))

  const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length

  await db
    .update(products)
    .set({
      rating: avgRating.toString(),
      reviewCount: allReviews.length,
    })
    .where(eq(products.id, productId))

  revalidatePath(`/products/${productId}`)
  return { id: reviewId }
}

export async function getProductReviews(productId: string) {
  return db
    .select()
    .from(reviews)
    .where(eq(reviews.productId, productId))
    .orderBy(desc(reviews.createdAt))
}

export async function deleteReview(reviewId: string) {
  const userId = await getUserId()

  // Check review ownership
  const review = await db
    .select()
    .from(reviews)
    .where(eq(reviews.id, reviewId))
    .limit(1)

  if (!review[0] || review[0].userId !== userId) {
    throw new Error('Unauthorized')
  }

  await db.delete(reviews).where(eq(reviews.id, reviewId))

  // Update product rating
  const productId = review[0].productId
  const allReviews = await db
    .select()
    .from(reviews)
    .where(eq(reviews.productId, productId))

  if (allReviews.length === 0) {
    await db
      .update(products)
      .set({ rating: '0', reviewCount: 0 })
      .where(eq(products.id, productId))
  } else {
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
    await db
      .update(products)
      .set({
        rating: avgRating.toString(),
        reviewCount: allReviews.length,
      })
      .where(eq(products.id, productId))
  }

  revalidatePath(`/products/${productId}`)
}
