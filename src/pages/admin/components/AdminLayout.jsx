import { useState } from 'react'
import { FaChartLine, FaCar, FaCalendarAlt, FaSearch } from 'react-icons/fa'

export default function AdminLayout({ children, activeTab, setActiveTab }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold">Application Name</h1>
        </div>
        <div className="p-4 text-sm text-gray-500">Main Menu</div>
        <nav className="space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`w-full flex items-center px-4 py-3 ${activeTab === 'dashboard' ? 'bg-blue-100 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <FaChartLine className="mr-3" /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('cars')} 
            className={`w-full flex items-center px-4 py-3 ${activeTab === 'cars' ? 'bg-blue-100 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <FaCar className="mr-3" /> Cars
          </button>
          <button 
            onClick={() => setActiveTab('bookings')} 
            className={`w-full flex items-center px-4 py-3 ${activeTab === 'bookings' ? 'bg-blue-100 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <FaCalendarAlt className="mr-3" /> Bookings
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold capitalize">{activeTab}</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search here..."
                className="pl-3 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-2 text-gray-400">
                <FaSearch className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center">
              <div className="mr-2">
                <div className="font-semibold">Admin</div>
                <div className="text-xs text-gray-500">Super Admin</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        {children}
      </div>
    </div>
  )
}
