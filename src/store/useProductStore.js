import { create } from 'zustand'
import { products as dummyProducts } from '../data/products'

export const useProductStore = create((set) => ({
  products: dummyProducts,
  isLoading: false,
  error: null,

  // Mock fetch products (already initialized with dummy data)
  fetchProducts: async () => {
    set({ isLoading: false, error: null })
  },

  // Mock real-time subscription
  subscribeToProducts: () => {
    set({ isLoading: false })
    // Return a no-op unsubscribe function
    return () => {}
  },

  // Mock add new product
  addProduct: async (productData) => {
    console.log("Mocking add product:", productData)
    // Optionally: set({ products: [...useProductStore.getState().products, { id: Date.now(), ...productData }] })
    return { success: true }
  },

  // Mock delete product
  deleteProduct: async (productId) => {
    console.log("Mocking delete product:", productId)
    // Optionally: set({ products: useProductStore.getState().products.filter(p => p.id !== productId) })
    return { success: true }
  }
}))
