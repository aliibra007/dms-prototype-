import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, Eye, EyeOff, User, Loader2, Phone, Calendar, UserCircle, ChevronDown } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const LoginModal = ({ isOpen, onClose }) => {
  const { theme } = useTheme()
  const [isLogin, setIsLogin] = useState(true) // Toggle between login and signup
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    dateOfBirth: '',
    phoneNumber: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isGenderOpen, setIsGenderOpen] = useState(false)
  const genderDropdownRef = useRef(null)
  
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (genderDropdownRef.current && !genderDropdownRef.current.contains(event.target)) {
        setIsGenderOpen(false)
      }
    }

    if (isGenderOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isGenderOpen])

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Validation
    if (isLogin) {
      if (!formData.username || !formData.password) {
        setError('Please fill in all required fields')
        setIsLoading(false)
        return
      }
    } else {
      // Signup validation - all fields required except email
      if (!formData.username || !formData.fullName || !formData.dateOfBirth || 
          !formData.phoneNumber || !formData.gender || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all required fields')
        setIsLoading(false)
        return
      }
      
      // Email validation (optional but if provided, must be valid)
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError('Please enter a valid email address')
        setIsLoading(false)
        return
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        setIsLoading(false)
        return
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters')
        setIsLoading(false)
        return
      }
      
      // Phone number validation
      if (!/^[\d\s\-\+\(\)]+$/.test(formData.phoneNumber)) {
        setError('Please enter a valid phone number')
        setIsLoading(false)
        return
      }
    }

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Store token (example)
      if (formData.rememberMe) {
        localStorage.setItem('authToken', 'example-token')
      } else {
        sessionStorage.setItem('authToken', 'example-token')
      }

      // Close modal on success
      onClose()
      // Reset form
      setFormData({
        username: '',
        fullName: '',
        dateOfBirth: '',
        phoneNumber: '',
        gender: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    } catch (err) {
      setError(isLogin ? 'Login failed. Please try again.' : 'Signup failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setError('')
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setError('')
    setFormData({
      username: '',
      fullName: '',
      dateOfBirth: '',
      phoneNumber: '',
      gender: '',
      email: '',
      password: '',
      confirmPassword: '',
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/50 dark:bg-black/70 backdrop-blur-md"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ overflow: 'auto' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-md bg-white dark:bg-secondary-dark rounded-2xl shadow-2xl p-6 sm:p-8 my-auto"
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: 'calc(100vh - 2rem)', overflow: 'visible', position: 'relative', padding: '2rem' }}
            >
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onClose()
                }}
                className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-muted-light dark:hover:bg-muted-dark transition-colors focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark"
                aria-label="Close modal"
                type="button"
              >
                <X size={20} className="text-gray-600 dark:text-gray-300" />
              </button>

              {/* Modal Content */}
              <div 
                className="mt-2 overflow-y-auto modal-content" 
                style={{ 
                  maxHeight: 'calc(100vh - 8rem)', 
                  overflowX: 'visible', 
                  position: 'relative',
                  padding: '0 4px',
                  margin: '0 -4px',
                }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5" style={{ padding: '0 4px' }}>
                  {/* Username Field */}
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Username <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <UserCircle
                        size={20}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-muted-dark rounded-lg bg-white dark:bg-secondary-dark text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Signup Only Fields */}
                  {!isLogin && (
                    <>
                      {/* Full Name Field */}
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User
                            size={20}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          />
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-muted-dark rounded-lg bg-white dark:bg-secondary-dark text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all"
                            required
                          />
                        </div>
                      </div>

                      {/* Date of Birth Field */}
                      <div>
                        <label
                          htmlFor="dateOfBirth"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Calendar
                            size={20}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                          />
                          <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-muted-dark rounded-lg bg-white dark:bg-secondary-dark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all"
                            required
                          />
                        </div>
                      </div>

                      {/* Phone Number Field */}
                      <div>
                        <label
                          htmlFor="phoneNumber"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone
                            size={20}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          />
                          <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="+1 (555) 123-4567"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-muted-dark rounded-lg bg-white dark:bg-secondary-dark text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all"
                            required
                          />
                        </div>
                      </div>

                      {/* Gender Field - Custom Dropdown */}
                      <div className="relative" ref={genderDropdownRef}>
                        <label
                          htmlFor="gender"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Gender <span className="text-red-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsGenderOpen(!isGenderOpen)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-muted-dark rounded-lg bg-white dark:bg-secondary-dark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all flex items-center justify-between"
                        >
                          <span className={formData.gender ? '' : 'text-gray-400'}>
                            {formData.gender
                              ? genderOptions.find((opt) => opt.value === formData.gender)?.label
                              : 'Select Gender'}
                          </span>
                          <ChevronDown
                            size={20}
                            className={`text-gray-400 transition-transform ${isGenderOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                        <AnimatePresence>
                          {isGenderOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -5, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -5, scale: 0.98 }}
                              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                              className="absolute z-[70] w-full mt-1 bg-white dark:bg-secondary-dark border border-gray-300 dark:border-muted-dark rounded-lg shadow-lg max-h-48 overflow-y-auto"
                            >
                              {genderOptions.map((option) => (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => ({ ...prev, gender: option.value }))
                                    setIsGenderOpen(false)
                                    setError('')
                                  }}
                                  className={`w-full text-left px-4 py-3 hover:bg-muted-light dark:hover:bg-muted-dark transition-colors first:rounded-t-lg last:rounded-b-lg ${
                                    formData.gender === option.value
                                      ? 'bg-accent-light/10 dark:bg-accent-dark/20 text-accent-light dark:text-accent-dark'
                                      : 'text-gray-900 dark:text-white'
                                  }`}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                        {/* Hidden input for form validation */}
                        <input
                          type="hidden"
                          name="gender"
                          value={formData.gender}
                          required
                        />
                      </div>

                      {/* Email Field (Optional) */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Email Address <span className="text-gray-400 text-xs">(Optional)</span>
                        </label>
                        <div className="relative">
                          <Mail
                            size={20}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-muted-dark rounded-lg bg-white dark:bg-secondary-dark text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Password Field */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock
                        size={20}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-muted-dark rounded-lg bg-white dark:bg-secondary-dark text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {/* Forgot Password Link (Login only) */}
                    {isLogin && (
                      <div className="mt-2">
                        <a
                          href="#forgot"
                          className="text-sm text-accent-light dark:text-accent-dark hover:underline"
                        >
                          Forgot Password?
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Field (Signup only) */}
                  {!isLogin && (
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Lock
                          size={20}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-muted-dark rounded-lg bg-white dark:bg-secondary-dark text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-primary-light dark:bg-primary-dark text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>{isLogin ? 'Logging in...' : 'Creating account...'}</span>
                      </>
                    ) : (
                      <span>{isLogin ? 'Login' : 'Sign Up'}</span>
                    )}
                  </button>

                  {/* Toggle between Login and Signup */}
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                    <button
                      type="button"
                      onClick={toggleMode}
                      className="text-accent-light dark:text-accent-dark font-medium hover:underline"
                    >
                      {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default LoginModal

