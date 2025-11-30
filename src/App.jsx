import React, { useState } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from './components/Patient/components/Header'
import HeroSection from './components/Patient/components/HeroSection'
import StatisticsSection from './components/Patient/components/StatisticsSection'
import RatingsSection from './components/Patient/components/RatingsSection'
import TreatmentsSection from './components/Patient/components/TreatmentsSection'
import Footer from './components/Patient/components/Footer'
import LoginModal from './components/Patient/components/LoginModal'

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300" style={{ minHeight: '100vh' }}>
        <Header onLoginClick={() => setIsLoginModalOpen(true)} />
        <main className="relative" style={{ paddingTop: '56px' }}>
          <HeroSection />
          <StatisticsSection />
          <RatingsSection />
          <TreatmentsSection />
        </main>
        <Footer />
        
        {/* Login Modal - rendered at page level */}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </div>
    </ThemeProvider>
  )
}

export default App

