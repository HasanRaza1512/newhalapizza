import { motion } from 'framer-motion'

const SocialButton = ({
  icon,
  label,
  onClick,
  variant = 'default', // default, light
  disabled = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'flex items-center justify-center gap-3 rounded-xl transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    default: 'px-4 py-3 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 focus:ring-gray-500',
    light: 'px-4 py-3 border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 hover:border-gray-300 focus:ring-gray-500'
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        w-full
        ${className}
      `}
      {...props}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </motion.button>
  )
}

export default SocialButton
