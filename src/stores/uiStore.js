import { create } from 'zustand'

export const useUIStore = create((set, get) => ({
  // UI States
  isLoading: false,
  isMenuOpen: false,
  isSearchOpen: false,
  isCartOpen: false,
  isCheckoutOpen: false,
  isMobileMenuOpen: false,
  
  // Notifications
  notifications: [],
  
  // Theme
  theme: 'light',
  
  // Search
  searchQuery: '',
  searchResults: [],
  isSearching: false,
  
  // Loading states for different operations
  loadingStates: {
    products: false,
    categories: false,
    order: false,
    checkout: false
  },
  
  // Error states
  errors: {
    products: null,
    categories: null,
    order: null,
    checkout: null
  },

  // Actions
  setLoading: (isLoading) => set({ isLoading }),
  
  setMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
  
  setSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
  
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
  
  setCheckoutOpen: (isOpen) => set({ isCheckoutOpen: isOpen }),
  
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  
  // Search actions
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setSearchResults: (results) => set({ searchResults: results }),
  
  setIsSearching: (isSearching) => set({ isSearching }),
  
  clearSearch: () => set({ 
    searchQuery: '', 
    searchResults: [], 
    isSearching: false 
  }),
  
  // Loading state management
  setLoadingState: (key, isLoading) => set((state) => ({
    loadingStates: {
      ...state.loadingStates,
      [key]: isLoading
    }
  })),
  
  // Error management
  setError: (key, error) => set((state) => ({
    errors: {
      ...state.errors,
      [key]: error
    }
  })),
  
  clearError: (key) => set((state) => ({
    errors: {
      ...state.errors,
      [key]: null
    }
  })),
  
  clearAllErrors: () => set({
    errors: {
      products: null,
      categories: null,
      order: null,
      checkout: null
    }
  }),
  
  // Notification management
  addNotification: (notification) => set((state) => ({
    notifications: [
      ...state.notifications,
      {
        id: Date.now() + Math.random(),
        ...notification,
        timestamp: new Date().toISOString()
      }
    ]
  })),
  
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  
  clearNotifications: () => set({ notifications: [] }),
  
  // Theme management
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
  
  setTheme: (theme) => set({ theme }),
  
  // Utility functions
  closeAllModals: () => set({
    isMenuOpen: false,
    isSearchOpen: false,
    isCartOpen: false,
    isCheckoutOpen: false,
    isMobileMenuOpen: false
  }),
  
  resetUI: () => set({
    isLoading: false,
    isMenuOpen: false,
    isSearchOpen: false,
    isCartOpen: false,
    isCheckoutOpen: false,
    isMobileMenuOpen: false,
    notifications: [],
    searchQuery: '',
    searchResults: [],
    isSearching: false,
    loadingStates: {
      products: false,
      categories: false,
      order: false,
      checkout: false
    },
    errors: {
      products: null,
      categories: null,
      order: null,
      checkout: null
    }
  })
}))
