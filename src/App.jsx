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
import WebsiteSettings from './components/doctor/pages/WebsiteSettings'
import ProfilePage from './components/doctor/pages/ProfilePage'
import MessagingPage from './components/doctor/pages/MessagingPage'

import PatientRecordsPage from './components/doctor/pages/PatientRecordsPage'
import PrescriptionsPage from './components/doctor/pages/PrescriptionsPage'
import SecretaryLayout from './components/secretary/layout/SecretaryLayout'
import SecretaryDashboardPage from './components/secretary/pages/DashboardPage'
import SecretaryPatientsPage from './components/secretary/pages/PatientsPage'
import SecretaryFinancePage from './components/secretary/pages/FinancePage'
import SecretaryMessagingPage from './components/secretary/pages/MessagingPage'
import SecretarySchedulePage from './components/secretary/pages/SchedulePage'
import SecretaryProfilePage from './components/secretary/pages/ProfilePage'

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
          <Route path="prescription" element={<PrescriptionsPage />} />
          <Route path="invoices" element={<FinancePage />} />
          <Route path="messaging" element={<MessagingPage />} />
          <Route path="website-settings" element={<WebsiteSettings />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<PlaceholderPage title="Coming Soon" />} />
        </Route>
        <Route path="/secretary/*" element={<SecretaryLayout />}>
          <Route index element={<SecretaryDashboardPage />} />
          <Route path="schedule" element={<SecretarySchedulePage />} />
          <Route path="patients" element={<SecretaryPatientsPage />} />
          <Route path="invoices" element={<SecretaryFinancePage />} />
          <Route path="messaging" element={<SecretaryMessagingPage />} />
          <Route path="profile" element={<SecretaryProfilePage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App

