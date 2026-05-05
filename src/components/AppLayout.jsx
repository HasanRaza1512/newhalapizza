import Header from './Header'
import Footer from './Footer'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import FloatingCartButton from './FloatingCartButton'
import FlyingImages from './FlyingImages'

function AppLayout({ children }) {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-20"
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
    </div>
  )
}

export default AppLayout
