import { useCartStore } from '../store'
import CartSidebar from './CartSidebar'
import { FiGlobe } from 'react-icons/fi'

function Header() {
  const isCartOpen = useCartStore((state) => state.isCartOpen)
  const closeCart = useCartStore((state) => state.closeCart)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md shadow-sm">
        {/* Top Bar */}
        <div className="border-b border-gray-100 bg-gray-50/50">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-2 text-[12px] font-medium text-gray-500 sm:px-6 lg:px-8">
            <button className="flex items-center gap-1.5 transition-colors hover:text-black">
              <FiGlobe className="h-3.5 w-3.5" />
              <span>Language</span>
            </button>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]"></span>
                Live
              </span>
              <a href="#" className="transition-colors hover:text-black">Franchise</a>
              <a href="#" className="transition-colors hover:text-black">About us</a>
              <a href="#" className="transition-colors hover:text-black">Store info</a>
            </div>
          </div>
        </div>

        {/* Middle Bar */}
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo & Delivery Info */}
          <div className="flex items-center gap-6 lg:gap-10">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-2xl font-black text-white shadow-lg shadow-orange-500/20">
              </div>
              <span className="hidden text-xl font-black tracking-tight text-gray-900 sm:block uppercase">
                Hala Pizza
              </span>
            </a>

            <div className="hidden flex-col md:flex">
              <span className="text-sm font-bold text-gray-900">Pizza delivery Quetta</span>
              <span className="text-[12px] text-gray-500">
                30 min • 4.75 <span className="text-orange-500">★</span>
              </span>
            </div>

            <div className="hidden flex-col lg:flex">
              <a href="tel:+921234567890" className="text-sm font-bold text-gray-900 transition-colors hover:text-orange-500">
                +92 1234567890
              </a>
              <span className="text-[12px] text-gray-500">Call</span>
            </div>
          </div>

          {/* Login Button */}
          <button className="rounded-full bg-gray-100 px-5 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-200 hover:text-gray-900 active:scale-95">
            Log in
          </button>
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
    </>
  )
}

export default Header
