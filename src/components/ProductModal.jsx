import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX, FiCheck, FiShoppingCart } from 'react-icons/fi'
import { useCartStore } from '../store'

import { sizeOptions, crustOptions, toppingOptions } from '../data/options'

/* ───────────────── framer motion variants ───────────────────── */

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const modalVariants = {
  hidden: { y: 60, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', damping: 30, stiffness: 350 },
  },
  exit: {
    y: 40,
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}

const staggerChildren = {
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

/* ─────────────────── reusable sub-components ─────────────────── */

function SizeSelector({ selectedSize, onSelect }) {
  return (
    <motion.div variants={fadeUp} className="space-y-3">
      <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
        Choose Size
      </p>
      <div className="grid grid-cols-3 gap-3">
        {sizeOptions.map((size) => {
          const isActive = selectedSize === size.label
          return (
            <motion.button
              key={size.label}
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(size.label)}
              className={`relative flex flex-col items-center gap-1 rounded-2xl border-2 px-3 py-4 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'border-orange-500 bg-orange-50/80 text-orange-600 shadow-lg shadow-orange-500/10'
                  : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200 hover:bg-gray-100'
              }`}
            >
              {/* Animated size circle */}
              <motion.div
                animate={{
                  width: size.label === 'Small' ? 28 : size.label === 'Medium' ? 38 : 48,
                  height: size.label === 'Small' ? 28 : size.label === 'Medium' ? 38 : 48,
                }}
                className={`rounded-full border-2 border-dashed mb-1 transition-colors ${
                  isActive ? 'border-orange-500 bg-orange-500/10' : 'border-gray-200 bg-white'
                }`}
              />
              <span>{size.label}</span>
              <span className={`text-xs ${isActive ? 'text-orange-500' : 'text-slate-400'}`}>
                {size.inches}
              </span>
              {isActive && (
                <motion.div
                  layoutId="size-indicator"
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <FiCheck className="h-3 w-3" strokeWidth={3} />
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

function CrustSelector({ selectedCrust, onSelect }) {
  return (
    <motion.div variants={fadeUp} className="space-y-3">
      <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
        Pick Your Crust
      </p>
      <div className="space-y-2">
        {crustOptions.map((crust) => {
          const isActive = selectedCrust === crust.label
          return (
            <motion.button
              key={crust.label}
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelect(crust.label)}
              className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'border-orange-500 bg-orange-50/80 shadow-lg shadow-orange-500/5'
                  : 'border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl leading-none">{crust.icon}</span>
              <span className={`flex-1 text-sm font-semibold ${isActive ? 'text-orange-700' : 'text-slate-700'}`}>
                {crust.label}
              </span>
              {crust.price > 0 && (
                <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${
                  isActive ? 'bg-orange-200/60 text-orange-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  +${crust.price.toFixed(2)}
                </span>
              )}
              {/* Radio indicator */}
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                  isActive ? 'border-orange-500 bg-orange-500' : 'border-gray-200 bg-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="h-2 w-2 rounded-full bg-white"
                  />
                )}
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

function ToppingsSelector({ selectedToppings, onToggle }) {
  return (
    <motion.div variants={fadeUp} className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Extra Toppings
        </p>
        {selectedToppings.length > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="rounded-full bg-orange-500/20 px-2.5 py-0.5 text-[10px] font-bold text-orange-500 uppercase"
          >
            {selectedToppings.length} selected
          </motion.span>
        )}
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {toppingOptions.map((topping) => {
          const isChecked = selectedToppings.includes(topping.id)
          return (
            <motion.label
              key={topping.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all duration-200 ${
                isChecked
                  ? 'border-orange-500 bg-orange-50/80 shadow-lg shadow-orange-500/5'
                  : 'border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-gray-100'
              }`}
            >
              <span className="text-lg leading-none">{topping.icon}</span>
              <span className={`flex-1 text-sm font-medium ${isChecked ? 'text-orange-700' : 'text-slate-700'}`}>
                {topping.label}
              </span>
              <span className={`text-xs font-medium ${isChecked ? 'text-orange-600' : 'text-slate-400'}`}>
                +${topping.price.toFixed(2)}
              </span>
              {/* Custom checkbox */}
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                  isChecked
                    ? 'border-orange-500 bg-orange-500'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {isChecked && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <FiCheck className="h-3 w-3 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </div>
              <input
                type="checkbox"
                className="sr-only"
                checked={isChecked}
                onChange={() => onToggle(topping.id)}
              />
            </motion.label>
          )
        })}
      </div>
    </motion.div>
  )
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
    }, 600)
  }

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal panel */}
      <motion.section
        className="relative z-10 w-full max-w-4xl overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl border border-gray-100"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
      >
        <div className="grid md:grid-cols-[1fr_1.1fr]">
          {/* ── Left: Image section ── */}
          <div className="relative flex h-64 items-center justify-center bg-gray-50/50 p-6 sm:h-80 md:h-full md:min-h-[560px] md:p-12">
            <motion.img
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              src={product.image}
              alt={product.name}
              className="aspect-square w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] object-cover rounded-full shadow-2xl shadow-black/10"
            />
            {/* Gradient overlay removed or adjusted */}

            {/* Category badge on image */}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 shadow-lg"
            >
              {product.category}
            </motion.span>

            {/* Close button on image (mobile) */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white shadow-lg transition hover:bg-black/60 md:hidden cursor-pointer"
              aria-label="Close"
            >
              <FiX className="h-4 w-4" strokeWidth={2.5} />
            </button>

            {/* Product info overlay on image (mobile) */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:hidden">
              <h3 className="text-xl font-bold text-white drop-shadow-lg">{product.name}</h3>
            </div>
          </div>

          {/* ── Right: Details & Customization ── */}
          <div className="flex flex-col max-h-[70vh] md:max-h-[90vh]">
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <motion.div
                className="space-y-6 p-5 sm:p-7"
                variants={staggerChildren}
                initial="hidden"
                animate="visible"
              >
                {/* Header (desktop) */}
                <motion.div variants={fadeUp} className="hidden md:block">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        {product.description || 'Customize your meal with preferred size, crust, and toppings.'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-900 cursor-pointer"
                      aria-label="Close"
                    >
                      <FiX className="h-4 w-4" strokeWidth={2.5} />
                    </button>
                  </div>
                </motion.div>

                {/* Description (mobile) */}
                <motion.p variants={fadeUp} className="text-sm leading-relaxed text-gray-600 md:hidden">
                  {product.description || 'Customize your meal with preferred size, crust, and toppings.'}
                </motion.p>

                {/* Base price callout */}
                <motion.div
                  variants={fadeUp}
                  className="flex items-center gap-3 rounded-xl bg-orange-500/10 border border-orange-500/20 px-4 py-3"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
                    Starting at
                  </span>
                  <span className="text-lg font-black text-orange-500">
                    AED {product.price.toFixed(0)}
                  </span>
                </motion.div>

                {/* Divider */}
                <motion.hr variants={fadeUp} className="border-gray-100" />

                {/* Size selector */}
                <SizeSelector
                  selectedSize={selectedSize}
                  onSelect={setSelectedSize}
                />

                {/* Crust selector (only for pizza) */}
                {product.category === 'Pizza' && (
                  <CrustSelector
                    selectedCrust={selectedCrust}
                    onSelect={setSelectedCrust}
                  />
                )}

                {/* Toppings */}
                <ToppingsSelector
                  selectedToppings={selectedToppings}
                  onToggle={toggleTopping}
                />
              </motion.div>
            </div>

            {/* ── Sticky footer ── */}
            <div className="shrink-0 border-t border-gray-100 bg-white/95 backdrop-blur-md p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    Total
                  </p>
                  <motion.p
                    key={livePrice.toFixed(0)}
                    initial={{ y: -8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-3xl font-black text-gray-900"
                  >
                    AED {livePrice.toFixed(0)}
                  </motion.p>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAddToCart}
                  disabled={addedFeedback}
                  className={`flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-bold shadow-lg transition-all duration-300 cursor-pointer ${
                    addedFeedback
                      ? 'bg-emerald-500 text-white shadow-emerald-200/50'
                      : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-300/40 hover:shadow-xl hover:shadow-orange-300/50'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {addedFeedback ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                        className="flex items-center gap-2"
                      >
                        <FiCheck className="h-4 w-4" strokeWidth={3} />
                        Added!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="cart"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <FiShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
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
