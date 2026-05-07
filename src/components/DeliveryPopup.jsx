import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTruck, FiShoppingBag, FiArrowLeft, FiMapPin, FiPhone, FiCheck, FiX } from 'react-icons/fi'
import { useCartStore } from '../store'
import AreaSelector from './AreaSelector'

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 300 }
  },
}

function DeliveryPopup() {
  const fulfillment = useCartStore((state) => state.fulfillment)
  const setFulfillment = useCartStore((state) => state.setFulfillment)
  const isDeliveryPopupOpen = useCartStore((state) => state.isDeliveryPopupOpen)
  const openDeliveryPopup = useCartStore((state) => state.openDeliveryPopup)
  const closeDeliveryPopup = useCartStore((state) => state.closeDeliveryPopup)
  
  const [step, setStep] = useState(1) // 1: Select type, 2: Enter details
  const [type, setType] = useState(null) // 'delivery' or 'pickup'
  const [formData, setFormData] = useState({
    phone: '',
    address: ''
  })
  const [errors, setErrors] = useState({})

  // Initialize form data if fulfillment exists
  useEffect(() => {
    if (fulfillment) {
      setType(fulfillment.type)
      setFormData({
        phone: fulfillment.phone,
        address: fulfillment.address || ''
      })
    }
  }, [fulfillment])

  useEffect(() => {
    if (!fulfillment) {
      openDeliveryPopup()
    }
  }, [fulfillment, openDeliveryPopup])

  const handleSelectType = (selectedType) => {
    setType(selectedType)
    setStep(2)
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (type === 'delivery' && !formData.address.trim()) newErrors.address = 'Please select your delivery area'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validate()) {
      setFulfillment({
        type,
        phone: formData.phone,
        address: type === 'delivery' ? formData.address : undefined
      })
      closeDeliveryPopup()
    }
  }

  if (!isDeliveryPopupOpen) return null

  return (
    <AnimatePresence>
      {isDeliveryPopupOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            className="relative w-[95%] max-w-[440px] sm:max-w-lg overflow-visible rounded-[2rem] bg-white shadow-2xl"
            variants={modalVariants}
          >
            <div className="p-6 sm:p-10">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-8 sm:space-y-10"
                  >
                    <div className="relative text-center space-y-2 sm:space-y-3">
                      {fulfillment && (
                        <button
                          onClick={closeDeliveryPopup}
                          className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-900"
                        >
                          <FiX className="h-5 w-5" />
                        </button>
                      )}
                      <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">CHOOSE YOUR ORDER TYPE</h2>
                      <p className="text-[13px] sm:text-sm font-medium text-gray-400">Select how you'd like to receive your food</p>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <button
                        onClick={() => handleSelectType('delivery')}
                        className="group flex flex-col items-center justify-center gap-5 rounded-[2.5rem] bg-gray-50 p-10 transition-all duration-300 hover:bg-orange-50 active:scale-95 border-2 border-transparent hover:border-orange-200"
                      >
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-sm transition-transform group-hover:scale-110">
                          <FiTruck className="h-8 w-8" />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900">Delivery</span>
                      </button>

                      <button
                        onClick={() => handleSelectType('pickup')}
                        className="group flex flex-col items-center justify-center gap-5 rounded-[2.5rem] bg-gray-50 p-10 transition-all duration-300 hover:bg-orange-50 active:scale-95 border-2 border-transparent hover:border-orange-200"
                      >
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-sm transition-transform group-hover:scale-110">
                          <FiShoppingBag className="h-8 w-8" />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900">Pickup</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setStep(1)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-all hover:bg-gray-200 hover:text-gray-900"
                      >
                        <FiArrowLeft className="h-5 w-5" />
                      </button>
                      <h2 className="text-xl font-black text-gray-900 truncate">
                        {type === 'delivery' ? 'DELIVERY DETAILS' : 'PICKUP DETAILS'}
                      </h2>
                      {fulfillment && (
                        <button
                          onClick={closeDeliveryPopup}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-all hover:bg-gray-200 hover:text-gray-900"
                        >
                          <FiX className="h-5 w-5" />
                        </button>
                      )}
                    </div>

                    <div className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                          Phone Number
                        </label>
                        <input
                          autoFocus
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+971 50 000 0000"
                          className={`w-full rounded-2xl border-none bg-gray-100 px-5 py-4 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-orange-400/50 ${
                            errors.phone ? 'ring-2 ring-rose-500 bg-white' : ''
                          }`}
                        />
                        {errors.phone && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">{errors.phone}</p>}
                      </div>

                      {type === 'delivery' && (
                        <AreaSelector
                          selectedArea={formData.address}
                          onSelect={(area) => setFormData({ ...formData, address: area })}
                          error={errors.address}
                        />
                      )}
                    </div>

                    <button
                      onClick={handleContinue}
                      className="w-full rounded-2xl bg-orange-500 py-5 text-sm font-black uppercase tracking-widest text-white shadow-2xl shadow-orange-500/20 transition-all hover:bg-orange-600 hover:-translate-y-0.5 active:scale-[0.98]"
                    >
                      Continue
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DeliveryPopup
