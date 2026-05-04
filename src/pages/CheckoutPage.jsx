import { useMemo, useState } from 'react'
import { useCartStore } from '../store'

function CheckoutPage() {
  const items = useCartStore((state) => state.items)
  const [fulfillmentType, setFulfillmentType] = useState('delivery')
  const [paymentMethod, setPaymentMethod] = useState('cod')

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  )

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  )

  const deliveryFee = fulfillmentType === 'delivery' && items.length ? 2.99 : 0
  const total = subtotal + deliveryFee

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_22rem] lg:gap-6">
      <section className="space-y-5 rounded-2xl border border-gray-800 bg-gray-900/50 p-5 shadow-sm sm:p-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl uppercase">
            Checkout
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-400">
            Fill in your details and review your order before placing it.
          </p>
        </div>

        <form className="space-y-5 sm:space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5 text-sm font-bold text-gray-400">
              Name
              <input
                type="text"
                placeholder="John Doe"
                className="w-full rounded-xl border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </label>
            <label className="space-y-1.5 text-sm font-bold text-gray-400">
              Phone
              <input
                type="tel"
                placeholder="+92 123 4567890"
                className="w-full rounded-xl border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </label>
          </div>

          <label className="block space-y-1.5 text-sm font-bold text-gray-400">
            Address
            <textarea
              placeholder="Street, building, floor, apartment..."
              rows={3}
              className="w-full resize-none rounded-xl border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white outline-none transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
          </label>

          <div className="space-y-3">
            <p className="text-sm font-bold text-white uppercase tracking-wider">Delivery option</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'delivery', label: 'Delivery' },
                { id: 'pickup', label: 'Pickup' },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setFulfillmentType(option.id)}
                    className={`rounded-xl border-2 px-3 py-3 text-sm font-bold transition-all duration-200 ${
                    fulfillmentType === option.id
                      ? 'border-orange-500 bg-orange-500/10 text-orange-500 shadow-lg shadow-orange-500/10'
                      : 'border-gray-800 bg-gray-800/40 text-gray-400 hover:border-gray-700 hover:bg-gray-800'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-bold text-white uppercase tracking-wider">Payment method</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'cod', label: 'Cash on Delivery' },
                { id: 'card', label: 'Card Payment' },
              ].map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                    className={`rounded-xl border-2 px-3 py-3 text-sm font-bold transition-all duration-200 ${
                    paymentMethod === method.id
                      ? 'border-orange-500 bg-orange-500/10 text-orange-500 shadow-lg shadow-orange-500/10'
                      : 'border-gray-800 bg-gray-800/40 text-gray-400 hover:border-gray-700 hover:bg-gray-800'
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>
          </div>
        </form>
      </section>

      <aside className="h-fit space-y-6 rounded-2xl border border-gray-800 bg-gray-900/50 p-5 shadow-sm sm:p-6">
        <div>
          <h2 className="text-lg font-black text-white uppercase tracking-tight">Order Summary</h2>
          <p className="mt-1 text-sm text-gray-500">
            {cartCount} item{cartCount === 1 ? '' : 's'} in your cart
          </p>
        </div>

        {items.length === 0 ? (
          <p className="rounded-xl bg-gray-800 px-3 py-4 text-sm text-gray-500 italic">
            No items in cart yet. Add products from menu first.
          </p>
        ) : (
          <ul className="max-h-64 space-y-3 overflow-auto pr-1 custom-scrollbar">
            {items.map((item) => (
              <li
                key={item.cartKey}
                className="flex items-start justify-between gap-2 rounded-xl border border-gray-800 bg-gray-800/40 px-3 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-white">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} x AED {item.price.toFixed(0)}
                  </p>
                </div>
                <p className="text-sm font-black text-white">
                  AED {(item.quantity * item.price).toFixed(0)}
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="space-y-3 border-t border-gray-800 pt-5 text-sm">
          <div className="flex items-center justify-between text-gray-400">
            <span>Subtotal</span>
            <span className="font-bold text-white">AED {subtotal.toFixed(0)}</span>
          </div>
          <div className="flex items-center justify-between text-gray-400">
            <span>Delivery</span>
            <span className="font-bold text-white">AED {deliveryFee.toFixed(0)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-gray-800 pt-4 text-lg font-black text-white uppercase tracking-tight">
            <span>Total</span>
            <span>AED {total.toFixed(0)}</span>
          </div>
        </div>

        <button
          type="button"
          disabled={items.length === 0}
          className="w-full rounded-2xl bg-orange-500 px-4 py-4 text-sm font-black text-white uppercase tracking-widest shadow-lg shadow-orange-500/20 transition-all duration-300 hover:bg-orange-600 hover:shadow-orange-500/30 disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-600 disabled:shadow-none active:scale-[0.98]"
        >
          Place Order
        </button>
      </aside>
    </div>
  )
}

export default CheckoutPage
