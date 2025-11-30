import React from 'react'
import { Calendar, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
      style={{ minHeight: '600px', paddingTop: '0' }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1606811971618-4486c565f4fa?w=1920&q=80"
          alt="Modern dental clinic"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl relative z-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent-light/10 dark:bg-accent-dark/20 text-accent-light dark:text-accent-dark font-medium backdrop-blur-sm">
              Modern Dental Care
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="text-gray-900 dark:text-white">Your Smile, </span>
            <span className="text-primary-light dark:text-primary-dark">
              Our Priority
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 p-4 rounded-lg md:bg-transparent md:dark:bg-transparent md:backdrop-blur-none md:p-0"
          >
            Experience top-tier dental care with cutting-edge technology and a
            team that actually cares about your comfort.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-primary-light dark:bg-primary-dark text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm"
            >
              <Calendar size={20} />
              <span>Book Ur Visit Now</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="flex items-center justify-center space-x-2 px-8 py-4 border-2 border-accent-light dark:border-accent-dark text-accent-light dark:text-accent-dark rounded-lg font-semibold text-lg hover:bg-accent-light dark:hover:bg-accent-dark hover:text-white transition-colors backdrop-blur-sm bg-white/30 dark:bg-gray-900/30"
            >
              <span>Learn More</span>
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

