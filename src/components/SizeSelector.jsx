import { motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import { sizeOptions } from '../data/options'

function SizeSelector({ selectedSize, onSelect }) {
  const getLabel = (label) => {
    switch (label) {
      case 'Small': return 'Best for 1 person'
      case 'Medium': return 'Best for 2–3 people'
      case 'Large': return 'Family size'
      default: return ''
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
        Select Size
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {sizeOptions.map((size) => {
          const isActive = selectedSize === size.label
          return (
            <motion.button
              key={size.label}
              type="button"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(size.label)}
              className={`relative flex flex-col items-start gap-1 rounded-2xl border-2 p-4 text-left transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'border-orange-500 bg-orange-50/30 text-orange-600 shadow-xl shadow-orange-500/5'
                  : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
              }`}
            >
              <div className="flex w-full items-center justify-between mb-2">
                 {/* Visual Indicator (Circle/Pizza Icon) */}
                 <div className={`flex items-center justify-center rounded-full transition-colors ${
                   isActive ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'
                 }`} style={{ width: size.label === 'Small' ? '24px' : size.label === 'Medium' ? '30px' : '36px', height: size.label === 'Small' ? '24px' : size.label === 'Medium' ? '30px' : '36px' }}>
                   <span className="text-[10px]">🍕</span>
                 </div>
                 {isActive && (
                   <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white">
                     <FiCheck className="h-3 w-3" strokeWidth={3} />
                   </div>
                 )}
              </div>

              <div className="mt-1">
                <span className={`block text-sm font-black uppercase ${isActive ? 'text-orange-600' : 'text-gray-900'}`}>
                  {size.label}
                </span>
                <span className="block text-[11px] font-bold text-gray-400">
                  {size.inches} ({getLabel(size.label)})
                </span>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default SizeSelector
