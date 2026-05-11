import { motion } from 'framer-motion'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { simpleSizeOptions } from '../data/options'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
}

const SimpleCustomizer = ({
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
}) => {
  return (
    <motion.div variants={fadeUp} className="space-y-8 pb-4">
      {/* Size Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Select Size</h4>
          <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-lg">Required</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {simpleSizeOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => setSelectedSize(option.label)}
              className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                selectedSize === option.label
                  ? 'border-orange-500 bg-orange-50/50 shadow-lg shadow-orange-500/10'
                  : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className={`text-sm font-black ${selectedSize === option.label ? 'text-orange-600' : 'text-gray-900'}`}>
                {option.label}
              </span>
              {option.extraPrice > 0 && (
                <span className={`text-[10px] font-bold mt-1 ${selectedSize === option.label ? 'text-orange-400' : 'text-gray-400'}`}>
                  +{option.extraPrice} AED
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="space-y-4">
        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Quantity</h4>
        <div className="flex items-center gap-6">
          <div className="flex items-center bg-gray-100 rounded-2xl p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white transition-all text-gray-500 hover:text-orange-500"
            >
              <FiMinus strokeWidth={3} />
            </button>
            <span className="w-12 text-center font-black text-gray-900">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white transition-all text-gray-500 hover:text-orange-500"
            >
              <FiPlus strokeWidth={3} />
            </button>
          </div>
          <p className="text-[11px] font-medium text-gray-400">Adjust the number of items</p>
        </div>
      </div>
    </motion.div>
  )
}

export default SimpleCustomizer
