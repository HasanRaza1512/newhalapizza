import { motion } from 'framer-motion'
import { crustOptions } from '../data/options'

function CrustSelector({ selectedCrust, onSelect }) {
  return (
    <div className="space-y-4">
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
        Pick Your Crust
      </p>
      <div className="grid grid-cols-1 gap-2">
        {crustOptions.map((crust) => {
          const isActive = selectedCrust === crust.label
          return (
            <motion.button
              key={crust.label}
              type="button"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelect(crust.label)}
              className={`flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'border-orange-500 bg-orange-50/30 shadow-lg shadow-orange-500/5'
                  : 'border-gray-50 bg-gray-50/50 hover:border-gray-100 hover:bg-gray-100/50'
              }`}
            >
              <span className="text-2xl filter drop-shadow-sm">{crust.icon}</span>
              <div className="flex-1">
                <span className={`block text-sm font-black ${isActive ? 'text-orange-700' : 'text-gray-900'}`}>
                  {crust.label}
                </span>
                {crust.price > 0 && (
                  <span className="text-[10px] font-bold text-orange-500">
                    +AED {crust.price.toFixed(2)} Premium
                  </span>
                )}
              </div>
              
              <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                isActive ? 'border-orange-500 bg-orange-500 shadow-lg shadow-orange-500/40' : 'border-gray-200 bg-white'
              }`}>
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
    </div>
  )
}

export default CrustSelector
