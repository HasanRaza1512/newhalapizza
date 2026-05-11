import { useState } from 'react'
import { useProductStore } from '../store/useProductStore'
import { categories } from '../data/products'
import { FiPlus, FiTrash2, FiBox, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

function AdminPage() {
  const { products, addProduct, deleteProduct, isLoading } = useProductStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: categories[1], // Default to Pizza
    description: '',
    image: '',
    isNew: true
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    const result = await addProduct({
      ...formData,
      price: parseFloat(formData.price)
    })

    if (result.success) {
      setStatus({ type: 'success', message: 'Product added successfully!' })
      setFormData({
        name: '',
        price: '',
        category: categories[1],
        description: '',
        image: '',
        isNew: true
      })
    } else {
      setStatus({ type: 'error', message: result.error || 'Failed to add product' })
    }
    setIsSubmitting(false)
  }

  return (
    <div className="space-y-12">
      <header className="rounded-3xl bg-gray-900 p-8 text-white sm:p-12">
        <h1 className="text-3xl font-black uppercase tracking-tight sm:text-5xl">
          Admin <span className="text-orange-500">Panel</span>
        </h1>
        <p className="mt-4 text-gray-400">Manage your menu items and prices.</p>
      </header>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Add Product Form */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <FiPlus className="text-2xl text-orange-500" />
            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">Add New Product</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Product Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  placeholder="e.g. BBQ Chicken Pizza"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Price (PKR)</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  placeholder="29.99"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Image URL</label>
              <input
                required
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
                className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                placeholder="Brief description of the product..."
              />
            </div>

            <button
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-orange-500 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-orange-500/20 transition-all hover:bg-orange-600 active:scale-95 disabled:bg-gray-200"
            >
              {isSubmitting ? 'Adding...' : 'Add Product'}
            </button>

            <AnimatePresence>
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex items-center gap-2 rounded-2xl p-4 text-sm font-bold ${status.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}
                >
                  {status.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </section>

        {/* Product List */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <FiBox className="text-2xl text-orange-500" />
            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">Active Products</h2>
          </div>

          <div className="space-y-3">
            {products.length === 0 && !isLoading && (
              <div className="rounded-3xl border-2 border-dashed border-gray-100 py-20 text-center text-gray-400">
                No products found in database.
              </div>
            )}

            {products.map((product) => (
              <div key={product.id} className="flex items-center gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md">
                <img src={product.image} className="h-16 w-16 rounded-full object-cover" alt={product.name} />
                <div className="flex-1">
                  <h3 className="font-black text-gray-900">{product.name}</h3>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">{product.category}</span>
                    <span className="text-[10px] font-bold text-gray-400">PKR {product.price}</span>
                  </div>
                </div>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="rounded-full p-3 text-gray-400 transition-colors hover:bg-rose-50 hover:text-rose-500"
                >
                  <FiTrash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default AdminPage
