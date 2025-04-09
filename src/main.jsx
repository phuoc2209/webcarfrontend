import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './context/AuthContext'
import AdminPage from './pages/AdminPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
    <ToastContainer position="bottom-right" autoClose={5000} />
  </AuthProvider>
)
