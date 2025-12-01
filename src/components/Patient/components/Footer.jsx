import React from 'react'
import { Phone, Mail, MapPin, Smile } from 'lucide-react'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Treatments', href: '#treatments' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer
      id="contact"
      className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Clinic Info */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-primary-light dark:bg-primary-dark text-white">
                <Smile size={24} />
              </div>
              <span className="text-xl font-bold text-primary-light dark:text-primary-dark">
                Mastery Dental
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Your trusted partner for comprehensive dental care. We combine
              years of experience with modern technology.
            </p>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.href)
                    }}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone
                  size={20}
                  className="text-accent-light dark:text-accent-dark"
                />
                <a
                  href="tel:+9613123456"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                >
                  +961 3 123 456
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail
                  size={20}
                  className="text-accent-light dark:text-accent-dark"
                />
                <a
                  href="mailto:info@masterydental.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                >
                  info@masterydental.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin
                  size={20}
                  className="text-accent-light dark:text-accent-dark mt-1"
                />
                <span className="text-gray-600 dark:text-gray-400">
                  123 Main Street, City, State 12345
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 dark:border-muted-dark mt-8 pt-8">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            &copy; {currentYear} Mastery Dental. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

