import { db } from './db'
import { products, inventory } from './db/schema'

export const sampleProducts = [
  {
    id: 'prod-1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality noise-cancelling wireless headphones with 30-hour battery life and premium sound quality.',
    price: '199.99',
    originalPrice: '299.99',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 15,
    sku: 'WH-1000XM4',
    rating: '4.8',
    reviewCount: 245,
  },
  {
    id: 'prod-2',
    name: '4K Webcam',
    description: 'Professional 4K webcam with auto-focus and built-in microphone for streaming and video calls.',
    price: '149.99',
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 8,
    sku: 'CAM-4K-PRO',
    rating: '4.6',
    reviewCount: 89,
  },
  {
    id: 'prod-3',
    name: 'Mechanical Keyboard RGB',
    description: 'Premium mechanical gaming keyboard with RGB lighting and customizable switches.',
    price: '129.99',
    originalPrice: '179.99',
    image: 'https://images.unsplash.com/photo-1587829191301-72f86e40c859?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 22,
    sku: 'KBD-RGB-PRO',
    rating: '4.7',
    reviewCount: 156,
  },
  {
    id: 'prod-4',
    name: 'Ergonomic Office Chair',
    description: 'Premium ergonomic office chair with lumbar support and adjustable armrests for maximum comfort.',
    price: '349.99',
    originalPrice: '499.99',
    image: 'https://images.unsplash.com/photo-1611269431073-fd4a0791ea48?w=500&h=500&fit=crop',
    category: 'Furniture',
    stock: 5,
    sku: 'CHAIR-ERG-01',
    rating: '4.9',
    reviewCount: 312,
  },
  {
    id: 'prod-5',
    name: 'Standing Desk Pro',
    description: 'Motorized standing desk with memory presets and spacious work surface.',
    price: '599.99',
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1593642632560-18f7c1ddbe8e?w=500&h=500&fit=crop',
    category: 'Furniture',
    stock: 3,
    sku: 'DESK-STAND-01',
    rating: '4.8',
    reviewCount: 203,
  },
  {
    id: 'prod-6',
    name: 'USB-C Hub 7-in-1',
    description: 'Compact 7-in-1 USB-C hub with HDMI, SD card reader, and multiple USB ports.',
    price: '49.99',
    originalPrice: '79.99',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    category: 'Accessories',
    stock: 48,
    sku: 'HUB-USB-7IN1',
    rating: '4.5',
    reviewCount: 178,
  },
  {
    id: 'prod-7',
    name: 'Portable SSD 1TB',
    description: 'Ultra-fast portable SSD with 1TB capacity, USB 3.1 Gen 2 connectivity.',
    price: '129.99',
    originalPrice: '149.99',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
    category: 'Storage',
    stock: 17,
    sku: 'SSD-PORT-1TB',
    rating: '4.7',
    reviewCount: 421,
  },
  {
    id: 'prod-8',
    name: 'USB Mouse Wireless',
    description: 'Precision wireless mouse with ergonomic design and 18-month battery life.',
    price: '39.99',
    originalPrice: '59.99',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
    category: 'Accessories',
    stock: 62,
    sku: 'MOUSE-WIRE-01',
    rating: '4.4',
    reviewCount: 234,
  },
  {
    id: 'prod-9',
    name: 'Monitor Light Bar',
    description: 'Auto-dimming monitor light bar that reduces eye strain for extended work sessions.',
    price: '89.99',
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1559033615-cd4628902d4a?w=500&h=500&fit=crop',
    category: 'Lighting',
    stock: 11,
    sku: 'LIGHT-MON-01',
    rating: '4.6',
    reviewCount: 112,
  },
  {
    id: 'prod-10',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    price: '34.99',
    originalPrice: '49.99',
    image: 'https://images.unsplash.com/photo-1591290619317-f5e06ad6c4be?w=500&h=500&fit=crop',
    category: 'Accessories',
    stock: 35,
    sku: 'CHARGE-WIRE-01',
    rating: '4.5',
    reviewCount: 267,
  },
]

export async function seedDatabase() {
  try {
    console.log('Seeding database...')

    // Insert products
    for (const product of sampleProducts) {
      await db.insert(products).values({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        stock: product.stock,
        sku: product.sku,
        rating: product.rating,
        reviewCount: parseInt(product.reviewCount),
        active: true,
      }).onConflictDoNothing()

      // Insert inventory records
      await db.insert(inventory).values({
        id: `inv-${product.id}`,
        productId: product.id,
        quantity: product.stock,
        reserved: 0,
        lowStockThreshold: 10,
      }).onConflictDoNothing()
    }

    console.log('Database seeded successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
}
