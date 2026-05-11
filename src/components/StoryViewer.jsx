import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'

function StoryViewer({ story, isOpen, onClose, duration = 5000 }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isOpen) {
      setProgress(0)
      return
    }

    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        clearInterval(interval)
        onClose()
      }
    }, 16) // ~60fps

    return () => clearInterval(interval)
  }, [isOpen, duration, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-8"
          onClick={onClose}
        >
          <div 
            className="relative h-full max-h-200 w-full max-w-112.5 overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Progress Bar Container */}
            <div className="absolute left-0 right-0 top-0 z-20 flex gap-1 p-3">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-black/10">
                <motion.div
                  className="h-full bg-orange-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 rounded-full bg-white/40 p-2 text-gray-900 backdrop-blur-md transition-colors hover:bg-white/60"
            >
              <FiX className="h-6 w-6" />
            </button>

            {/* Story Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="h-full w-full"
            >
              <img
                src={story.image}
                alt={story.title}
                className="h-full w-full object-cover"
              />
              
              {/* Overlay for text */}
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-white via-white/40 to-transparent p-8 pt-20">
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold text-gray-900 sm:text-3xl"
                >
                  {story.title}
                </motion.h2>
                {story.description && (
                   <motion.p 
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.3 }}
                   className="mt-2 text-gray-600"
                 >
                   {story.description}
                 </motion.p>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default StoryViewer
