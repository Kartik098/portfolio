import { pgTable, text, timestamp, boolean, integer, decimal, varchar, json, index, primaryKey } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

// Better Auth Tables
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull(),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt'),
  updatedAt: timestamp('updatedAt'),
})

// E-Commerce Tables
export const products = pgTable('products', {
  id: text('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal('originalPrice', { precision: 10, scale: 2 }),
  image: text('image'),
  images: json('images'),
  category: varchar('category', { length: 100 }).notNull(),
  stock: integer('stock').notNull().default(0),
  sku: varchar('sku', { length: 100 }).unique(),
  rating: decimal('rating', { precision: 3, scale: 2 }).default(0),
  reviewCount: integer('reviewCount').default(0),
  active: boolean('active').default(true),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
}, (t) => [
  index('idx_category').on(t.category),
  index('idx_active').on(t.active),
])

export const cartItems = pgTable('cartItems', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull().references(() => user.id),
  productId: text('productId').notNull().references(() => products.id),
  quantity: integer('quantity').notNull().default(1),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
}, (t) => [
  index('idx_userId').on(t.userId),
])

export const wishlists = pgTable('wishlists', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull().references(() => user.id),
  productId: text('productId').notNull().references(() => products.id),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
}, (t) => [
  index('idx_userId_productId').on(t.userId, t.productId),
])

export const orders = pgTable('orders', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull().references(() => user.id),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  items: json('items').notNull(),
  shippingAddress: json('shippingAddress'),
  stripePaymentIntentId: text('stripePaymentIntentId'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
}, (t) => [
  index('idx_userId').on(t.userId),
  index('idx_status').on(t.status),
])

export const reviews = pgTable('reviews', {
  id: text('id').primaryKey(),
  productId: text('productId').notNull().references(() => products.id),
  userId: text('userId').notNull().references(() => user.id),
  rating: integer('rating').notNull(),
  title: varchar('title', { length: 255 }),
  content: text('content'),
  verified: boolean('verified').default(false),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
}, (t) => [
  index('idx_productId').on(t.productId),
  index('idx_userId').on(t.userId),
])

export const inventory = pgTable('inventory', {
  id: text('id').primaryKey(),
  productId: text('productId').notNull().references(() => products.id),
  quantity: integer('quantity').notNull(),
  reserved: integer('reserved').default(0),
  lastRestockDate: timestamp('lastRestockDate'),
  lowStockThreshold: integer('lowStockThreshold').default(10),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
}, (t) => [
  index('idx_productId').on(t.productId),
])

export const payments = pgTable('payments', {
  id: text('id').primaryKey(),
  orderId: text('orderId').notNull().references(() => orders.id),
  userId: text('userId').notNull().references(() => user.id),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('USD'),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  stripePaymentIntentId: text('stripePaymentIntentId'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
}, (t) => [
  index('idx_orderId').on(t.orderId),
  index('idx_userId').on(t.userId),
])

// Export all tables for schema
export const schema = {
  user,
  session,
  account,
  verification,
  products,
  cartItems,
  wishlists,
  orders,
  reviews,
  inventory,
  payments,
}
