import { motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import { toppingOptions } from '../data/options'

function ToppingsSelector({ selectedToppings, onToggle }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
          Extra Toppings
        </p>
        <span className="text-[10px] font-black text-orange-500 uppercase bg-orange-100 px-2 py-0.5 rounded-full">
          Optional
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {toppingOptions.map((topping) => {
          const isChecked = selectedToppings.includes(topping.id)
          return (
            <motion.label
              key={topping.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-3 transition-all duration-300 ${
                isChecked
                  ? 'border-orange-500 bg-orange-50/30 shadow-lg shadow-orange-500/5'
                  : 'border-gray-50 bg-gray-50/50 hover:border-gray-100 hover:bg-gray-100/50'
              }`}
            >
              <span className="text-xl">{topping.icon}</span>
              <div className="flex-1 min-w-0">
                <span className={`block truncate text-xs font-black ${isChecked ? 'text-orange-700' : 'text-gray-900'}`}>
                  {topping.label}
                </span>
                <span className="block text-[10px] font-bold text-gray-400">
                  +AED {topping.price.toFixed(2)}
                </span>
              </div>
              
              <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border-2 transition-all ${
                isChecked ? 'border-orange-500 bg-orange-500' : 'border-gray-200 bg-white'
              }`}>
                {isChecked && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <FiCheck className="h-3 w-3 text-white" strokeWidth={4} />
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
    </div>
  )
}

export default ToppingsSelector
