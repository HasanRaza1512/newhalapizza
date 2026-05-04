import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const fallbackSlides = [
  {
    id: 1,
    title: 'Hot & Fresh Pizza Every Day',
    description: 'Crafted with premium ingredients and oven-baked to perfection.',
    cta: 'Order Now',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 2,
    title: 'Family Combo Specials',
    description: 'Enjoy delicious meal bundles with sides and drinks.',
    cta: 'Order Now',
    image:
      'https://images.unsplash.com/photo-1593504049359-74330189a345?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 3,
    title: 'Speedy Delivery, Big Flavor',
    description: 'Get your favorite pizza delivered fast and hot.',
    cta: 'Order Now',
    image:
      'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 4,
    title: 'New Seasonal Menu',
    description: 'Try limited-time flavors inspired by world cuisines.',
    cta: 'Order Now',
    image:
      'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=1600&q=80',
  },
]

function HeroSlider({ slides = fallbackSlides, activeIndex = 0, onChange }) {
  const safeSlides = slides.length ? slides : fallbackSlides
  const [internalIndex, setInternalIndex] = useState(0)
  const currentIndex = onChange ? activeIndex : internalIndex

  const slide = useMemo(
    () => safeSlides[currentIndex % safeSlides.length],
    [currentIndex, safeSlides],
  )

  const setIndex = useCallback(
    (nextIndex) => {
      const normalized = (nextIndex + safeSlides.length) % safeSlides.length
      if (onChange) {
        onChange(normalized)
        return
      }
      setInternalIndex(normalized)
    },
    [onChange, safeSlides.length],
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(currentIndex + 1)
    }, 3500)

    return () => clearInterval(interval)
  }, [currentIndex, setIndex])

  return (
    <section className="relative w-full overflow-hidden rounded-3xl shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          className="relative h-[260px] sm:h-[320px] lg:h-[380px]"
          initial={{ opacity: 0.2, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.2, scale: 1.02 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-slate-900/20" />

          <div className="relative z-10 flex h-full flex-col justify-center px-5 py-6 sm:px-8 lg:px-10">
            <p className="max-w-xl text-2xl font-bold tracking-tight text-white sm:text-4xl">
              {slide.title}
            </p>
            <p className="mt-2 max-w-lg text-sm text-slate-200 sm:text-base">
              {slide.description}
            </p>
            <button
              type="button"
              className="mt-5 w-fit rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-400"
            >
              Order Now
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIndex(currentIndex - 1)}
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-md transition hover:bg-black/60"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => setIndex(currentIndex + 1)}
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-md transition hover:bg-black/60"
        aria-label="Next slide"
      >
        <FiChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {safeSlides.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-200 ${
              currentIndex === index ? 'w-8 bg-white' : 'w-2.5 bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSlider