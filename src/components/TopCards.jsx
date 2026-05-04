import {
  FiGift,
  FiInfo,
  FiLayers,
  FiStar,
  FiTag,
  FiTruck,
} from 'react-icons/fi'

const cards = [
  {
    title: 'Bestsellers',
    subtitle: 'Most loved picks',
    icon: FiStar,
    gradient: 'from-orange-400 to-amber-300',
  },
  {
    title: 'Rewards',
    subtitle: 'Earn points daily',
    icon: FiGift,
    gradient: 'from-violet-500 to-fuchsia-400',
  },
  {
    title: 'BOGO',
    subtitle: 'Buy 1 Get 1 deals',
    icon: FiTag,
    gradient: 'from-red-500 to-orange-400',
  },
  {
    title: 'Fast Delivery',
    subtitle: 'Fresh under 30 mins',
    icon: FiTruck,
    gradient: 'from-sky-500 to-cyan-400',
  },
  {
    title: 'Combos',
    subtitle: 'Smart family meals',
    icon: FiLayers,
    gradient: 'from-emerald-500 to-lime-400',
  },
  {
    title: 'About us',
    subtitle: 'Our pizza story',
    icon: FiInfo,
    gradient: 'from-slate-600 to-slate-400',
  },
]

function TopCards() {
  return (
    <section className="overflow-x-auto">
      <div className="flex min-w-max gap-3 pb-2 sm:gap-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
          <div
            key={card.title}
            className={`group relative h-40 w-56 shrink-0 overflow-hidden rounded-3xl bg-gradient-to-br ${card.gradient} p-5 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40`}
          >
            <div className="absolute -right-6 -top-6 rounded-full bg-white/20 p-6 blur-sm" />
            <Icon className="relative z-10 h-6 w-6" />
            <div className="relative z-10 mt-8">
              <p className="text-xl font-bold tracking-tight">{card.title}</p>
              <p className="mt-1 text-sm text-white/90">{card.subtitle}</p>
            </div>
          </div>
          )
        })}
      </div>
    </section>
  )
}

export default TopCards