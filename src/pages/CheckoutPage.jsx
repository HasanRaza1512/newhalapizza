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
      <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-slate-900/5 sm:p-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Checkout
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Fill in your details and review your order before placing it.
          </p>
        </div>

        <form className="space-y-5 sm:space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5 text-sm font-medium text-slate-700">
              Name
              <input
                type="text"
                placeholder="John Doe"
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              />
            </label>
            <label className="space-y-1.5 text-sm font-medium text-slate-700">
              Phone
              <input
                type="tel"
                placeholder="+1 555 000 111"
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              />
            </label>
          </div>

          <label className="block space-y-1.5 text-sm font-medium text-slate-700">
            Address
            <textarea
              placeholder="Street, building, floor, apartment..."
              rows={3}
              className="w-full resize-none rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            />
          </label>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-900">Delivery option</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'delivery', label: 'Delivery' },
                { id: 'pickup', label: 'Pickup' },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setFulfillmentType(option.id)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    fulfillmentType === option.id
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-900">Payment method</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'cod', label: 'Cash on Delivery' },
                { id: 'card', label: 'Card Payment' },
              ].map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    paymentMethod === method.id
                      ? 'border-orange-500 bg-orange-500 text-white'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>
          </div>
        </form>
      </section>

      <aside className="h-fit space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-slate-900/5 sm:p-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Order Summary</h2>
          <p className="mt-1 text-sm text-slate-500">
            {cartCount} item{cartCount === 1 ? '' : 's'} in your cart
          </p>
        </div>

        {items.length === 0 ? (
          <p className="rounded-xl bg-slate-50 px-3 py-4 text-sm text-slate-500">
            No items in cart yet. Add products from menu first.
          </p>
        ) : (
          <ul className="max-h-64 space-y-2 overflow-auto pr-1">
            {items.map((item) => (
              <li
                key={item.cartKey}
                className="flex items-start justify-between gap-2 rounded-lg border border-slate-200 px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  ${(item.quantity * item.price).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="space-y-2 border-t border-slate-200 pt-3 text-sm">
          <div className="flex items-center justify-between text-slate-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>Delivery</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-base font-bold text-slate-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          type="button"
          disabled={items.length === 0}
          className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Place Order
        </button>
      </aside>
    </div>
  )
}

export default CheckoutPage
