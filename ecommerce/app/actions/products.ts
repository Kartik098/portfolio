'use server'

import { db } from '@/lib/db'
import { products, reviews } from '@/lib/db/schema'
import { desc, eq, sql, ilike, and, gte, lte } from 'drizzle-orm'

export async function getProducts(filters?: {
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'rating'
}) {
  let query = db.select().from(products).where(eq(products.active, true))

  if (filters?.category) {
    query = query.where(eq(products.category, filters.category))
  }

  if (filters?.search) {
    query = query.where(
      sql`(${products.name} ILIKE ${'%' + filters.search + '%'} OR ${products.description} ILIKE ${'%' + filters.search + '%'})`
    )
  }

  if (filters?.minPrice !== undefined) {
    query = query.where(gte(products.price, filters.minPrice.toString()))
  }

  if (filters?.maxPrice !== undefined) {
    query = query.where(lte(products.price, filters.maxPrice.toString()))
  }

  // Sorting
  if (filters?.sortBy === 'price-asc') {
    query = query.orderBy(products.price)
  } else if (filters?.sortBy === 'price-desc') {
    query = query.orderBy(desc(products.price))
  } else if (filters?.sortBy === 'rating') {
    query = query.orderBy(desc(products.rating))
  } else {
    query = query.orderBy(desc(products.createdAt))
  }

  return query.limit(100)
}

export async function getProductById(id: string) {
  const product = await db
    .select()
    .from(products)
    .where(and(eq(products.id, id), eq(products.active, true)))
    .limit(1)

  if (!product[0]) return null

  const productReviews = await db
    .select()
    .from(reviews)
    .where(eq(reviews.productId, id))
    .orderBy(desc(reviews.createdAt))

  return {
    ...product[0],
    reviews: productReviews,
  }
}

export async function getProductsByCategory(category: string) {
  return db
    .select()
    .from(products)
    .where(and(eq(products.category, category), eq(products.active, true)))
    .orderBy(desc(products.createdAt))
    .limit(12)
}

export async function getCategories() {
  const results = await db.execute(
    sql`SELECT DISTINCT category FROM products WHERE active = true ORDER BY category`
  )
  return results as Array<{ category: string }>
}
