function CategoryTabs({ categories, activeCategory, onSelect }) {
  return (
    <section>
      <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:pb-0">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              activeCategory === category
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  )
}

export default CategoryTabs
