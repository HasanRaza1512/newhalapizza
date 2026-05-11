import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { sizeOptions, simpleSizeOptions, drinkSizeOptions, crustOptions, toppingOptions } from '../data/options'
import { orderService } from '../services/orderService'

export const calculateItemPrice = (basePrice, category, options) => {
  const cat = category?.toLowerCase() || ''
  
  if (cat === 'pizza') {
    let sizeMultiplier = 1
    if (options.size) {
      const sizeOpt = sizeOptions.find((s) => s.label === options.size)
      if (sizeOpt) sizeMultiplier = sizeOpt.multiplier
    }

    let toppingsPrice = 0
    if (options.toppings && options.toppings.length > 0) {
      options.toppings.forEach((toppingLabel) => {
        const tOpt = toppingOptions.find(
          (t) => t.id === toppingLabel || t.label === toppingLabel,
        )
        if (tOpt) toppingsPrice += tOpt.price
      })
    }

    let crustPrice = 0
    if (options.crust) {
      const cOpt = crustOptions.find((c) => c.label === options.crust)
      if (cOpt) crustPrice += cOpt.price
    }

    return Number((basePrice * sizeMultiplier + toppingsPrice + crustPrice).toFixed(2))
  }

  if (cat === 'drinks') {
    let extraPrice = 0
    if (options.size) {
      const sizeOpt = drinkSizeOptions.find((s) => s.label === options.size)
      if (sizeOpt) extraPrice = sizeOpt.extraPrice
    }
    return Number((basePrice + extraPrice).toFixed(2))
  }

  // Simple categories (Fries, Pasta, Burgers, etc.)
  let extraPrice = 0
  if (options.size) {
    const sizeOpt = simpleSizeOptions.find((s) => s.label === options.size)
    if (sizeOpt) extraPrice = sizeOpt.extraPrice
  }
  return Number((basePrice + extraPrice).toFixed(2))
}

const buildCartItemKey = (productId, options) => {
  const size = options.size || 'default'
  const crust = options.crust || 'none'
  const toppings =
    options.toppings && options.toppings.length > 0
      ? [...options.toppings].sort().join(',')
      : 'none'
  return `${productId}-${size}-${crust}-${toppings}`
}

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      isDeliveryPopupOpen: false,
      fulfillment: null, // { type: 'delivery' | 'pickup', phone: string, address?: string }
      
      // Order states
      isSubmittingOrder: false,
      orderError: null,
      lastOrder: null,

      // UI actions
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      openDeliveryPopup: () => set({ isDeliveryPopupOpen: true }),
      closeDeliveryPopup: () => set({ isDeliveryPopupOpen: false }),
      clearCart: () => set({ items: [] }),
      setFulfillment: (details) => set({ fulfillment: details }),

      // Flying images for animation
      flyingImages: [],
      addFlyingImage: (url, startX, startY) => set((state) => ({
        flyingImages: [...state.flyingImages, { id: Date.now() + Math.random(), url, startX, startY }]
      })),
      removeFlyingImage: (id) => set((state) => ({
        flyingImages: state.flyingImages.filter(img => img.id !== id)
      })),

      // Cart item management
      addItem: (product, options = {}, quantity = 1) =>
        set((state) => {
          const cat = product.category?.toLowerCase() || ''
          const defaultOptions = {
            size: cat === 'pizza' ? 'Medium' : cat === 'drinks' ? '500ml' : 'Small',
            crust: cat === 'pizza' ? 'Classic Hand Tossed' : undefined,
            toppings: [],
            ...options,
          }

          const cartKey = buildCartItemKey(product.id, defaultOptions)
          const existingItem = state.items.find((item) => item.cartKey === cartKey)

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.cartKey === cartKey
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            }
          }

          const price = calculateItemPrice(product.price, product.category, defaultOptions)

          return {
            items: [
              ...state.items,
              {
                id: product.id,
                cartKey,
                name: product.name,
                image: product.image,
                category: product.category,
                price,
                options: defaultOptions,
                quantity: quantity,
              },
            ],
          }
        }),

      removeItem: (cartKey) =>
        set((state) => ({
          items: state.items.filter((item) => item.cartKey !== cartKey),
        })),

      increaseQuantity: (cartKey) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.cartKey === cartKey
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        })),

      decreaseQuantity: (cartKey) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.cartKey === cartKey
                ? { ...item, quantity: Math.max(0, item.quantity - 1) }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),

      // Order submission
      submitOrder: async (customerInfo) => {
        const state = get();
        
        if (state.items.length === 0) {
          throw new Error('Cart is empty')
        }

        set({ isSubmittingOrder: true, orderError: null })

        try {
          const orderData = {
            customerInfo: {
              name: customerInfo.name,
              phone: customerInfo.phone,
              address: customerInfo.address,
              notes: customerInfo.notes || ''
            },
            items: state.items.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              options: item.options,
              category: item.category
            })),
            fulfillment: state.fulfillment,
            totalAmount: state.getCartTotal(),
            deliveryFee: state.fulfillment?.type === 'delivery' ? 5.99 : 0,
            timestamp: new Date().toISOString()
          }

          const response = await orderService.submitOrder(orderData)
          
          set({
            lastOrder: response.data,
            isSubmittingOrder: false
          })

          // Clear cart after successful order
          state.clearCart()
          
          return response.data
        } catch (error) {
          set({
            orderError: error.message,
            isSubmittingOrder: false
          })
          throw error
        }
      },

      // Cart calculations
      getCartTotal: () => {
        const state = get()
        const subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
        const deliveryFee = state.fulfillment?.type === 'delivery' ? 5.99 : 0
        return subtotal + deliveryFee
      },

      getCartItemCount: () => {
        const state = get()
        return state.items.reduce((total, item) => total + item.quantity, 0)
      },

      // Order management
      clearOrderError: () => set({ orderError: null }),
      clearLastOrder: () => set({ lastOrder: null })
    }),
    {
      name: 'pizza-cart-storage',
      partialize: (state) => ({ 
        items: state.items,
        fulfillment: state.fulfillment,
        lastOrder: state.lastOrder
      }),
    },
  ),
)
