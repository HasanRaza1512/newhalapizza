import { FiHome, FiMenu, FiShoppingBag, FiUser, FiClock } from 'react-icons/fi'
import { useLocation, Link } from 'react-router-dom'
import { useCartStore } from '../store'

function MobileBottomNav() {
  const location = useLocation()
  const items = useCartStore((state) => state.items)
  const cartCount = items.reduce((total, item) => total + item.quantity, 0)

  const tabs = [
    { name: 'Home', icon: FiHome, path: '/' },
    { name: 'Menu', icon: FiMenu, path: '/menu' },
    { name: 'Orders', icon: FiClock, path: '/orders' },
    { name: 'Cart', icon: FiShoppingBag, path: '/checkout', badge: cartCount },
    { name: 'Account', icon: FiUser, path: '/account' },
  ]

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-[68px] bg-white border-t border-gray-100 flex items-center justify-around px-2 sm:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path
        const Icon = tab.icon

        const content = (
          <>
            <div className="relative mt-1">
              <Icon className={`w-6 h-6 ${(isActive && tab.name !== 'Cart') || (tab.name === 'Cart' && useCartStore.getState().isCartOpen) ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              {tab.badge > 0 && (
                <span className="absolute -top-1.5 -right-2 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white ring-2 ring-white">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className={`text-[12px] ${(isActive && tab.name !== 'Cart') || (tab.name === 'Cart' && useCartStore.getState().isCartOpen) ? 'font-bold' : 'font-medium'}`}>
              {tab.name}
            </span>
          </>
        )

        if (tab.name === 'Cart') {
          return (
            <button
              key={tab.name}
              onClick={() => useCartStore.getState().openCart()}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                useCartStore.getState().isCartOpen ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {content}
            </button>
          )
        }

        return (
          <Link
            key={tab.name}
            to={tab.path}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              isActive ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {content}
          </Link>
        )
      })}
    </div>
  )
}

export default MobileBottomNav
