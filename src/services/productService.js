import { products as mockProducts, categories, heroSlides } from '../data/products'

// Simulate API delay
const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms))

export const productService = {
  // Get all products
  getProducts: async (filters = {}) => {
    await delay()
    
    let filteredProducts = [...mockProducts]
    
    // Filter by category
    if (filters.category && filters.category !== 'All') {
      filteredProducts = filteredProducts.filter(
        product => product.category === filters.category
      )
    }
    
    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredProducts = filteredProducts.filter(
        product => 
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
      )
    }
    
    // Filter new items
    if (filters.isNew) {
      filteredProducts = filteredProducts.filter(product => product.isNew)
    }
    
    return {
      success: true,
      data: filteredProducts,
      total: filteredProducts.length
    }
  },

  // Get product by ID
  getProductById: async (productId) => {
    await delay()
    
    const product = mockProducts.find(p => p.id === parseInt(productId))
    
    if (!product) {
      throw new Error('Product not found')
    }
    
    return {
      success: true,
      data: product
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    await delay()
    
    const categoryProducts = mockProducts.filter(
      product => product.category === category
    )
    
    return {
      success: true,
      data: categoryProducts,
      total: categoryProducts.length
    }
  },

  // Get all categories
  getCategories: async () => {
    await delay(300)
    
    return {
      success: true,
      data: ['All', ...categories]
    }
  },

  // Get hero slides
  getHeroSlides: async () => {
    await delay(300)
    
    return {
      success: true,
      data: heroSlides
    }
  },

  // Search products
  searchProducts: async (query) => {
    await delay()
    
    if (!query || query.trim() === '') {
      return {
        success: true,
        data: [],
        total: 0
      }
    }
    
    const searchResults = mockProducts.filter(
      product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    )
    
    return {
      success: true,
      data: searchResults,
      total: searchResults.length
    }
  },

  // Get featured/new products
  getFeaturedProducts: async () => {
    await delay()
    
    const featuredProducts = mockProducts.filter(product => product.isNew)
    
    return {
      success: true,
      data: featuredProducts,
      total: featuredProducts.length
    }
  },

  // Subscribe to products (for real-time updates)
  subscribeToProducts: (callback) => {
    // Return mock subscription with cleanup
    setTimeout(() => {
      callback(mockProducts)
    }, 1000)
    
    return {
      unsubscribe: () => {
        // Cleanup function
        console.log('Unsubscribed from products')
      }
    }
  }
}
