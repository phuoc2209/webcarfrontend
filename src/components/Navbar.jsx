import { Link } from 'react-router-dom'
import { FaCar, FaBars, FaTimes, FaSignOutAlt, FaCrown } from 'react-icons/fa'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useContext(AuthContext)

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center text-2xl font-bold text-primary-600">
            <FaCar className="mr-2" />
            CarRental
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <Link to="/cars" className="hover:text-primary-600 transition-colors">Cars</Link>
            <Link to="/bookings" className="hover:text-primary-600 transition-colors">My Bookings</Link>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  {(user.roles.includes('ADMIN') || user.roles.includes('ROLE_ADMIN')) && (
                    <Link
                      to="/admin"
                      className="px-4 py-2 rounded-lg bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-colors font-medium flex items-center"
                    >
                      <FaCrown className="mr-2" />
                      Admin Panel
                    </Link>
                  )}
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-700">{user.email}</span>
                    <button
                      onClick={logout}
                      className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <Link to="/" className="block hover:text-primary-600 transition-colors" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/cars" className="block hover:text-primary-600 transition-colors" onClick={() => setIsOpen(false)}>
              Cars
            </Link>
            <Link to="/bookings" className="block hover:text-primary-600 transition-colors" onClick={() => setIsOpen(false)}>
              My Bookings
            </Link>
            
            {(user?.roles.includes('ADMIN') || user?.roles.includes('ROLE_ADMIN')) && (
              <Link
                to="/admin"
                className="block px-4 py-2 rounded-lg bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-colors font-medium flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <FaCrown className="mr-2" />
                Admin Panel
              </Link>
            )}

            <div className="pt-4 border-t border-gray-200 space-y-3">
              {user ? (
                <button
                  onClick={() => {
                    logout()
                    setIsOpen(false)
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
