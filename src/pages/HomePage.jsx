import { useEffect, useMemo, useRef, useState } from 'react'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import StickyCategoryBar from '../components/StickyCategoryBar'
import FeaturedStories from '../components/FeaturedStories'
import { categories, products } from '../data/products'
import { useCartStore } from '../store'


function HomePage() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const sectionRefs = useRef({})
  const addItem = useCartStore((state) => state.addItem)
  const addFlyingImage = useCartStore((state) => state.addFlyingImage)

  const productsByCategory = useMemo(
    () =>
      categories.reduce((acc, category) => {
        acc[category] = products.filter((product) => product.category === category)
        return acc
      }, {}),
    [],
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
    <div className="space-y-6 sm:space-y-8">
      <FeaturedStories />

      <StickyCategoryBar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={scrollToCategory}
      />

      <section className="space-y-2 sm:space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Browse Full Menu
          </h2> */}
          {/* <p className="text-sm text-slate-500">All categories on one page</p> */}
        </div>

        {categories.map((category) => (
          <section
            key={category}
            id={category.toLowerCase()}
            ref={(element) => {
              sectionRefs.current[category] = element
            }}
            className="scroll-mt-44 space-y-4"
          >
            <h3 className="text-xl font-black tracking-tight text-gray-900 sm:text-2xl uppercase">
              {category}
            </h3>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {productsByCategory[category].map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  title={product.name}
                  description={product.description}
                  price={product.price}
                  isNew={product.id <= 4}
                  onAddToCart={(event) => {
                    addItem(product)
                    if (event) {
                      addFlyingImage(product.image, event.clientX, event.clientY)
                    }
                  }}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
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