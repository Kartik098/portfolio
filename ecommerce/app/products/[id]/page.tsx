import { Header } from '@/components/Header'
import Link from 'next/link'
import { getProductById } from '@/app/actions/products'
import { notFound } from 'next/navigation'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) notFound()

  const avgRating = product.reviews?.length > 0
    ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length).toFixed(1)
    : 'No ratings'

  return (
    <main>
      <Header />
      <div className="container-tight py-8">
        <Link href="/products" className="text-primary hover:underline mb-6 block">
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
            ) : (
              <span className="text-secondary text-lg">No image available</span>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="section-title text-4xl mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="text-2xl font-bold text-primary">
                ${parseFloat(product.price).toFixed(2)}
              </div>
              {product.originalPrice && (
                <div className="text-lg text-secondary line-through">
                  ${parseFloat(product.originalPrice).toFixed(2)}
                </div>
              )}
              <div className="flex-1 text-right">
                <span className="badge badge-primary">
                  ⭐ {avgRating} ({product.reviews?.length || 0} reviews)
                </span>
              </div>
            </div>

            <div className="mb-6 pb-6 border-b">
              <p className="text-secondary mb-2">Category: <span className="text-foreground font-semibold">{product.category}</span></p>
              <p className="text-secondary mb-2">SKU: <span className="text-foreground font-semibold">{product.sku || 'N/A'}</span></p>
              {product.stock > 0 ? (
                <p className="text-success font-semibold">✓ In Stock ({product.stock} available)</p>
              ) : (
                <p className="text-error font-semibold">Out of Stock</p>
              )}
            </div>

            <p className="section-subtitle mb-8">{product.description}</p>

            <div className="space-y-3">
              <button className="btn-base btn-primary w-full text-lg" disabled={product.stock === 0}>
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button className="btn-base btn-outline w-full text-lg">
                ♥ Add to Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-16 pt-16 border-t">
            <h2 className="section-title text-2xl mb-8">Customer Reviews</h2>
            <div className="space-y-4">
              {product.reviews.map(review => (
                <div key={review.id} className="card">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">{review.title}</p>
                      <p className="text-secondary text-sm">★ {review.rating}/5</p>
                    </div>
                    {review.verified && (
                      <span className="badge badge-success">Verified Purchase</span>
                    )}
                  </div>
                  <p className="text-secondary">{review.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
