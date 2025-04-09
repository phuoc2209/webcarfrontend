import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CarsPage from './pages/CarsPage'
import CarDetailsPage from './pages/CarDetailsPage'
import BookingsPage from './pages/BookingsPage'
import BookingFormPage from './pages/BookingFormPage'
import AdminPage from './pages/AdminPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cars" element={<CarsPage />} />
            <Route path="/cars/:id" element={<CarDetailsPage />} />
            <Route path="/bookings" element={
              <PrivateRoute>
                <BookingsPage />
              </PrivateRoute>
            } />
            <Route path="/booking-form" element={
              <PrivateRoute>
                <BookingFormPage />
              </PrivateRoute>
            } />
            {/* Route preview admin không yêu cầu đăng nhập */}
            <Route path="/admin-preview" element={<AdminPage />} />
            
            <Route path="/admin" element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
      <ToastContainer />
    </BrowserRouter>
    </I18nextProvider>
  )
}

export default App
