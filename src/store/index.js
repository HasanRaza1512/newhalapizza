import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { sizeOptions, crustOptions, toppingOptions } from '../data/options'

export const calculateItemPrice = (basePrice, category, options) => {
  let sizeMultiplier = 1;
  if (options.size) {
    const sizeOpt = sizeOptions.find(s => s.label === options.size);
    if (sizeOpt) sizeMultiplier = sizeOpt.multiplier;
  }
  
  let toppingsPrice = 0;
  if (options.toppings && options.toppings.length > 0) {
    options.toppings.forEach(toppingLabel => {
      const tOpt = toppingOptions.find(t => t.id === toppingLabel || t.label === toppingLabel);
      if (tOpt) toppingsPrice += tOpt.price;
    });
  }

  let crustPrice = 0;
  if (category === 'Pizza' && options.crust) {
    const cOpt = crustOptions.find(c => c.label === options.crust);
    if (cOpt) crustPrice += cOpt.price;
  }

  return Number((basePrice * sizeMultiplier + toppingsPrice + crustPrice).toFixed(2));
}

const buildCartItemKey = (productId, options) => {
  const size = options.size || 'default';
  const crust = options.crust || 'default';
  const toppings = options.toppings && options.toppings.length > 0 
    ? [...options.toppings].sort().join(',') 
    : 'none';
  return `${productId}-${size}-${crust}-${toppings}`;
}

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      isCartOpen: false,
      isDeliveryPopupOpen: false,
      fulfillment: null, // { type: 'delivery' | 'pickup', phone: string, address?: string }
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      openDeliveryPopup: () => set({ isDeliveryPopupOpen: true }),
      closeDeliveryPopup: () => set({ isDeliveryPopupOpen: false }),
      clearCart: () => set({ items: [] }),
      setFulfillment: (details) => set({ fulfillment: details }),

      flyingImages: [],
      addFlyingImage: (url, startX, startY) => set((state) => ({
        flyingImages: [...state.flyingImages, { id: Date.now() + Math.random(), url, startX, startY }]
      })),
      removeFlyingImage: (id) => set((state) => ({
        flyingImages: state.flyingImages.filter(img => img.id !== id)
      })),

      addItem: (product, options = {}) =>
        set((state) => {
          const defaultOptions = {
             size: 'Medium',
             crust: product.category === 'Pizza' ? 'Classic Hand Tossed' : undefined,
             toppings: [],
             ...options
          };

          const cartKey = buildCartItemKey(product.id, defaultOptions);
          const existingItem = state.items.find((item) => item.cartKey === cartKey);

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.cartKey === cartKey
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          const price = calculateItemPrice(product.price, product.category, defaultOptions);

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
                quantity: 1,
              },
            ],
          };
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
    }),
    {
      name: 'pizza-cart-storage',
      partialize: (state) => ({ 
        items: state.items,
        fulfillment: state.fulfillment 
      }),
    },
  ),
)
