import toast from 'react-hot-toast'

// Toast notification utilities
export const showToast = {
  // Success notifications
  success: (message, options = {}) => {
    return toast.success(message, {
      duration: 3000,
      ...options
    })
  },

  // Error notifications
  error: (message, options = {}) => {
    return toast.error(message, {
      duration: 5000,
      ...options
    })
  },

  // Loading notifications
  loading: (message, options = {}) => {
    return toast.loading(message, {
      duration: 10000, // Longer duration for loading
      ...options
    })
  },

  // Info notifications
  info: (message, options = {}) => {
    return toast(message, {
      duration: 4000,
      icon: 'ℹ️',
      ...options
    })
  },

  // Custom notifications
  custom: (message, options = {}) => {
    return toast(message, options)
  },

  // Dismiss all toasts
  dismiss: () => {
    toast.dismiss()
  },

  // Dismiss specific toast
  dismissToast: (toastId) => {
    toast.dismiss(toastId)
  }
}

// Specific toast messages for common actions
export const cartToast = {
  itemAdded: (itemName) => {
    return showToast.success(`${itemName} added to cart!`, {
      icon: '🛒'
    })
  },

  itemRemoved: (itemName) => {
    return showToast.success(`${itemName} removed from cart`)
  },

  cartCleared: () => {
    return showToast.success('Cart cleared')
  },

  cartEmpty: () => {
    return showToast.error('Your cart is empty')
  }
}

export const orderToast = {
  orderPlaced: (orderId) => {
    return showToast.success(`Order ${orderId} placed successfully!`, {
      duration: 5000,
      icon: '✅'
    })
  },

  orderProcessing: () => {
    return showToast.loading('Processing your order...')
  },

  orderFailed: (error) => {
    return showToast.error(error || 'Failed to place order. Please try again.')
  },

  orderConfirmed: (orderId) => {
    return showToast.success(`Order ${orderId} confirmed!`, {
      icon: '🎉'
    })
  }
}

export const productToast = {
  productLoaded: () => {
    return showToast.success('Products loaded successfully')
  },

  productLoadFailed: () => {
    return showToast.error('Failed to load products. Please try again.')
  },

  outOfStock: (productName) => {
    return showToast.error(`${productName} is out of stock`)
  }
}

export const locationToast = {
  deliveryAvailable: (area) => {
    return showToast.success(`Delivery available to ${area}`)
  },

  deliveryUnavailable: (area) => {
    return showToast.error(`Delivery not available to ${area}`)
  },

  locationUpdated: () => {
    return showToast.success('Delivery location updated')
  }
}

export const validationToast = {
  formError: (field) => {
    return showToast.error(`Please check the ${field} field`)
  },

  requiredField: (field) => {
    return showToast.error(`${field} is required`)
  },

  invalidFormat: (field) => {
    return showToast.error(`Invalid ${field} format`)
  }
}

export const networkToast = {
  online: () => {
    return showToast.success('Connection restored')
  },

  offline: () => {
    return showToast.error('Connection lost. Please check your internet.')
  },

  retrySuccess: () => {
    return showToast.success('Retry successful')
  },

  retryFailed: () => {
    return showToast.error('Retry failed. Please try again later.')
  }
}

// Promise-based toast helper
export const promiseToast = (promise, messages) => {
  return toast.promise(promise, {
    loading: messages.loading || 'Loading...',
    success: messages.success || 'Success!',
    error: messages.error || 'Something went wrong',
  })
}

export default showToast
