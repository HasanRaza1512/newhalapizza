import { useEffect } from 'react'
import { useProductStore } from '../store'
import { showToast, networkToast } from '../utils/toast'

export const useAppInitialization = () => {
  const { 
    initializeData, 
    isLoading, 
    error,
    clearError 
  } = useProductStore()

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Show loading toast
        const loadingToast = showToast.loading('Loading menu...')
        
        // Initialize all product data
        await initializeData()
        
        // Dismiss loading toast and show success
        showToast.dismissToast(loadingToast)
        showToast.success('Menu loaded successfully!')
        
      } catch (error) {
        console.error('Failed to initialize app:', error)
        
        // Show error toast
        networkToast.retryFailed()
        
        // Clear error after 5 seconds
        setTimeout(() => {
          clearError()
        }, 5000)
      }
    }

    initializeApp()
  }, [initializeData, clearError])

  return {
    isLoading,
    error,
    retryInitialization: initializeData
  }
}

export default useAppInitialization
