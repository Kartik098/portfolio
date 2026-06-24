import { Header } from '@/components/Header'
import { getProducts, getCategories } from '@/app/actions/products'

export default async function ProductsPage() {
  const products = await getProducts({ sortBy: 'newest' })
  const categories = await getCategories()

  return (
    <main>
      <Header />
      <div className="container-tight py-16">
        <h1 className="section-title text-4xl mb-4">Our Products</h1>
        
        {/* Filters */}
        <div className="mb-12 p-6 bg-muted rounded-lg">
          <h2 className="font-bold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat.category} className="badge badge-primary">
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="card">
              <div className="bg-muted h-40 rounded mb-3 flex items-center justify-center">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-secondary">No image</span>
                )}
              </div>
              <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
              <p className="text-lg font-bold text-primary">${parseFloat(product.price).toFixed(2)}</p>
              <p className="text-sm text-secondary mb-4">{product.category}</p>
              <button className="btn-base btn-primary w-full">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
