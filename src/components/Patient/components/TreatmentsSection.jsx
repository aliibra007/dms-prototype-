import React from 'react'
import {
  Stethoscope,
  Smile,
  Scan,
  Activity,
  Sparkles,
  AlertCircle,
} from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const TreatmentsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const treatments = [
    {
      icon: Stethoscope,
      title: 'General Dentistry',
      description:
        'Comprehensive oral health care including cleanings, fillings, and preventive treatments.',
    },
    {
      icon: Smile,
      title: 'Cosmetic Dentistry',
      description:
        'Transform your smile with teeth whitening, veneers, and smile makeovers.',
    },
    {
      icon: Scan,
      title: 'Orthodontics',
      description:
        'Straighten your teeth with modern braces and clear aligner treatments.',
    },
    {
      icon: Activity,
      title: 'Dental Implants',
      description:
        'Permanent tooth replacement solutions that look and feel natural.',
    },
    {
      icon: Sparkles,
      title: 'Teeth Whitening',
      description:
        'Professional whitening treatments for a brighter, more confident smile.',
    },
    {
      icon: AlertCircle,
      title: 'Emergency Care',
      description:
        '24/7 emergency dental services for urgent dental issues and pain relief.',
    },
  ]

  return (
    <section
      id="treatments"
      ref={ref}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary-light dark:bg-secondary-dark"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our <span className="text-primary-light dark:text-primary-dark">Treatments</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Comprehensive dental care tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((treatment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05,
                ease: [0.4, 0, 0.2, 1]
              }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-2xl transition-all border border-gray-200 dark:border-muted-dark cursor-pointer"
            >
              <div className="text-accent-light dark:text-accent-dark mb-4">
                <treatment.icon size={40} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {treatment.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {treatment.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TreatmentsSection

