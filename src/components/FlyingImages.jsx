import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '../store'

function FlyingImages() {
  const flyingImages = useCartStore((state) => state.flyingImages)
  const removeFlyingImage = useCartStore((state) => state.removeFlyingImage)
  const [targetRect, setTargetRect] = useState({ x: window.innerWidth - 50, y: 50 })

  useEffect(() => {
    // Determine the destination for the flying images.
    // Try to find the floating cart button first, fallback to the header cart button.
    const floatingCart = document.getElementById('floating-cart-btn')
    const headerCart = document.getElementById('header-cart-btn')
    
    // Choose the most appropriate target based on visibility
    const target = floatingCart || headerCart
    
    if (target) {
      const rect = target.getBoundingClientRect()
      setTargetRect({
        x: rect.left + rect.width / 2 - 24, // center minus half image width (48px / 2 = 24)
        y: rect.top + rect.height / 2 - 24,
      })
    }
  }, [flyingImages]) // recalculate whenever a new image flies (handles resizes/scrolls)

  return (
    <div className="pointer-events-none fixed inset-0 z-100 overflow-hidden">
      <AnimatePresence>
        {flyingImages.map((img) => (
          <motion.img
            key={img.id}
            src={img.url}
            initial={{ 
              x: img.startX - 24, // Center the flying image on the user's cursor
              y: img.startY - 24, 
              scale: 0.8, 
              opacity: 1,
              rotate: 0,
            }}
            animate={{ 
              x: targetRect.x, 
              y: targetRect.y, 
              scale: 0.2, 
              opacity: 0.3,
              rotate: 360,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              duration: 0.7, 
              type: 'spring',
              bounce: 0.2,
            }}
            onAnimationComplete={() => removeFlyingImage(img.id)}
            className="absolute left-0 top-0 h-12 w-12 rounded-full object-cover shadow-xl ring-2 ring-orange-500"
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default FlyingImages
