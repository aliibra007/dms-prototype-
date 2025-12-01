import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, Eye, EyeOff, User, Loader2, Phone, Calendar, UserCircle, ChevronDown, Check, X as XIcon, MessageSquare, ArrowLeft, CheckCircle } from 'lucide-react'
import { useTheme } from '../../../contexts/ThemeContext'

const LoginModal = ({ isOpen, onClose }) => {
  const { theme } = useTheme()
  const [currentView, setCurrentView] = useState('login') // 'login', 'signup', 'forgot-phone', 'forgot-code', 'forgot-reset', 'forgot-success'
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
    resetPassword: '',
    resetConfirmPassword: '',
    smsCode: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [showResetConfirmPassword, setShowResetConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isGenderOpen, setIsGenderOpen] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  
  // Forgot password states
  const [smsCodeSent, setSmsCodeSent] = useState(false)
  const [smsCodeExpiry, setSmsCodeExpiry] = useState(null)
  const [smsCodeAttempts, setSmsCodeAttempts] = useState(0)
  const [resendCount, setResendCount] = useState(0)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [generatedCode, setGeneratedCode] = useState(null)
  const [forgotPhoneNumber, setForgotPhoneNumber] = useState('')
  
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
    // Lebanese phone: +961 followed by exactly 8 digits (supports all prefixes: 70, 81, 03, 01, 05, etc.)
    phoneNumber: /^\+961\s?\d{8}$|^\+961\s?\d{2}\s?\d{3}\s?\d{3}$/,
    username: /^[a-zA-Z0-9._-]{3,30}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    fullName: /^[a-zA-Z\s]{2,50}$/,
  }

  const validationMessages = {
    phoneNumber: 'Please enter a valid Lebanese phone number (+961 70 123 456)',
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

  // Reset forgot password state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentView('login')
      setIsLogin(true)
      setSmsCodeSent(false)
      setSmsCodeExpiry(null)
      setSmsCodeAttempts(0)
      setResendCount(0)
      setResendCooldown(0)
      setGeneratedCode(null)
      setForgotPhoneNumber('')
      setFormData(prev => ({
        ...prev,
        smsCode: '',
        resetPassword: '',
        resetConfirmPassword: '',
      }))
    }
  }, [isOpen])

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  // Code expiry timer
  useEffect(() => {
    if (smsCodeExpiry) {
      const timer = setInterval(() => {
        if (new Date() > smsCodeExpiry) {
          setSmsCodeExpiry(null)
        }
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [smsCodeExpiry])

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
        // Remove +961 prefix and spaces to check if there are actual digits
        const digitsOnly = value.replace(/\+961\s?/gi, '').replace(/\s/g, '')
        if (!digitsOnly || digitsOnly.trim().length === 0) {
          errors.phoneNumber = 'Phone number is required'
        } else if (digitsOnly.length !== 8) {
          errors.phoneNumber = 'Phone number must be 8 digits'
        } else {
          // Validate the full number format
          const normalized = value.replace(/\s/g, '')
          if (!normalized.startsWith('+961')) {
            errors.phoneNumber = 'Phone number must start with +961'
          } else if (!validationPatterns.phoneNumber.test(normalized)) {
            errors.phoneNumber = validationMessages.phoneNumber
          } else {
            delete errors.phoneNumber
          }
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
      const phoneDigitsOnly = formData.phoneNumber.replace(/\+961\s?/gi, '').replace(/\s/g, '')
      if (!phoneDigitsOnly || phoneDigitsOnly.trim().length === 0) {
        errors.phoneNumber = 'Phone number is required'
        isValid = false
      } else if (phoneDigitsOnly.length !== 8) {
        errors.phoneNumber = 'Phone number must be 8 digits'
        isValid = false
      } else {
        const normalized = formData.phoneNumber.replace(/\s/g, '')
        if (!normalized.startsWith('+961')) {
          errors.phoneNumber = 'Phone number must start with +961'
          isValid = false
        } else if (!validationPatterns.phoneNumber.test(normalized)) {
          errors.phoneNumber = validationMessages.phoneNumber
          isValid = false
        }
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
    // For phone number, use the stored value (with +961) instead of input display value
    if (name === 'phoneNumber') {
      validateField(name, formData.phoneNumber)
    } else {
      validateField(name, value)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setCurrentView(isLogin ? 'signup' : 'login')
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
      resetPassword: '',
      resetConfirmPassword: '',
      smsCode: '',
    })
  }

  // Generate 6-digit SMS code
  const generateSMSCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  // Handle forgot password - send SMS code
  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!forgotPhoneNumber.trim()) {
      setError('Please enter your phone number')
      return
    }
    
    const phoneDigitsOnly = forgotPhoneNumber.replace(/\+961\s?/gi, '').replace(/\s/g, '')
    if (!phoneDigitsOnly || phoneDigitsOnly.trim().length === 0) {
      setError('Phone number is required')
      return
    } else if (phoneDigitsOnly.length !== 8) {
      setError('Phone number must be 8 digits')
      return
    }
    
    const normalized = forgotPhoneNumber.replace(/\s/g, '')
    if (!normalized.startsWith('+961')) {
      setError('Phone number must start with +961')
      return
    } else if (!validationPatterns.phoneNumber.test(normalized)) {
      setError(validationMessages.phoneNumber)
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call to check if phone exists and send SMS
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Mock: Check if phone number exists (in real app, this would be an API call)
      // For demo purposes, we'll assume it exists
      
      // Generate and store code
      const code = generateSMSCode()
      setGeneratedCode(code)
      console.log('SMS Code (for demo):', code) // For testing
      
      // Set expiry (5 minutes)
      const expiry = new Date(Date.now() + 5 * 60 * 1000)
      setSmsCodeExpiry(expiry)
      setSmsCodeSent(true)
      setSmsCodeAttempts(0)
      setCurrentView('forgot-code')
      setError('')
    } catch (err) {
      setError('No account found with this phone number')
    } finally {
      setIsLoading(false)
    }
  }

  // Verify SMS code
  const handleVerifyCode = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!formData.smsCode.trim()) {
      setError('Please enter the verification code')
      return
    }
    
    if (formData.smsCode.length !== 6) {
      setError('Code must be 6 digits')
      return
    }

    // Check if code expired
    if (smsCodeExpiry && new Date() > smsCodeExpiry) {
      setError('Code has expired. Please request a new one.')
      return
    }

    // Check attempts limit (5 attempts)
    if (smsCodeAttempts >= 5) {
      setError('Too many incorrect attempts. Please wait 10 minutes and try again.')
      return
    }

    setIsLoading(true)
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Verify code
      if (formData.smsCode === generatedCode) {
        setSmsCodeAttempts(0)
        setCurrentView('forgot-reset')
        setError('')
      } else {
        setSmsCodeAttempts(prev => prev + 1)
        setError(`Incorrect code. ${5 - (smsCodeAttempts + 1)} attempts remaining.`)
        setFormData(prev => ({ ...prev, smsCode: '' }))
      }
    } catch (err) {
      setError('Verification failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Resend SMS code
  const handleResendCode = async () => {
    if (resendCount >= 3) {
      setError('Maximum resend limit reached. Please contact support.')
      return
    }

    if (resendCooldown > 0) {
      return
    }

    setIsLoading(true)
    setError('')
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      const code = generateSMSCode()
      setGeneratedCode(code)
      console.log('New SMS Code (for demo):', code) // For testing
      
      const expiry = new Date(Date.now() + 5 * 60 * 1000)
      setSmsCodeExpiry(expiry)
      setResendCount(prev => prev + 1)
      setResendCooldown(60) // 60 second cooldown
      setSmsCodeAttempts(0)
      setFormData(prev => ({ ...prev, smsCode: '' }))
    } catch (err) {
      setError('Failed to resend code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')
    
    // Validate new password
    if (!formData.resetPassword) {
      setError('Please enter a new password')
      return
    }

    const passwordValidation = getPasswordValidation(formData.resetPassword)
    const allValid = passwordValidation.every(rule => rule.isValid)
    
    if (!allValid) {
      setError('Password does not meet requirements')
      return
    }

    if (formData.resetPassword !== formData.resetConfirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // In real app, this would update the password via API
      setCurrentView('forgot-success')
      setError('')
    } catch (err) {
      setError('Failed to reset password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Start forgot password flow
  const startForgotPassword = () => {
    setCurrentView('forgot-phone')
    setError('')
    setFieldErrors({})
    setForgotPhoneNumber('')
    setSmsCodeSent(false)
    setSmsCodeExpiry(null)
    setSmsCodeAttempts(0)
    setResendCount(0)
    setResendCooldown(0)
    setGeneratedCode(null)
    setFormData(prev => ({
      ...prev,
      smsCode: '',
      resetPassword: '',
      resetConfirmPassword: '',
    }))
  }

  // Back to login
  const backToLogin = () => {
    setCurrentView('login')
    setIsLogin(true)
    setError('')
    setFieldErrors({})
    setForgotPhoneNumber('')
    setFormData(prev => ({
      ...prev,
      smsCode: '',
      resetPassword: '',
      resetConfirmPassword: '',
    }))
  }

  // Format phone number as user types (Lebanese format: +961 70 123 456)
  // +961 is always fixed and shown in the UI, user only enters the 8 digits
  // This function handles the 8-digit part only (not +961)
  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters (including + if user tries to type it)
    let cleaned = value.replace(/\D/g, '')
    
    // If user tries to type country code, remove it
    if (cleaned.startsWith('961')) {
      cleaned = cleaned.replace('961', '')
    }
    if (cleaned.startsWith('00961')) {
      cleaned = cleaned.replace('00961', '')
    }
    
    // Handle local formats with leading 0 (03, 01, 05, 070, etc.)
    if (cleaned.startsWith('0')) {
      cleaned = cleaned.replace(/^0+/, '')
    }
    
    // Limit to 8 digits total
    if (cleaned.length > 8) {
      cleaned = cleaned.slice(0, 8)
    }
    
    // Format only the 8 digits part: XX XXX XXX
    // The +961 prefix is added separately in the stored value
    if (cleaned.length === 0) {
      return ''
    } else if (cleaned.length <= 2) {
      // First 1-2 digits (prefix)
      return cleaned
    } else if (cleaned.length <= 5) {
      // First 2 digits + next 3 digits
      return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`
    } else if (cleaned.length <= 8) {
      // First 2 digits + next 3 digits + last 3 digits
      return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`
    } else {
      return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)}`
    }
  }

  const handlePhoneChange = (e) => {
    const { value } = e.target
    // Format only the 8 digits (user can't type +961 as it's fixed)
    // Remove +961 if user somehow types it
    const cleanValue = value.replace(/\+961\s?/gi, '').replace(/961\s?/g, '')
    const formattedDigits = formatPhoneNumber(cleanValue)
    
    // Store with +961 prefix for validation
    const fullNumber = formattedDigits ? `+961 ${formattedDigits}` : '+961 '
    
    setFormData((prev) => ({
      ...prev,
      phoneNumber: fullNumber,
    }))
    
    if (fieldErrors.phoneNumber) {
      validateField('phoneNumber', fullNumber)
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
                {/* Forgot Password Success Screen */}
                {currentView === 'forgot-success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="mb-6 flex justify-center">
                      <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-4">
                        <CheckCircle size={48} className="text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      Password Reset Successful
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Your password has been reset successfully. You can now log in with your new password.
                    </p>
                    <button
                      onClick={backToLogin}
                      className="w-full py-3 px-4 bg-primary-light dark:bg-primary-dark text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                      Back to Log In
                    </button>
                  </motion.div>
                )}

                {/* Forgot Password Reset Screen */}
                {currentView === 'forgot-reset' && (
                  <motion.form
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onSubmit={handleResetPassword}
                    className="space-y-5"
                    style={{ padding: '0 4px' }}
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <button
                        type="button"
                        onClick={() => setCurrentView('forgot-code')}
                        className="p-1 rounded-full hover:bg-muted-light dark:hover:bg-muted-dark transition-colors"
                      >
                        <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
                      </button>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Set New Password</h2>
                    </div>

                    {/* New Password Field */}
                    <div>
                      <label
                        htmlFor="resetPassword"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        New Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Lock
                          size={20}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type={showResetPassword ? 'text' : 'password'}
                          id="resetPassword"
                          name="resetPassword"
                          value={formData.resetPassword}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, resetPassword: e.target.value }))
                            setError('')
                          }}
                          placeholder="Enter new password"
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-muted-dark rounded-lg bg-white dark:bg-secondary-dark text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowResetPassword(!showResetPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showResetPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {formData.resetPassword && (
                        <div className="mt-3 space-y-2">
                          {getPasswordValidation(formData.resetPassword).map((rule) => (
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
                    </div>

                    {/* Confirm New Password Field */}
                    <div>
                      <label
                        htmlFor="resetConfirmPassword"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Confirm New Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Lock
                          size={20}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type={showResetConfirmPassword ? 'text' : 'password'}
                          id="resetConfirmPassword"
                          name="resetConfirmPassword"
                          value={formData.resetConfirmPassword}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, resetConfirmPassword: e.target.value }))
                            setError('')
                          }}
                          placeholder="Confirm new password"
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-muted-dark rounded-lg bg-white dark:bg-secondary-dark text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowResetConfirmPassword(!showResetConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showResetConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    {error && (
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading || !formData.resetPassword || !formData.resetConfirmPassword}
                      className="w-full py-3 px-4 bg-primary-light dark:bg-primary-dark text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          <span>Resetting password...</span>
                        </>
                      ) : (
                        <span>Reset Password</span>
                      )}
                    </button>
                  </motion.form>
                )}

                {/* SMS Code Verification Screen */}
                {currentView === 'forgot-code' && (
                  <motion.form
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onSubmit={handleVerifyCode}
                    className="space-y-5"
                    style={{ padding: '0 4px' }}
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <button
                        type="button"
                        onClick={() => setCurrentView('forgot-phone')}
                        className="p-1 rounded-full hover:bg-muted-light dark:hover:bg-muted-dark transition-colors"
                      >
                        <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
                      </button>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Enter Verification Code</h2>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      We've sent a 6-digit verification code to <strong>{forgotPhoneNumber}</strong>. Please enter it below.
                    </p>

                    {smsCodeExpiry && new Date() <= smsCodeExpiry && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                        Code expires in {Math.ceil((smsCodeExpiry - new Date()) / 1000 / 60)} minutes
                      </p>
                    )}

                    {smsCodeExpiry && new Date() > smsCodeExpiry && (
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-sm text-yellow-600 dark:text-yellow-400 mb-4">
                        Code has expired. Please request a new one.
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="smsCode"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Verification Code <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MessageSquare
                          size={20}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="text"
                          id="smsCode"
                          name="smsCode"
                          value={formData.smsCode}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                            setFormData(prev => ({ ...prev, smsCode: value }))
                            setError('')
                          }}
                          placeholder="000000"
                          maxLength={6}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-muted-dark rounded-lg bg-white dark:bg-secondary-dark text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all text-center text-2xl tracking-widest font-mono"
                          required
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading || formData.smsCode.length !== 6 || (smsCodeExpiry && new Date() > smsCodeExpiry)}
                      className="w-full py-3 px-4 bg-primary-light dark:bg-primary-dark text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <span>Verify Code</span>
                      )}
                    </button>

                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Didn't receive the code?
                      </p>
                      <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={resendCount >= 3 || resendCooldown > 0 || isLoading}
                        className="text-sm text-accent-light dark:text-accent-dark hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {resendCooldown > 0
                          ? `Resend code in ${resendCooldown}s`
                          : `Resend code${resendCount >= 3 ? ' (Max attempts reached)' : ''}`
                        }
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* Phone Number Input Screen (Forgot Password) */}
                {currentView === 'forgot-phone' && (
                  <motion.form
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onSubmit={handleForgotPassword}
                    className="space-y-5"
                    style={{ padding: '0 4px' }}
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <button
                        type="button"
                        onClick={backToLogin}
                        className="p-1 rounded-full hover:bg-muted-light dark:hover:bg-muted-dark transition-colors"
                      >
                        <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
                      </button>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reset Password</h2>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Enter your phone number and we'll send you a verification code to reset your password.
                    </p>

                    <div>
                      <label
                        htmlFor="forgotPhoneNumber"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone
                          size={20}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <div className="relative">
                          <span className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 font-medium pointer-events-none">
                            +961
                          </span>
                          <input
                            type="tel"
                            id="forgotPhoneNumber"
                            name="forgotPhoneNumber"
                            value={forgotPhoneNumber.replace(/^\+961\s?/i, '')}
                            onChange={(e) => {
                              // Remove +961 if user tries to type it (it's fixed)
                              const cleanValue = e.target.value.replace(/\+961\s?/gi, '').replace(/961\s?/g, '')
                              const formattedDigits = formatPhoneNumber(cleanValue)
                              // Store with +961 prefix for validation
                              const fullNumber = formattedDigits ? `+961 ${formattedDigits}` : '+961 '
                              setForgotPhoneNumber(fullNumber)
                              setError('')
                            }}
                            placeholder="70 123 456"
                            className={`w-full pl-20 pr-4 py-3 border rounded-lg bg-white dark:bg-secondary-dark text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all ${
                              error && error.includes('phone')
                                ? 'border-red-500 dark:border-red-500'
                                : 'border-gray-300 dark:border-muted-dark'
                            }`}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {error && (
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading || !forgotPhoneNumber.trim()}
                      className="w-full py-3 px-4 bg-primary-light dark:bg-primary-dark text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          <span>Sending code...</span>
                        </>
                      ) : (
                        <span>Send Code</span>
                      )}
                    </button>
                  </motion.form>
                )}

                {/* Login/Signup Form */}
                {(currentView === 'login' || currentView === 'signup') && (
                  <>
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
                          <div className="relative">
                            <span className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 font-medium pointer-events-none z-10">
                              +961
                            </span>
                            <input
                              type="tel"
                              id="phoneNumber"
                              name="phoneNumber"
                              value={formData.phoneNumber.replace(/^\+961\s?/i, '')}
                              onChange={handlePhoneChange}
                              onBlur={handleBlur}
                              placeholder="70 123 456"
                              className={`w-full pl-20 pr-4 py-3 border rounded-lg bg-white dark:bg-secondary-dark text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent transition-all ${
                                fieldErrors.phoneNumber 
                                  ? 'border-red-500 dark:border-red-500' 
                                  : 'border-gray-300 dark:border-muted-dark'
                              }`}
                              required
                            />
                          </div>
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
                    {isLogin && currentView === 'login' && (
                      <div className="mt-2">
                        <button
                          type="button"
                          onClick={startForgotPassword}
                          className="text-sm text-accent-light dark:text-accent-dark hover:underline"
                        >
                          Forgot Password?
                        </button>
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
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default LoginModal
