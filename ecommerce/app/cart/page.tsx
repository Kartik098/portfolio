import { Header } from '@/components/Header'
import Link from 'next/link'
import { getCart } from '@/app/actions/cart'

export default async function CartPage() {
  const { items, total } = await getCart()

  return (
    <main>
      <Header />
      <div className="container-tight py-16">
        <h1 className="section-title text-4xl mb-8">Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-secondary mb-6">Your cart is empty</p>
            <Link href="/products" className="btn-base btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="card flex items-center gap-4">
                    {item.product.image && (
                      <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <p className="text-primary font-bold">${parseFloat(item.product.price).toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-secondary text-sm">Qty: {item.quantity}</p>
                      <p className="font-bold">${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="card sticky top-20">
                <h2 className="font-bold text-lg mb-4">Order Summary</h2>
                <div className="space-y-2 mb-6 pb-6 border-b">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>$10.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(total * 0.1).toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total</span>
                  <span>${(total + 10 + total * 0.1).toFixed(2)}</span>
                </div>
                <button className="btn-base btn-primary w-full mb-3">Proceed to Checkout</button>
                <Link href="/products" className="btn-base btn-secondary w-full">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
