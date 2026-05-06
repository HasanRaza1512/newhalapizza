import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX, FiCheck, FiShoppingCart, FiChevronRight } from 'react-icons/fi'
import { useCartStore } from '../store'

import { sizeOptions, crustOptions, toppingOptions } from '../data/options'
import SizeSelector from './SizeSelector'
import CrustSelector from './CrustSelector'
import ToppingsSelector from './ToppingsSelector'

/* ───────────────── framer motion variants ───────────────────── */

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const modalVariants = {
  hidden: { y: 100, opacity: 0, scale: 0.9, rotateX: -10 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: { type: 'spring', damping: 25, stiffness: 300, mass: 0.8 },
  },
  exit: {
    y: 100,
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
}

const staggerChildren = {
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
}

/* ───────────────── main modal content ───────────────────────── */

function ProductModalContent({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(sizeOptions[1].label)
  const [selectedCrust, setSelectedCrust] = useState(crustOptions[0].label)
  const [selectedToppings, setSelectedToppings] = useState([])
  const [addedFeedback, setAddedFeedback] = useState(false)

  const selectedSizeOption = useMemo(
    () => sizeOptions.find((s) => s.label === selectedSize) ?? sizeOptions[1],
    [selectedSize],
  )

  const selectedCrustOption = useMemo(
    () => crustOptions.find((c) => c.label === selectedCrust) ?? crustOptions[0],
    [selectedCrust],
  )

  const toppingsTotal = useMemo(
    () =>
      toppingOptions
        .filter((t) => selectedToppings.includes(t.id))
        .reduce((sum, t) => sum + t.price, 0),
    [selectedToppings],
  )

  const livePrice = useMemo(() => {
    if (!product) return 0
    let base = product.price * selectedSizeOption.multiplier + toppingsTotal
    if (product.category === 'Pizza') {
      base += selectedCrustOption.price
    }
    return base
  }, [product, selectedSizeOption, toppingsTotal, selectedCrustOption])

  const toggleTopping = (toppingId) => {
    setSelectedToppings((current) =>
      current.includes(toppingId)
        ? current.filter((id) => id !== toppingId)
        : [...current, toppingId],
    )
  }

  const addFlyingImage = useCartStore((state) => state.addFlyingImage)

  const handleAddToCart = (event) => {
    onAddToCart(product, {
      size: selectedSize,
      crust: product.category === 'Pizza' ? selectedCrust : undefined,
      toppings: toppingOptions
        .filter((t) => selectedToppings.includes(t.id))
        .map((t) => t.label),
    })
    
    if (event) {
      addFlyingImage(product.image, event.clientX, event.clientY)
    }
    
    setAddedFeedback(true)
    setTimeout(() => {
      setAddedFeedback(false)
      onClose()
    }, 800)
  }

  // Bonus: Scale image based on size
  const imageScale = useMemo(() => {
    switch (selectedSize) {
      case 'Small': return 0.85
      case 'Medium': return 1
      case 'Large': return 1.15
      default: return 1
    }
  }, [selectedSize])

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4 perspective-1000"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal panel */}
      <motion.section
        className="relative z-10 w-full max-w-5xl h-full sm:h-auto sm:max-h-[90vh] overflow-hidden rounded-none sm:rounded-[3rem] bg-white shadow-2xl flex flex-col md:flex-row border border-gray-100"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
      >
        {/* Close Button (Fixed Top-Right) */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100/80 backdrop-blur-sm text-gray-500 hover:bg-orange-500 hover:text-white transition-all shadow-sm"
        >
          <FiX className="h-5 w-5" strokeWidth={3} />
        </button>

        {/* ── Left: Image section ── */}
        <div className="relative w-full md:w-[45%] flex items-center justify-center bg-gray-50/50 p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-orange-200"></div>
          </div>
          
          <motion.div
            animate={{ scale: imageScale, rotate: 360 }}
            transition={{ 
                scale: { type: 'spring', stiffness: 200, damping: 20 },
                rotate: { duration: 100, repeat: Infinity, ease: 'linear' }
            }}
            className="relative z-10"
          >
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px] object-cover rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.15)] ring-8 ring-white/50"
            />
          </motion.div>

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute bottom-8 left-8"
          >
            <span className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-orange-600 shadow-lg border border-orange-100">
              {product.category}
            </span>
          </motion.div>
        </div>

        {/* ── Right: Details & Customization ── */}
        <div className="flex flex-col flex-1 bg-white">
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <motion.div
              className="p-8 md:p-12 space-y-10"
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              {/* Product Header */}
              <motion.div variants={fadeUp} className="space-y-4">
                <h3 className="text-4xl font-black text-gray-900 tracking-tight leading-none uppercase">
                  {product.name}
                </h3>
                <p className="text-sm font-medium text-gray-400 leading-relaxed max-w-md">
                  {product.description}
                </p>
                
                {/* Price Display */}
                <div className="inline-flex items-center gap-4 bg-orange-50/50 border border-orange-100 rounded-2xl px-6 py-3">
                   <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">Starting at</span>
                   <span className="text-2xl font-black text-orange-600">AED {product.price.toFixed(2)}</span>
                </div>
              </motion.div>

              {/* Customization Sections */}
              <motion.div variants={fadeUp} className="space-y-8">
                <SizeSelector
                  selectedSize={selectedSize}
                  onSelect={setSelectedSize}
                />

                {product.category === 'Pizza' && (
                  <CrustSelector
                    selectedCrust={selectedCrust}
                    onSelect={setSelectedCrust}
                  />
                )}

                <ToppingsSelector
                  selectedToppings={selectedToppings}
                  onToggle={toggleTopping}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* ── Sticky footer ── */}
          <div className="p-8 md:p-12 border-t border-gray-50 bg-white/80 backdrop-blur-md">
            <motion.div 
              className="flex items-center justify-between gap-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Total Amount</p>
                <div className="flex items-baseline gap-1">
                  <motion.span
                    key={livePrice}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-4xl font-black text-gray-900"
                  >
                    {livePrice.toFixed(2)}
                  </motion.span>
                  <span className="text-sm font-black text-gray-400 ml-2">AED</span>
                </div>
              </div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={addedFeedback}
                className={`flex-1 flex items-center justify-center gap-3 rounded-[2rem] py-5 text-sm font-black uppercase tracking-widest shadow-2xl transition-all duration-500 ${
                  addedFeedback
                    ? 'bg-emerald-500 text-white'
                    : 'bg-orange-500 text-white shadow-orange-500/20 hover:bg-orange-600'
                }`}
              >
                <AnimatePresence mode="wait">
                  {addedFeedback ? (
                    <motion.div
                      key="added"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <FiCheck className="h-5 w-5" strokeWidth={4} />
                      Added to Cart
                    </motion.div>
                  ) : (
                    <motion.div
                      key="add"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2"
                    >
                      <FiShoppingCart className="h-5 w-5" />
                      Add to Order
                      <FiChevronRight className="h-4 w-4 ml-1" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  )
}

/* ──────────────────── exported wrapper ───────────────────────── */

function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  return (
    <AnimatePresence>
      {isOpen && product ? (
        <ProductModalContent
          key={product.id}
          product={product}
          onClose={onClose}
          onAddToCart={onAddToCart}
        />
      ) : null}
    </AnimatePresence>
  )
}

export default ProductModal
