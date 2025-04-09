import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaCar, FaCalendarAlt, FaTimes, FaCheck, FaClock } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { getUserBookings, cancelBooking } from '../services/bookingService'
import { AuthContext } from '../context/AuthContext'

export default function BookingsPage() {
  const { user } = useContext(AuthContext)
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [cancellingId, setCancellingId] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookings = await getUserBookings()
        setBookings(bookings)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchBookings()
  }, [])

  const filteredBookings = bookings.filter(booking => {
    if (statusFilter === 'ALL') return true
    return booking.status === statusFilter
  })

  const handleCancel = async (bookingId) => {
    setCancellingId(bookingId)
    try {
      await cancelBooking(bookingId)
      setBookings(bookings.map(b => 
        b.id === bookingId ? {...b, status: 'CANCELLED'} : b
      ))
      toast.success('Booking cancelled successfully')
    } catch (error) {
      toast.error(error.message || 'Failed to cancel booking')
    } finally {
      setCancellingId(null)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'APPROVED':
        return <FaCheck className="text-green-500" />
      case 'PENDING':
        return <FaClock className="text-yellow-500" />
      case 'REJECTED':
        return <FaTimes className="text-red-500" />
      case 'COMPLETED':
        return <FaCheck className="text-blue-500" />
      default:
        return null
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'Approved'
      case 'PENDING':
        return 'Pending'
      case 'REJECTED':
        return 'Rejected'
      case 'COMPLETED':
        return 'Completed'
      case 'CANCELLED':
        return 'Cancelled'
      default:
        return status
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading bookings...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  // Demo mode - skip login check

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      
      {/* Filter */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Filter by Status</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-4 py-2 rounded-lg ${statusFilter === 'ALL' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('PENDING')}
            className={`px-4 py-2 rounded-lg ${statusFilter === 'PENDING' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter('APPROVED')}
            className={`px-4 py-2 rounded-lg ${statusFilter === 'APPROVED' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            Approved
          </button>
          <button
            onClick={() => setStatusFilter('REJECTED')}
            className={`px-4 py-2 rounded-lg ${statusFilter === 'REJECTED' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          >
            Rejected
          </button>
          <button
            onClick={() => setStatusFilter('COMPLETED')}
            className={`px-4 py-2 rounded-lg ${statusFilter === 'COMPLETED' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map(booking => (
            <div key={booking.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <FaCar className="text-2xl text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{booking.car.name}</h3>
                      <p className="text-gray-600">Booking #{booking.id}</p>
                      <Link 
                        to={`/bookings/${booking.id}`}
                        className="text-primary-600 hover:underline mt-1 inline-block"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(booking.status)}
                    <span className="font-medium">{getStatusText(booking.status)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-gray-500">Pickup Date</p>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" />
                      <span>{new Date(booking.pickupDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500">Return Date</p>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" />
                      <span>{new Date(booking.returnDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500">Total Price</p>
                    <p className="text-xl font-bold text-primary-600">${booking.totalPrice}</p>
                  </div>
                </div>

                {booking.status === 'PENDING' && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleCancel(booking.id)}
                      disabled={cancellingId === booking.id}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {cancellingId === booking.id ? 'Cancelling...' : 'Cancel Booking'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FaCar className="mx-auto text-5xl text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900">No bookings found</h3>
          <p className="mt-1 text-gray-500">
            {statusFilter === 'ALL' 
              ? "You haven't made any bookings yet."
              : `You don't have any ${getStatusText(statusFilter).toLowerCase()} bookings.`}
          </p>
        </div>
      )}
    </div>
  )
}
