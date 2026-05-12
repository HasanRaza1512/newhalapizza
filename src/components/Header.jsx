import { useState, useEffect } from 'react'
import { useCartStore } from '../store'
import CartSidebar from './CartSidebar'
import { FiGlobe, FiUser, FiShoppingBag, FiTruck } from 'react-icons/fi'

function Header() {
  const fulfillment = useCartStore((state) => state.fulfillment)
  const isDeliveryPopupOpen = useCartStore((state) => state.isDeliveryPopupOpen)
  const openDeliveryPopup = useCartStore((state) => state.openDeliveryPopup)
  const isCartOpen = useCartStore((state) => state.isCartOpen)
  const openCart = useCartStore((state) => state.openCart)
  const closeCart = useCartStore((state) => state.closeCart)
  const items = useCartStore((state) => state.items)
  const [isScrolled, setIsScrolled] = useState(false)

  const cartCount = items.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      // Use a slightly larger threshold for stability
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top Bar - Non-sticky, scrolls away naturally */}
      <div className="hidden border-b border-gray-100 bg-gray-50/50 sm:block">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider sm:px-6 lg:px-8">
          <button className="flex items-center gap-1.5 transition-colors hover:text-orange-500">
            <FiGlobe className="h-3 w-3" />
            <span>Language</span>
          </button>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></span>
              Live
            </span>
            <a href="#" className="transition-colors hover:text-black">Franchise</a>
            <a href="#" className="transition-colors hover:text-black">Store info</a>
          </div>
        </div>
      </div>

      {/* Main Header - Sticky and Stable */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
          ? 'bg-white/95 shadow-lg backdrop-blur-md border-b border-gray-200/50'
          : 'bg-white border-b border-transparent'
          }`}
      >
        <div className="mx-auto flex h-16 sm:h-18 items-center justify-between px-4 max-w-6xl sm:px-6 lg:px-8">
          {/* Logo & Info */}
          <div className="flex items-center gap-4 sm:gap-8 lg:gap-12">
            <a href="/" className="group flex items-center gap-2 sm:gap-3">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-xl sm:text-2xl font-black text-white shadow-lg shadow-orange-500/20 transition-transform group-hover:scale-110">
                <span className="leading-none">H</span>
              </div>
              <span className="hidden text-lg sm:text-xl font-black tracking-tighter text-gray-900 min-[400px]:block uppercase">
                Hala<span className="text-orange-500">Pizza</span>
              </span>
            </a>

            <button 
              onClick={openDeliveryPopup}
              className="flex flex-col text-left group transition-all max-w-30 sm:max-w-none"
            >
              <span className="text-[10px] sm:text-sm font-black text-gray-900 uppercase tracking-tight group-hover:text-orange-500 transition-colors truncate">
                {fulfillment ? (
                  <span className="flex items-center gap-1 sm:gap-1.5">
                    {fulfillment.type === 'delivery' ? <FiTruck className="h-3 w-3 text-orange-500 shrink-0" /> : <FiShoppingBag className="h-3 w-3 text-orange-500 shrink-0" />}
                    <span className="truncate">{fulfillment.type === 'delivery' ? (fulfillment.address?.split(',')[0] || 'Delivery') : 'Pickup'}</span>
                  </span>
                ) : 'Location'}
              </span>
              <span className="text-[9px] sm:text-[11px] font-bold text-gray-400 group-hover:text-gray-600 transition-colors truncate">
                {fulfillment ? fulfillment.phone : 'Set location'} <span className="text-orange-500">★</span>
              </span>
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gray-50 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 active:scale-90">
              <FiUser className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            <button
              id="header-cart-btn"
              onClick={openCart}
              className="relative flex h-9 sm:h-10 items-center gap-1.5 sm:gap-2 rounded-full bg-orange-500 px-3 sm:px-4 font-black text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-600 hover:shadow-orange-500/30 active:scale-95"
            >
              <FiShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
              {cartCount > 0 && (
                <span className="text-xs sm:text-sm">{cartCount}</span>
              )}
            </button>

            <a href="#" className="hidden rounded-full bg-gray-900 px-6 py-2 text-sm font-black text-white uppercase tracking-wider transition-all hover:bg-black active:scale-95 sm:block">
              Login
            </a>
          </div>
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
    </>
  )
}

export default Header
