import { useState } from 'react'
import { toast } from 'react-toastify'
import AdminLayout from './admin/components/AdminLayout'
import AdminDashboard from './admin/components/AdminDashboard'
import AdminCars from './admin/components/AdminCars'
import AdminBookings from './admin/components/AdminBookings'

// Mock data
const adminCars = [
  {
    id: 1,
    name: 'Toyota Camry',
    type: 'Sedan',
    seats: 5,
    transmission: 'Automatic',
    price: 50,
    image: '/car1.jpg'
  },
  {
    id: 2,
    name: 'Honda CR-V',
    type: 'SUV',
    seats: 5,
    transmission: 'Automatic',
    price: 60,
    image: '/car2.jpg'
  }
]

const adminBookings = [
  {
    id: 1,
    user: 'john@example.com',
    car: 'Toyota Camry',
    pickupDate: '2025-04-01',
    returnDate: '2025-04-05',
    totalPrice: 200,
    status: 'PENDING'
  },
  {
    id: 2,
    user: 'jane@example.com',
    car: 'Honda CR-V',
    pickupDate: '2025-04-10',
    returnDate: '2025-04-15',
    totalPrice: 300,
    status: 'CONFIRMED'
  }
]

const dailyStats = {
  totalCars: 562,
  totalUsers: 14565,
  earningsToday: 5245,
  earningsYesterday: 953.55,
  recentBookings: 867123,
  percentChange: "+5% from last month"
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <AdminDashboard dailyStats={dailyStats} />
      case 'cars':
        return <AdminCars cars={adminCars} />
      case 'bookings':
        return <AdminBookings bookings={adminBookings} />
      default:
        return <AdminDashboard dailyStats={dailyStats} />
    }
  }

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  )
}
