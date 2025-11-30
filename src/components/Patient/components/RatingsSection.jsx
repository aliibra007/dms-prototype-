import React, { useRef } from 'react'
import { Star, Lock } from 'lucide-react'
import { motion, useInView } from 'framer-motion'

const RatingsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="space-y-6"
        >
          {/* Star Rating */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={32}
                className="fill-accent-light dark:fill-accent-dark text-accent-light dark:text-accent-dark"
              />
            ))}
            <span className="text-3xl font-bold text-gray-900 dark:text-white ml-2">
              4.9/5.0
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Patient <span className="text-primary-light dark:text-primary-dark">Reviews</span>
          </h2>

          {/* Verified Badge */}
          <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
            <Lock size={16} />
            <span className="text-sm">Based on verified patient visits</span>
          </div>

          {/* Review Count */}
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Based on <span className="font-semibold">1,247</span> verified
            patient reviews
          </p>

          {/* Verified Only Badge */}
          <div className="pt-4">
            <span className="inline-block px-4 py-2 rounded-full bg-accent-light/10 dark:bg-accent-dark/20 text-accent-light dark:text-accent-dark font-medium">
              Ratings available only after clinic visit
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default RatingsSection

