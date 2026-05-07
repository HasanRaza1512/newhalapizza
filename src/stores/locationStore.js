import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { orderService } from '../services/orderService'

export const useLocationStore = create(
  persist(
    (set, get) => ({
      // Location data
      selectedArea: null,
      deliveryAreas: [
        "Satellite Town",
        "Jinnah Town", 
        "Samungli Road",
        "Airport Road",
        "Brewery Road",
        "Zarghoon Road",
        "Sariab Road",
        "Pashtunabad",
        "Hazara Town"
      ],
      
      // Delivery validation
      isValidDeliveryArea: false,
      deliveryFee: 0,
      estimatedDeliveryTime: null,
      
      // Loading states
      isValidatingArea: false,
      error: null,

      // Actions
      setSelectedArea: async (area) => {
        set({ selectedArea: area, isValidatingArea: true, error: null })
        
        if (!area) {
          set({ 
            isValidDeliveryArea: false, 
            deliveryFee: 0, 
            estimatedDeliveryTime: null,
            isValidatingArea: false 
          })
          return
        }

        try {
          const response = await orderService.validateDeliveryArea(area)
          set({
            isValidDeliveryArea: response.data.isValid,
            deliveryFee: response.data.deliveryFee,
            estimatedDeliveryTime: response.data.estimatedTime,
            isValidatingArea: false
          })
        } catch (error) {
          set({
            error: error.message,
            isValidDeliveryArea: false,
            deliveryFee: 0,
            estimatedDeliveryTime: null,
            isValidatingArea: false
          })
        }
      },

      // Clear location
      clearLocation: () => set({
        selectedArea: null,
        isValidDeliveryArea: false,
        deliveryFee: 0,
        estimatedDeliveryTime: null,
        error: null
      }),

      // Clear error
      clearError: () => set({ error: null }),

      // Get delivery areas
      getDeliveryAreas: () => get().deliveryAreas,

      // Check if area is available
      isAreaAvailable: (area) => {
        return get().deliveryAreas.includes(area)
      }
    }),
    {
      name: 'location-storage',
      partialize: (state) => ({ 
        selectedArea: state.selectedArea,
        isValidDeliveryArea: state.isValidDeliveryArea,
        deliveryFee: state.deliveryFee,
        estimatedDeliveryTime: state.estimatedDeliveryTime
      })
    }
  )
)
