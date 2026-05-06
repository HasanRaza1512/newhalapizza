import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiChevronDown, FiMapPin, FiX } from 'react-icons/fi'
import { quettaAreas } from '../data/areas'

function AreaSelector({ selectedArea, onSelect, error }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const containerRef = useRef(null)

  const filteredAreas = quettaAreas.filter(area =>
    area.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={containerRef}>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          Select Area
        </label>
        
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`flex w-full cursor-pointer items-center justify-between rounded-2xl border-none bg-gray-100 px-5 py-4 text-sm transition-all duration-300 hover:bg-gray-200 ${
            error ? 'ring-2 ring-rose-500 bg-white' : 'focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-400/50'
          }`}
        >
          <span className={`text-sm font-medium ${selectedArea ? 'text-gray-900' : 'text-gray-400'}`}>
            {selectedArea || 'Choose your area...'}
          </span>
          <FiChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
        {error && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">{error}</p>}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 z-50 mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
          >
            <div className="p-3">
              <div className="relative mb-3">
                <FiSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search area..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border-none bg-gray-100 py-3 pl-11 pr-4 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-orange-400/30"
                />
              </div>

              <ul className="max-h-60 overflow-y-auto custom-scrollbar space-y-1">
                {filteredAreas.length > 0 ? (
                  filteredAreas.map((area) => (
                    <li
                      key={area}
                      onClick={() => {
                        onSelect(area)
                        setIsOpen(false)
                        setSearchTerm('')
                      }}
                      className={`flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                        selectedArea === area 
                          ? 'bg-orange-100 text-orange-600 font-bold' 
                          : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                      }`}
                    >
                      {area}
                      {selectedArea === area && (
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
                      )}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-8 text-center text-[10px] font-black uppercase tracking-widest text-gray-300">
                    No areas found
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AreaSelector
