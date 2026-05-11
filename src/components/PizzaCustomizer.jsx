import { motion } from 'framer-motion'
import SizeSelector from './SizeSelector'
import CrustSelector from './CrustSelector'
import ToppingsSelector from './ToppingsSelector'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
}

const PizzaCustomizer = ({
  selectedSize,
  setSelectedSize,
  selectedCrust,
  setSelectedCrust,
  selectedToppings,
  toggleTopping,
}) => {
  return (
    <motion.div variants={fadeUp} className="space-y-6 sm:space-y-8 pb-4">
      <SizeSelector
        selectedSize={selectedSize}
        onSelect={setSelectedSize}
      />

      <CrustSelector
        selectedCrust={selectedCrust}
        onSelect={setSelectedCrust}
      />

      <ToppingsSelector
        selectedToppings={selectedToppings}
        onToggle={toggleTopping}
      />
    </motion.div>
  )
}

export default PizzaCustomizer
