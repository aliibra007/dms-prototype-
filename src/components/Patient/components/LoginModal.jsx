import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, Eye, EyeOff, User, Loader2, Phone, Calendar, UserCircle, ChevronDown, Check, X as XIcon } from 'lucide-react'
import { useTheme } from '../../../contexts/ThemeContext'

const LoginModal = ({ isOpen, onClose }) => {
  const { theme } = useTheme()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    phoneNumber: '',
    username: '',
    fullName: '',
    dateOfBirth: '',
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
  const [fieldErrors, setFieldErrors] = useState({})
  const genderDropdownRef = useRef(null)
  
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' },
  ]

  // Password validation rules
  const passwordRules = [
    {
      id: 'length',
      label: 'At least 8 characters',
      validator: (password) => password.length >= 8
    },
    {
      id: 'uppercase',
      label: 'One uppercase letter',
      validator: (password) => /[A-Z]/.test(password)
    },
    {
      id: 'lowercase',
      label: 'One lowercase letter',
      validator: (password) => /[a-z]/.test(password)
    },
    {
      id: 'number',
      label: 'One number',
      validator: (password) => /[0-9]/.test(password)
    },
    {
      id: 'special',
      label: 'One special character',
      validator: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password)
    }
  ]

  // Check password rules
  const getPasswordValidation = (password) => {
    return passwordRules.map(rule => ({
      ...rule,
      isValid: rule.validator(password)
    }))
  }

  const validationPatterns = {
    phoneNumber: /^[\d\s\-\+\(\)]{10,}$/,
    username: /^[a-zA-Z0-9._-]{3,30}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    fullName: /^[a-zA-Z\s]{2,50}$/,
  }

  const validationMessages = {
    phoneNumber: 'Please enter a valid phone number (minimum 10 digits)',
    username: 'Username must be 3-30 characters (letters, numbers, dot, underscore, hyphen)',
    email: 'Please enter a valid email address',
    password: 'Password does not meet all requirements',
    fullName: 'Full name must be 2-50 characters (letters and spaces only)',
    dateOfBirth: 'Please select a valid date of birth',
    gender: 'Please select your gender',
    confirmPassword: 'Passwords do not match',
  }

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

  // Validate individual field
  const validateField = (name, value) => {
    const errors = { ...fieldErrors }
    
    switch (name) {
      case 'username':
        if (!value.trim()) {
          errors.username = 'Username is required'
        } else if (!validationPatterns.username.test(value)) {
          errors.username = validationMessages.username
        } else {
          delete errors.username
        }
        break
        
      case 'phoneNumber':
        if (!value.trim()) {
          errors.phoneNumber = 'Phone number is required'
        } else if (!validationPatterns.phoneNumber.test(value.replace(/\s/g, ''))) {
          errors.phoneNumber = validationMessages.phoneNumber
        } else {
          delete errors.phoneNumber
        }
        break
        
      case 'email':
        if (value && !validationPatterns.email.test(value)) {
          errors.email = validationMessages.email
        } else {
          delete errors.email
        }
        break
        
      case 'password':
        if (!value) {
          errors.password = 'Password is required'
        } else {
          const passwordValidation = getPasswordValidation(value)
          const allValid = passwordValidation.every(rule => rule.isValid)
          if (!allValid) {
            errors.password = validationMessages.password
          } else {
            delete errors.password
          }
        }
        break
        
      case 'confirmPassword':
        if (!value) {
          errors.confirmPassword = 'Please confirm your password'
        } else if (value !== formData.password) {
          errors.confirmPassword = validationMessages.confirmPassword
        } else {
          delete errors.confirmPassword
        }
        break
        
      case 'fullName':
        if (!value.trim()) {
          errors.fullName = 'Full name is required'
        } else if (!validationPatterns.fullName.test(value)) {
          errors.fullName = validationMessages.fullName
        } else {
          delete errors.fullName
        }
        break
        
      case 'dateOfBirth':
        if (!value) {
          errors.dateOfBirth = validationMessages.dateOfBirth
        } else {
          const dob = new Date(value)
          const today = new Date()
          const age = today.getFullYear() - dob.getFullYear()
          if (age < 13 || age > 120) {
            errors.dateOfBirth = 'Age must be between 13 and 120 years'
          } else {
            delete errors.dateOfBirth
          }
        }
        break
        
      case 'gender':
        if (!value) {
          errors.gender = validationMessages.gender
        } else {
          delete errors.gender
        }
        break
        
      default:
        break
    }
    
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Validate all required fields
    let isValid = true
    const errors = {}

    if (isLogin) {
      // Login validation
      if (!formData.username.trim()) {
        errors.username = 'Username is required'
        isValid = false
      } else if (!validationPatterns.username.test(formData.username)) {
        errors.username = validationMessages.username
        isValid = false
      }
      
      if (!formData.password) {
        errors.password = 'Password is required'
        isValid = false
      } else {
        const passwordValidation = getPasswordValidation(formData.password)
        const allValid = passwordValidation.every(rule => rule.isValid)
        if (!allValid) {
          errors.password = validationMessages.password
          isValid = false
        }
      }
    } else {
      // Signup validation
      if (!formData.phoneNumber.trim()) {
        errors.phoneNumber = 'Phone number is required'
        isValid = false
      } else if (!validationPatterns.phoneNumber.test(formData.phoneNumber.replace(/\s/g, ''))) {
        errors.phoneNumber = validationMessages.phoneNumber
        isValid = false
      }
      
      if (!formData.fullName.trim()) {
        errors.fullName = 'Full name is required'
        isValid = false
      } else if (!validationPatterns.fullName.test(formData.fullName)) {
        errors.fullName = validationMessages.fullName
        isValid = false
      }
      
      if (!formData.dateOfBirth) {
        errors.dateOfBirth = validationMessages.dateOfBirth
        isValid = false
      } else {
        const dob = new Date(formData.dateOfBirth)
        const today = new Date()
        const age = today.getFullYear() - dob.getFullYear()
        if (age < 13 || age > 120) {
          errors.dateOfBirth = 'Age must be between 13 and 120 years'
          isValid = false
        }
      }
      
      if (!formData.gender) {
        errors.gender = validationMessages.gender
        isValid = false
      }
      
      if (!formData.password) {
        errors.password = 'Password is required'
        isValid = false
      } else {
        const passwordValidation = getPasswordValidation(formData.password)
        const allValid = passwordValidation.every(rule => rule.isValid)
        if (!allValid) {
          errors.password = validationMessages.password
          isValid = false
        }
      }
      
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password'
        isValid = false
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = validationMessages.confirmPassword
        isValid = false
      }
      
      // Email validation (optional)
      if (formData.email && !validationPatterns.email.test(formData.email)) {
        errors.email = validationMessages.email
        isValid = false
      }
    }

    if (!isValid) {
      setFieldErrors(errors)
      setIsLoading(false)
      return
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
        phoneNumber: '',
        username: '',
        fullName: '',
        dateOfBirth: '',
        gender: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
      setFieldErrors({})
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
    
    // Clear error when user starts typing
    if (fieldErrors[name]) {
      validateField(name, type === 'checkbox' ? checked : value)
    }
    
    setError('')
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    validateField(name, value)
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setError('')
    setFieldErrors({})
    setFormData({
      phoneNumber: '',
      username: '',
      fullName: '',
      dateOfBirth: '',
      gender: '',
      email: '',
      password: '',
      confirmPassword: '',
    })
  }

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '')
    
    // Format based on length
    if (cleaned.length <= 3) {
      return cleaned
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
    } else if (cleaned.length <= 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
    }
  }

  const handlePhoneChange = (e) => {
    const { value } = e.target
    const formattedValue = formatPhoneNumber(value)
    
    setFormData((prev) => ({
      ...prev,
      phoneNumber: formattedValue,
    }))
    
    if (fieldErrors.phoneNumber) {
      validateField('phoneNumber', formattedValue)
    }
    
    setError('')
  }

  // Get password validation results
  const passwordValidation = getPasswordValidation(formData.password)

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
                  {/* Phone Number Field */}
                  <div>
                    <label
                      htmlFor={isLogin ? 'username' : 'phoneNumber'}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {isLogin ? 'Username' : 'Phone Number'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      {isLogin ? (
                        <>
                          <User
                            size={20}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          />
                          <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="your.username"
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white dark:bg-secondary-dark text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all ${
                              fieldErrors.username 
                                ? 'border-red-500 dark:border-red-500' 
                                : 'border-gray-300 dark:border-muted-dark'
                            }`}
                            required
                          />
                        </>
                      ) : (
                        <>
                          <Phone
                            size={20}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          />
                          <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handlePhoneChange}
                            onBlur={handleBlur}
                            placeholder="(555) 123-4567"
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white dark:bg-secondary-dark text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all ${
                              fieldErrors.phoneNumber 
                                ? 'border-red-500 dark:border-red-500' 
                                : 'border-gray-300 dark:border-muted-dark'
                            }`}
                            required
                          />
                        </>
                      )}
                    </div>
                    {(isLogin ? fieldErrors.username : fieldErrors.phoneNumber) && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">{isLogin ? fieldErrors.username : fieldErrors.phoneNumber}</p>
                    )}
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
                            onBlur={handleBlur}
                            placeholder="John Doe"
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white dark:bg-secondary-dark text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all ${
                              fieldErrors.fullName 
                                ? 'border-red-500 dark:border-red-500' 
                                : 'border-gray-300 dark:border-muted-dark'
                            }`}
                            required
                          />
                        </div>
                        {fieldErrors.fullName && (
                          <p className="mt-1 text-sm text-red-500 dark:text-red-400">{fieldErrors.fullName}</p>
                        )}
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
                            onBlur={handleBlur}
                            max={new Date().toISOString().split('T')[0]}
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white dark:bg-secondary-dark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all ${
                              fieldErrors.dateOfBirth 
                                ? 'border-red-500 dark:border-red-500' 
                                : 'border-gray-300 dark:border-muted-dark'
                            }`}
                            required
                          />
                        </div>
                        {fieldErrors.dateOfBirth && (
                          <p className="mt-1 text-sm text-red-500 dark:text-red-400">{fieldErrors.dateOfBirth}</p>
                        )}
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
                          className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-secondary-dark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all flex items-center justify-between ${
                            fieldErrors.gender 
                              ? 'border-red-500 dark:border-red-500' 
                              : 'border-gray-300 dark:border-muted-dark'
                          }`}
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
                        {fieldErrors.gender && (
                          <p className="mt-1 text-sm text-red-500 dark:text-red-400">{fieldErrors.gender}</p>
                        )}
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
                                    validateField('gender', option.value)
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
                            onBlur={handleBlur}
                            placeholder="you@example.com"
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white dark:bg-secondary-dark text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all ${
                              fieldErrors.email 
                                ? 'border-red-500 dark:border-red-500' 
                                : 'border-gray-300 dark:border-muted-dark'
                            }`}
                          />
                        </div>
                        {fieldErrors.email && (
                          <p className="mt-1 text-sm text-red-500 dark:text-red-400">{fieldErrors.email}</p>
                        )}
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
                        onBlur={handleBlur}
                        placeholder="Enter your password"
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg bg-white dark:bg-secondary-dark text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all ${
                          fieldErrors.password 
                            ? 'border-red-500 dark:border-red-500' 
                            : 'border-gray-300 dark:border-muted-dark'
                        }`}
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
                    
                    {/* Password Strength Rules */}
                    {!isLogin && formData.password && (
                      <div className="mt-3 space-y-2">
                        {passwordValidation.map((rule) => (
                          <div key={rule.id} className="flex items-center space-x-2">
                            {rule.isValid ? (
                              <Check size={16} className="text-green-500 flex-shrink-0" />
                            ) : (
                              <XIcon size={16} className="text-gray-400 flex-shrink-0" />
                            )}
                            <span className={`text-sm ${rule.isValid ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                              {rule.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {fieldErrors.password && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">{fieldErrors.password}</p>
                    )}
                    
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
                          onBlur={handleBlur}
                          placeholder="Confirm your password"
                          className={`w-full pl-10 pr-12 py-3 border rounded-lg bg-white dark:bg-secondary-dark text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all ${
                            fieldErrors.confirmPassword 
                              ? 'border-red-500 dark:border-red-500' 
                              : 'border-gray-300 dark:border-muted-dark'
                          }`}
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
                      {fieldErrors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{fieldErrors.confirmPassword}</p>
                      )}
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
                    disabled={isLoading || Object.keys(fieldErrors).length > 0}
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
