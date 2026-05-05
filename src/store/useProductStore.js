import { create } from 'zustand'
import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  onSnapshot
} from 'firebase/firestore'
import { db } from '../lib/firebase'

import { products as dummyProducts } from '../data/products'

export const useProductStore = create((set) => ({
  products: dummyProducts,
  isLoading: false,
  error: null,

  // Fetch products from Firestore
  fetchProducts: async () => {
    const { products } = useProductStore.getState()
    if (products.length === 0) set({ isLoading: true, error: null })
    try {
      const productsCol = collection(db, 'products')
      const q = query(productsCol, orderBy('category'))
      const snapshot = await getDocs(q)
      const productList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      set({ products: productList, isLoading: false })
    } catch (err) {
      console.error("Error fetching products:", err)
      set({ error: err.message, isLoading: false })
    }
  },

  // Real-time subscription to products
  subscribeToProducts: () => {
    const { products } = useProductStore.getState()
    if (products.length === 0) set({ isLoading: true })
    const productsCol = collection(db, 'products')
    const q = query(productsCol, orderBy('category'))
    
    return onSnapshot(q, (snapshot) => {
      const productList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      set({ products: productList, isLoading: false })
    }, (err) => {
      console.error("Subscription error:", err)
      set({ error: err.message, isLoading: false })
    })
  },

  // Add new product (Admin)
  addProduct: async (productData) => {
    try {
      const productsCol = collection(db, 'products')
      await addDoc(productsCol, {
        ...productData,
        createdAt: new Date().toISOString()
      })
      return { success: true }
    } catch (err) {
      console.error("Error adding product:", err)
      return { success: false, error: err.message }
    }
  },

  // Delete product (Admin)
  deleteProduct: async (productId) => {
    try {
      const productRef = doc(db, 'products', productId)
      await deleteDoc(productRef)
      return { success: true }
    } catch (err) {
      console.error("Error deleting product:", err)
      return { success: false, error: err.message }
    }
  }
}))
