import { Header } from '@/components/Header'
import Link from 'next/link'
import { getProducts } from './actions/products'

export default async function Home() {
  const featuredProducts = await getProducts({ sortBy: 'newest' }).then(q => q.limit(6))

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-20">
        <div className="container-tight text-center">
          <h1 className="section-title text-4xl md:text-5xl mb-6">
            Premium Shopping Experience
          </h1>
          <p className="section-subtitle text-xl mb-8 max-w-2xl mx-auto">
            Discover high-quality products from trusted brands. Fast shipping, authentic items, and excellent customer support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-base btn-primary px-8 py-3 text-lg">
              Shop Now
            </Link>
            <Link href="#categories" className="btn-base btn-outline px-8 py-3 text-lg">
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container-tight">
          <h2 className="section-title text-3xl md:text-4xl mb-4">
            New Arrivals
          </h2>
          <p className="section-subtitle mb-12">
            Check out our latest products, handpicked for quality and value.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="card group"
              >
                <div className="mb-4 bg-muted rounded-lg overflow-hidden h-48 flex items-center justify-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
                    />
                  ) : (
                    <div className="text-secondary">No image</div>
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-secondary text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold text-primary">
                      ${parseFloat(product.price).toFixed(2)}
                    </p>
                    {product.originalPrice && (
                      <p className="text-sm text-secondary line-through">
                        ${parseFloat(product.originalPrice).toFixed(2)}
                      </p>
                    )}
                  </div>
                  {product.stock > 0 ? (
                    <span className="badge badge-success">In Stock</span>
                  ) : (
                    <span className="badge badge-error">Out of Stock</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white mt-20">
        <div className="container-tight py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">About ShopHub</h4>
              <p className="text-white/70 text-sm">
                Your trusted destination for premium products and exceptional customer service.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/products" className="hover:text-white smooth-transition">Products</Link></li>
                <li><Link href="/cart" className="hover:text-white smooth-transition">Cart</Link></li>
                <li><Link href="/account" className="hover:text-white smooth-transition">Account</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="mailto:support@shophub.com" className="hover:text-white smooth-transition">support@shophub.com</a></li>
                <li><a href="tel:+1234567890" className="hover:text-white smooth-transition">+1 (234) 567-890</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-accent smooth-transition">Twitter</a>
                <a href="#" className="hover:text-accent smooth-transition">Facebook</a>
                <a href="#" className="hover:text-accent smooth-transition">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/50 text-sm">
            <p>&copy; 2024 ShopHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
