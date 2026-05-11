import { useMemo, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX, FiCheck, FiShoppingCart, FiChevronRight } from 'react-icons/fi'
import { useCartStore } from '../store'

import { sizeOptions, simpleSizeOptions, drinkSizeOptions, toppingOptions } from '../data/options'
import PizzaCustomizer from './PizzaCustomizer'
import SimpleCustomizer from './SimpleCustomizer'
import DrinkCustomizer from './DrinkCustomizer'

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
  const category = product.category.toLowerCase()

  // Default values based on category
  const [selectedSize, setSelectedSize] = useState(() => {
    if (category === 'pizza') return sizeOptions[1].label
    if (category === 'drinks') return drinkSizeOptions[0].label
    return simpleSizeOptions[0].label
  })

  const [selectedCrust, setSelectedCrust] = useState('Classic Hand Tossed')
  const [selectedToppings, setSelectedToppings] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [addedFeedback, setAddedFeedback] = useState(false)

  // Reset state when product changes
  useEffect(() => {
    if (category === 'pizza') setSelectedSize(sizeOptions[1].label)
    else if (category === 'drinks') setSelectedSize(drinkSizeOptions[0].label)
    else setSelectedSize(simpleSizeOptions[0].label)

    setQuantity(1)
    setSelectedToppings([])
  }, [product, category])

  const toppingsTotal = useMemo(
    () =>
      toppingOptions
        .filter((t) => selectedToppings.includes(t.id))
        .reduce((sum, t) => sum + t.price, 0),
    [selectedToppings],
  )

  const livePrice = useMemo(() => {
    if (!product) return 0
    let total = product.price

    if (category === 'pizza') {
      const sizeOpt = sizeOptions.find(s => s.label === selectedSize) || sizeOptions[1]
      total = product.price * sizeOpt.multiplier + toppingsTotal
      // Note: Crust price could be added here if needed, but keeping it simple for now
    } else if (category === 'drinks') {
      const sizeOpt = drinkSizeOptions.find(s => s.label === selectedSize) || drinkSizeOptions[0]
      total = product.price + sizeOpt.extraPrice
    } else {
      const sizeOpt = simpleSizeOptions.find(s => s.label === selectedSize) || simpleSizeOptions[0]
      total = product.price + sizeOpt.extraPrice
    }

    return total * quantity
  }, [product, category, selectedSize, toppingsTotal, quantity])

  const toggleTopping = (toppingId) => {
    setSelectedToppings((current) =>
      current.includes(toppingId)
        ? current.filter((id) => id !== toppingId)
        : [...current, toppingId],
    )
  }

  const addFlyingImage = useCartStore((state) => state.addFlyingImage)

  const handleAddToCart = (event) => {
    const options = {
      size: selectedSize,
      crust: category === 'pizza' ? selectedCrust : undefined,
      toppings: category === 'pizza' ? toppingOptions
        .filter((t) => selectedToppings.includes(t.id))
        .map((t) => t.label) : [],
    }

    onAddToCart(product, options, quantity)

    if (event) {
      addFlyingImage(product.image, event.clientX, event.clientY)
    }

    setAddedFeedback(true)
    setTimeout(() => {
      setAddedFeedback(false)
      onClose()
    }, 800)
  }

  const imageScale = useMemo(() => {
    if (category !== 'pizza') return 1
    switch (selectedSize) {
      case 'Small': return 0.85
      case 'Medium': return 1
      case 'Large': return 1.15
      default: return 1
    }
  }, [selectedSize, category])

  return (
    <motion.div
      className="fixed inset-0 z-60 flex items-center justify-center p-0 sm:p-4 perspective-1000"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.section
        className="relative z-10 w-full max-w-5xl h-full sm:h-auto sm:max-h-[90vh] overflow-hidden rounded-none sm:rounded-3xl bg-white shadow-2xl flex flex-col md:flex-row border border-gray-100"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-gray-500 hover:bg-orange-500 hover:text-white transition-all shadow-sm"
        >
          <FiX className="h-5 w-5" strokeWidth={3} />
        </button>

        {/* ── Left: Image section ── */}
        <div className="relative w-full md:w-[45%] flex items-center justify-center bg-gray-50/50 p-6 sm:p-8 md:p-12 overflow-hidden shrink-0">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,var(--tw-gradient-from)_0%,transparent_70%)] from-orange-200"></div>
          </div>

          <motion.div
            animate={{ scale: imageScale, rotate: category === 'pizza' ? 360 : 0 }}
            transition={{
              scale: { type: 'spring', stiffness: 200, damping: 20 },
              rotate: { duration: 100, repeat: Infinity, ease: 'linear' }
            }}
            className="relative z-10"
          >
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square w-full max-w-60 sm:max-w-100 md:max-w-120 object-cover rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.1)] sm:shadow-[0_30px_60px_rgba(0,0,0,0.15)] ring-4 sm:ring-8 ring-white/50"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8"
          >
            <span className="bg-white/80 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-orange-600 shadow-lg border border-orange-100">
              {product.category}
            </span>
          </motion.div>
        </div>

        {/* ── Right: Details & Customization ── */}
        <div className="flex flex-col flex-1 bg-white min-h-0">
          <div className="flex-1 overflow-y-auto no-scrollbar sm:custom-scrollbar">
            <motion.div
              className="p-6 sm:p-8 md:p-12 space-y-8 sm:space-y-10"
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              {/* Product Header */}
              <motion.div variants={fadeUp} className="space-y-3 sm:space-y-4">
                <h3 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight uppercase">
                  {product.name}
                </h3>
                <p className="text-[13px] sm:text-sm font-medium text-gray-400 leading-relaxed max-w-md">
                  {product.description}
                </p>

                <div className="inline-flex items-center gap-3 sm:gap-4 bg-orange-50/50 border border-orange-100 rounded-xl sm:rounded-2xl px-4 py-2 sm:px-6 sm:py-3">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-orange-400">Base Price</span>
                  <span className="text-xl sm:text-2xl font-black text-orange-600">PKR {product.price.toFixed(2)}</span>
                </div>
              </motion.div>

              {/* Conditional Customizer Rendering */}
              {category === 'pizza' ? (
                <PizzaCustomizer
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                  selectedCrust={selectedCrust}
                  setSelectedCrust={setSelectedCrust}
                  selectedToppings={selectedToppings}
                  toggleTopping={toggleTopping}
                />
              ) : category === 'drinks' ? (
                <DrinkCustomizer
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              ) : (
                <SimpleCustomizer
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              )}
            </motion.div>
          </div>

          {/* ── Sticky footer ── */}
          <div className="p-6 sm:p-8 md:p-12 border-t border-gray-50 bg-white/80 backdrop-blur-md">
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <div className="flex sm:flex-col items-center sm:items-start justify-between w-full sm:w-auto sm:space-y-1">
                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Total Amount</p>
                <div className="flex items-baseline gap-1">
                  <motion.span
                    key={livePrice}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-2xl sm:text-4xl font-black text-gray-900"
                  >
                    {livePrice.toFixed(2)}
                  </motion.span>
                  <span className="text-xs sm:text-sm font-black text-gray-400 ml-1 sm:ml-2">PKR</span>
                </div>
              </div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={addedFeedback}
                className={`w-full sm:flex-1 flex items-center justify-center gap-2 sm:gap-3 rounded-2xl sm:rounded-3xl py-4 sm:py-6 text-[13px] sm:text-sm font-black uppercase tracking-widest shadow-xl sm:shadow-2xl transition-all duration-500 ${addedFeedback
                  ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                  : 'bg-orange-500 text-white shadow-orange-500/30 hover:bg-orange-600 hover:shadow-orange-600/40'
                  }`}
              >
                <AnimatePresence mode="wait">
                  {addedFeedback ? (
                    <motion.div
                      key="added"
                      initial={{ opacity: 0, scale: 0.5, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.5, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <FiCheck className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={4} />
                      <span className="translate-y-px">Added to Order</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="add"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2"
                    >
                      <FiShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="translate-y-px">Add to Order</span>
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
