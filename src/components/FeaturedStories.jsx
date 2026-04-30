import { useState } from 'react'
import { motion } from 'framer-motion'
import StoryViewer from './StoryViewer'

// Import images
import bestsellersImg from '../assets/stories/bestsellers.png'
import rewardsImg from '../assets/stories/rewards.png'
import bogoImg from '../assets/stories/bogo.png'
import newImg from '../assets/stories/new.png'
import combosImg from '../assets/stories/combos.png'
import deliveryImg from '../assets/stories/delivery.png'

const stories = [
  {
    id: 1,
    title: 'Bestsellers',
    description: 'Our most popular pizzas this week!',
    image: bestsellersImg,
  },
  {
    id: 2,
    title: 'Rewards',
    description: 'Earn points with every slice.',
    image: rewardsImg,
  },
  {
    id: 3,
    title: 'BOGO Wednesdays',
    description: 'Buy one get one free every Wednesday.',
    image: bogoImg,
  },
  {
    id: 4,
    title: 'Spicy New!',
    description: 'Try our new fiery jalapeno range.',
    image: newImg,
  },
  {
    id: 5,
    title: 'Family Combos',
    description: 'Perfect for a night in with the family.',
    image: combosImg,
  },
  {
    id: 6,
    title: 'Fast Delivery',
    description: 'Hot and fresh in under 30 minutes.',
    image: deliveryImg,
  },
]

function FeaturedStories() {
  const [selectedStory, setSelectedStory] = useState(null)

  return (
    <section className="py-2">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-6">
        {stories.map((story) => (
          <motion.button
            key={story.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedStory(story)}
            className="group relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-slate-100 text-left shadow-sm transition-shadow hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            {/* Background Image */}
            <img
              src={story.image}
              alt={story.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:from-black/90" />
            
            {/* Text Content */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="text-sm font-bold text-white sm:text-base lg:text-lg">
                {story.title}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <StoryViewer
        story={selectedStory}
        isOpen={Boolean(selectedStory)}
        onClose={() => setSelectedStory(null)}
      />
    </section>
  )
}

export default FeaturedStories
