import ProductCard from './ProductCard'
import ProductCardMobile from './ProductCardMobile'
import { deals } from '../data/deals'

/**
 * DealsSection renders deals using the SAME ProductCard / ProductCardMobile
 * components as the rest of the store — so they look and feel identical.
 *
 * onDealClick  → opens ProductModal (passed from HomePage)
 * onAddToCart  → adds deal directly to cart (passed from HomePage)
 */
function DealsSection({ onDealClick, onAddToCart }) {
  return (
    <>
      {/* Desktop: same 4-column grid used elsewhere */}
      <div className="hidden md:grid grid-cols-1 gap-x-16 gap-y-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {deals.map((deal) => (
          <ProductCard
            key={deal.id}
            image={deal.image}
            title={deal.name}
            description={deal.description}
            price={deal.price}
            oldPrice={deal.oldPrice}
            isNew={deal.isNew}
            isDeal={deal.isDeal}
            onAddToCart={(e) => onAddToCart?.(deal, e)}
            onClick={() => onDealClick?.(deal)}
          />
        ))}
      </div>

      {/* Mobile: same row layout used elsewhere */}
      <div className="md:hidden">
        {deals.map((deal) => (
          <ProductCardMobile
            key={deal.id}
            image={deal.image}
            title={deal.name}
            description={deal.description}
            price={deal.price}
            oldPrice={deal.oldPrice}
            isNew={deal.isNew}
            isDeal={deal.isDeal}
            onAddToCart={(e) => onAddToCart?.(deal, e)}
            onClick={() => onDealClick?.(deal)}
          />
        ))}
      </div>
    </>
  )
}

export default DealsSection
