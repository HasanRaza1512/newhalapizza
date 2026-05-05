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
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">
      <section className="rounded-2xl border border-gray-100 bg-gray-50/50 p-5 shadow-sm sm:p-6">
        <h1 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl uppercase">
          Explore Our Menu
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
          Pick a category, browse our favorites, and customize any item before
          adding it to your cart.
        </p>
      </section>

      <TopCards />

      <StickyCategoryBar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={scrollToCategory}
      />

      <div className="space-y-12 pb-12">
        {categories.map((category) => {
          const categoryProducts = isLoading 
            ? Array.from({ length: 4 })
            : products.filter((product) => product.category === category)

          if (!isLoading && categoryProducts.length === 0) return null

          return (
            <section
              key={category}
              id={category}
              className="scroll-mt-[180px] space-y-4 sm:space-y-5"
            >
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{category}</h2>
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {isLoading ? (
                  categoryProducts.map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))
                ) : (
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
