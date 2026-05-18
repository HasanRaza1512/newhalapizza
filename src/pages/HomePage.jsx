import { useEffect, useMemo, useRef, useState } from 'react'
import ProductCard from '../components/ProductCard'
import ProductCardMobile from '../components/ProductCardMobile'
import ProductModal from '../components/ProductModal'
import StickyCategoryBar from '../components/StickyCategoryBar'
import FeaturedStories from '../components/FeaturedStories'
import ProductSkeleton from '../components/ProductSkeleton'
import DealsSection from '../components/DealsSection'
import { categories } from '../data/products'
import { deals } from '../data/deals'
import { useCartStore } from '../store'
import { useProductStore } from '../store/useProductStore'


function HomePage() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const sectionRefs = useRef({})
  const addItem = useCartStore((state) => state.addItem)
  const addFlyingImage = useCartStore((state) => state.addFlyingImage)
  
  const { products, isLoading, subscribeToProducts, initializeData } = useProductStore()

  useEffect(() => {
    // Initialize product data when component mounts
    initializeData()
    
    // Safety check for subscribeToProducts
    if (!subscribeToProducts) {
      console.error('subscribeToProducts is not available')
      return
    }
    
    const unsubscribe = subscribeToProducts()
    return () => unsubscribe()
  }, [subscribeToProducts])

  const productsByCategory = useMemo(
    () =>
      categories.reduce((acc, category) => {
        acc[category] = products.filter((product) => product.category === category)
        return acc
      }, {}),
    [products],
  )

  useEffect(() => {
    const observers = []

    categories.forEach((category) => {
      const element = sectionRefs.current[category]
      if (!element) {
        return
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveCategory(category)
          }
        },
        {
          rootMargin: '-35% 0px -55% 0px',
          threshold: 0.01,
        },
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  const scrollToCategory = (category) => {
    setActiveCategory(category)
    sectionRefs.current[category]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="space-y-2 pb-6 sm:space-y-16 lg:space-y-20 sm:pb-28">
      <FeaturedStories />

      {/* Unified Category Bar - Works on Desktop & Mobile */}
      <StickyCategoryBar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={scrollToCategory}
      />

      <section className="sm:px-6 lg:px-8">

        {categories.map((category) => (
          <section
            key={category}
            id={category.toLowerCase()}
            ref={(element) => {
              sectionRefs.current[category] = element
            }}
            className="scroll-mt-36 pt-4 pb-0 border-b border-gray-100 last:border-0 sm:scroll-mt-44 sm:py-8"
          >
            <div className="mb-3 sm:mb-6 flex items-center justify-between px-4 sm:px-0">
              <h3 className="text-[26px] font-black tracking-tight text-gray-900 sm:text-3xl uppercase">
                {category}
              </h3>
              <span className="text-sm font-bold text-gray-400">
                {category === 'Deals'
                  ? `${deals.length} deals`
                  : `${productsByCategory[category].length} items`}
              </span>
            </div>

            {/* Deals category — render DealsSection cards */}
            {category === 'Deals' ? (
              <div className="px-4 sm:px-0">
                <DealsSection
                  onDealClick={(deal) => setSelectedProduct(deal)}
                  onAddToCart={(deal, event) => {
                    addItem(deal)
                    if (event) addFlyingImage(deal.image, event.clientX, event.clientY)
                  }}
                />
              </div>
            ) : (
              <>
                {/* Desktop Layout */}
                <div className="hidden md:grid grid-cols-1 gap-x-16 gap-y-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {isLoading ? (
                    Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
                  ) : productsByCategory[category].length > 0 ? (
                    productsByCategory[category].map((product) => (
                      <ProductCard
                        key={product.id}
                        image={product.image}
                        title={product.name}
                        description={product.description}
                        price={product.price}
                        isNew={product.isNew}
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

                {/* Mobile Layout */}
                <div className="md:hidden">
                  {isLoading ? (
                    Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
                  ) : productsByCategory[category].length > 0 ? (
                    productsByCategory[category].map((product) => (
                      <ProductCardMobile
                        key={product.id}
                        image={product.image}
                        title={product.name}
                        description={product.description}
                        price={product.price}
                        isNew={product.isNew}
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
                    <div className="py-8 text-center">
                      <p className="text-sm text-gray-500">
                        No items found in this category
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </section>
        ))}
      </section>

      <ProductModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addItem}
      />
    </div>
  )
}

export default HomePage