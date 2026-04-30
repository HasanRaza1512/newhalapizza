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
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-slate-900/5 sm:p-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Explore Our Menu
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
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
              className="scroll-mt-[80px] space-y-4 sm:space-y-5"
            >
              <h2 className="text-2xl font-bold text-slate-900">{category}</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
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
