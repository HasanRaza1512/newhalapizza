import { motion } from 'framer-motion'
import { FiMinus, FiPlus, FiPackage } from 'react-icons/fi'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
}

/**
 * DealCustomizer — renders inside ProductModal when category === 'deals'.
 * Shows the included items list + a quantity selector.
 */
const DealCustomizer = ({ items = [], quantity, setQuantity }) => {
  return (
    <motion.div variants={fadeUp} className="space-y-8 pb-4">
      {/* Included Items */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
            What's Included
          </h4>
          <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-lg">
            Bundle Deal
          </span>
        </div>

        <ul className="space-y-2.5">
          {items.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
              className="flex items-center gap-3 bg-orange-50/60 border border-orange-100 rounded-2xl px-4 py-3"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white">
                <FiPackage className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
              <span className="text-sm font-semibold text-gray-800">{item}</span>
            </motion.li>
          ))}
        </ul>
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
          <p className="text-[11px] font-medium text-gray-400">Number of deal sets</p>
        </div>
      </div>
    </motion.div>
  )
}

export default DealCustomizer
