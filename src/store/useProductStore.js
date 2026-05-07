import { create } from 'zustand'
import { productService } from '../services/productService'

export const useProductStore = create((set, get) => ({
  products: [],
  categories: [],
  heroSlides: [],
  featuredProducts: [],
  isLoading: false,
  error: null,

  // Fetch all products
  fetchProducts: async (filters = {}) => {
    set({ isLoading: true, error: null })
    try {
      const response = await productService.getProducts(filters)
      set({ 
        products: response.data,
        isLoading: false 
      })
      return response
    } catch (error) {
      set({ 
        error: error.message,
        isLoading: false 
      })
      throw error
    }
  },

  // Fetch categories
  fetchCategories: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await productService.getCategories()
      set({ 
        categories: response.data,
        isLoading: false 
      })
      return response
    } catch (error) {
      set({ 
        error: error.message,
        isLoading: false 
      })
      throw error
    }
  },

  // Fetch hero slides
  fetchHeroSlides: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await productService.getHeroSlides()
      set({ 
        heroSlides: response.data,
        isLoading: false 
      })
      return response
    } catch (error) {
      set({ 
        error: error.message,
        isLoading: false 
      })
      throw error
    }
  },

  // Fetch featured products
  fetchFeaturedProducts: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await productService.getFeaturedProducts()
      set({ 
        featuredProducts: response.data,
        isLoading: false 
      })
      return response
    } catch (error) {
      set({ 
        error: error.message,
        isLoading: false 
      })
      throw error
    }
  },

  // Get product by ID
  getProductById: async (productId) => {
    set({ isLoading: true, error: null })
    try {
      const response = await productService.getProductById(productId)
      set({ isLoading: false })
      return response
    } catch (error) {
      set({ 
        error: error.message,
        isLoading: false 
      })
      throw error
    }
  },

  // Search products
  searchProducts: async (query) => {
    set({ isLoading: true, error: null })
    try {
      const response = await productService.searchProducts(query)
      set({ isLoading: false })
      return response
    } catch (error) {
      set({ 
        error: error.message,
        isLoading: false 
      })
      throw error
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    set({ isLoading: true, error: null })
    try {
      const response = await productService.getProductsByCategory(category)
      set({ isLoading: false })
      return response
    } catch (error) {
      set({ 
        error: error.message,
        isLoading: false 
      })
      throw error
    }
  },

  // Initialize all data
  initializeData: async () => {
    try {
      await Promise.all([
        get().fetchProducts(),
        get().fetchCategories(),
        get().fetchHeroSlides(),
        get().fetchFeaturedProducts()
      ])
    } catch (error) {
      console.error('Failed to initialize product data:', error)
    }
  },

  // Clear error
  clearError: () => set({ error: null })
}))
