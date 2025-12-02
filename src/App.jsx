import React, { useState } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from './components/Patient/components/Header'
import HeroSection from './components/Patient/components/HeroSection'
import StatisticsSection from './components/Patient/components/StatisticsSection'
import RatingsSection from './components/Patient/components/RatingsSection'
import TreatmentsSection from './components/Patient/components/TreatmentsSection'
import Footer from './components/Patient/components/Footer'
import LoginModal from './components/Patient/components/LoginModal'
import { Routes, Route } from 'react-router-dom'
import BookVisitPage from './pages/BookVisitPage'
import DoctorLayout from './components/doctor/layout/DoctorLayout'
import DashboardPage from './components/doctor/pages/DashboardPage'
import AppointmentsPage from './components/doctor/pages/AppointmentsPage'
import FinancePage from './components/doctor/pages/FinancePage'
import PlaceholderPage from './components/doctor/pages/PlaceholderPage'

import PatientRecordsPage from './components/doctor/pages/PatientRecordsPage'

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <ThemeProvider>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300" style={{ minHeight: '100vh' }}>
              <Header onLoginClick={() => setIsLoginModalOpen(true)} />
              <main className="relative" style={{ paddingTop: '56px' }}>
                <HeroSection />
                <StatisticsSection />
                <RatingsSection />
                <TreatmentsSection />
              </main>
              <Footer />
              <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
            </div>
          }
        />
        <Route path="/book-visit" element={<BookVisitPage />} />
        <Route path="/doctor/*" element={<DoctorLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="schedule" element={<AppointmentsPage />} />
          <Route path="patients" element={<PatientRecordsPage />} />
          <Route path="prescription" element={<PlaceholderPage title="Prescription Center" />} />
          <Route path="invoices" element={<FinancePage />} />
          <Route path="messaging" element={<PlaceholderPage title="Messaging" />} />
          <Route path="profile" element={<PlaceholderPage title="Profile & Settings" />} />
          <Route path="*" element={<PlaceholderPage title="Coming Soon" />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App

