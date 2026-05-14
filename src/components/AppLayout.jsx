import Header from './Header'
import Footer from './Footer'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import FloatingCartButton from './FloatingCartButton'
import FlyingImages from './FlyingImages'
import DeliveryPopup from './DeliveryPopup'
import MobileBottomNav from './MobileBottomNav'

function AppLayout({ children }) {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col pb-[68px] sm:pb-0">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-10 sm:py-16 lg:px-12 lg:py-20"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <FloatingCartButton />
      <FlyingImages />
      <DeliveryPopup />
      <MobileBottomNav />
    </div>
  )
}

export default AppLayout
