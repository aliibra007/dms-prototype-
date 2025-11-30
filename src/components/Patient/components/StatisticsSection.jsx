import React, { useRef, useState, useEffect } from 'react'
import { Award, Users, UserCheck, TrendingUp } from 'lucide-react'
import { motion, useInView } from 'framer-motion'

const AnimatedCounter = ({ value, suffix = '', duration = 1.2 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
    const startTime = Date.now()
    const endTime = startTime + duration * 1000

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (endTime - startTime), 1)
      const currentCount = Math.floor(progress * numericValue)
      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(numericValue)
      }
    }

    updateCount()
  }, [isInView, value, duration])

  const displayValue = value.includes('+')
    ? `${count.toLocaleString()}+`
    : value.includes('%')
    ? `${count}%`
    : count.toLocaleString()

  return <span ref={ref}>{displayValue}</span>
}

const StatisticsSection = () => {
  const stats = [
    {
      icon: Award,
      value: '15+',
      label: 'Years of Excellence',
      color: 'text-primary-light dark:text-primary-dark',
    },
    {
      icon: Users,
      value: '10000+',
      label: 'Happy Patients',
      color: 'text-accent-light dark:text-accent-dark',
    },
    {
      icon: UserCheck,
      value: '25+',
      label: 'Expert Dentists',
      color: 'text-primary-light dark:text-primary-dark',
    },
    {
      icon: TrendingUp,
      value: '98%',
      label: 'Success Rate',
      color: 'text-accent-light dark:text-accent-dark',
    },
  ]

  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={containerRef}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary-light dark:from-secondary-dark to-white dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by <span className="text-primary-light dark:text-primary-dark">Thousands</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Numbers that speak for themselves - delivering exceptional dental
            care with proven results
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05,
                ease: [0.4, 0, 0.2, 1]
              }}
              whileHover={{ scale: 1.03, y: -3 }}
              className="bg-white dark:bg-secondary-dark rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-muted-dark"
            >
              <div
                className={`${stat.color} mb-4 flex justify-center`}
              >
                <stat.icon size={40} />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatisticsSection

