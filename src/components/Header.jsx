import { useCartStore } from '../store'
import CartSidebar from './CartSidebar'
import { FiGlobe } from 'react-icons/fi'

function Header() {
  const isCartOpen = useCartStore((state) => state.isCartOpen)
  const closeCart = useCartStore((state) => state.closeCart)

  return (
    <>
      <header className="w-full bg-white">
        {/* Top Bar */}
        <div className="border-b border-slate-100 bg-white">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-2.5 text-[13px] font-medium text-slate-600 sm:px-6 lg:px-8">
            <button className="flex items-center gap-1.5 transition-colors hover:text-slate-900">
              <FiGlobe className="h-4 w-4" />
              <span>Language</span>
            </button>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400"></span>
                Live
              </span>
              <a href="#" className="transition-colors hover:text-slate-900">Franchise</a>
              <a href="#" className="transition-colors hover:text-slate-900">About us</a>
              <a href="#" className="transition-colors hover:text-slate-900">Store info</a>
            </div>
          </div>
        </div>

        {/* Middle Bar */}
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          {/* Logo & Delivery Info */}
          <div className="flex items-center gap-6 lg:gap-10">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF6900] text-2xl font-black text-white">
              </div>
              <span className="hidden text-2xl font-black tracking-tight text-slate-900 sm:block uppercase">
                Hala Pizza
              </span>
            </a>

            <div className="hidden flex-col md:flex">
              <span className="text-sm font-bold text-slate-900">Pizza delivery Quetta</span>
              <span className="text-[13px] text-slate-500">
                30 min • 4.75 <span className="text-[#FFD800]">★</span>
              </span>
            </div>

            <div className="hidden flex-col lg:flex">
              <a href="tel:+971527556627" className="text-sm font-bold text-slate-900 transition-colors hover:text-[#FF6900]">
                +92 1234567890
              </a>
              <span className="text-[13px] text-slate-500">Call</span>
            </div>
          </div>

          {/* Login Button */}
          <button className="rounded-full bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-200">
            Log in
          </button>
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
    </>
  )
}

export default Header
