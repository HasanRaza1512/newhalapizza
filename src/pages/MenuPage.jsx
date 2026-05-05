import { useState, useEffect } from 'react'
import StickyCategoryBar from '../components/StickyCategoryBar'
import TopCards from '../components/TopCards'
import ProductCard from '../components/ProductCard'
import ProductSkeleton from '../components/ProductSkeleton'
import ProductModal from '../components/ProductModal'
import { categories, products as initialProducts } from '../data/products'
import { useCartStore } from '../store'


function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState([])
  const addItem = useCartStore((state) => state.addItem)
  const addFlyingImage = useCartStore((state) => state.addFlyingImage)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(initialProducts)
      setIsLoading(false)
    }, 1500)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id)
          }
        })
      },
      {
        // Adjust the margins to trigger when the section reaches near the top (under sticky bar)
        rootMargin: '-120px 0px -70% 0px',
      }
    )

    categories.forEach((category) => {
      const el = document.getElementById(category)
      if (el) observer.observe(el)
    })

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  const scrollToCategory = (category) => {
    setActiveCategory(category)
    const el = document.getElementById(category)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="space-y-12 pb-12 sm:space-y-16 lg:space-y-20">
      <section className="mx-4 rounded-3xl border border-gray-100 bg-gray-50/50 p-8 shadow-sm sm:mx-6 sm:p-12 lg:mx-8">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-5xl uppercase">
          Full Menu
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg">
          Explore our wide range of authentic pizzas and sides, crafted with 
          the freshest ingredients and baked to perfection.
        </p>
      </section>

      <div className="px-4 sm:px-6 lg:px-8">
        <TopCards />
      </div>

      <StickyCategoryBar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={scrollToCategory}
      />

      <div className="space-y-0 px-4 sm:px-6 lg:px-8">
        {categories.map((category) => {
          const categoryProducts = isLoading 
            ? Array.from({ length: 4 })
            : products.filter((product) => product.category === category)

          if (!isLoading && categoryProducts.length === 0) return null

          return (
            <section
              key={category}
              id={category}
              className="scroll-mt-[180px] py-12 border-b border-gray-100 last:border-0"
            >
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{category}</h2>
                <span className="text-sm font-bold text-gray-400">
                   {isLoading ? '...' : categoryProducts.length} items
                </span>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {isLoading ? (
                  categoryProducts.map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))
                ) : categoryProducts.length > 0 ? (
                  categoryProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      image={product.image}
                      title={product.name}
                      price={product.price}
                      onAddToCart={(event) => {
                        addItem(product)
                        if (event) {
                          addFlyingImage(product.image, event.clientX, event.clientY)
                        }
                      }}
                      onClick={() => setSelectedProduct(product)}
                    />
                  ))
                ) : (
                  <div className="col-span-full rounded-3xl border-2 border-dashed border-gray-100 py-16 text-center">
                    <p className="text-sm font-black uppercase tracking-widest text-gray-300">
                      No items found in this category
                    </p>
                  </div>
                )}
              </div>
            </section>
          )
        })}
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addItem}
      />
    </div>
  )
}

export default MenuPage
