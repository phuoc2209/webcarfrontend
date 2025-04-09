import { useState, useEffect, useContext } from 'react'
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'
import { FaCar, FaCalendarAlt, FaMoneyBillWave, FaPaintBrush, FaIdCard, FaCheckCircle } from 'react-icons/fa'
import { getCarById } from '../services/carService'
import { getBookingById } from '../services/bookingService'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'

export default function CarDetailsPage({ bookingMode = false }) {
  const { id } = useParams()
  const location = useLocation()
  const { user } = useContext(AuthContext)
  const [car, setCar] = useState(null)
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load car details
        const carData = await getCarById(bookingMode ? booking.carId : id)
        setCar(carData)

        // Load booking details if in booking mode
        if (bookingMode) {
          const bookingData = await getBookingById(id)
          setBooking(bookingData)
        }
      } catch (err) {
        toast.error('Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [id, bookingMode])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-red-500">Failed to load car data</div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Car Image */}
        {car && (
          <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center">
            {car.imageUrl ? (
              <img 
                src={car.imageUrl} 
                alt={car.name}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <FaCar className="text-6xl text-gray-400" />
            )}
          </div>
        )}

        {/* Details Section */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{car.name}</h1>
          
          {!bookingMode && (
            <div className="mb-6 flex justify-center">
              <Link
                to="/booking-form"
                state={{ car }}
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Đặt xe ngay
              </Link>
            </div>
          )}
          
          {bookingMode && booking && (
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Booking Details</h2>
              <p>Status: {booking.status}</p>
              <p>Pickup: {new Date(booking.pickupDate).toLocaleDateString()}</p>
              <p>Return: {new Date(booking.returnDate).toLocaleDateString()}</p>
              <p className="font-bold">Total: ${booking.totalPrice}</p>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Thông số kỹ thuật</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <FaMoneyBillWave className="text-gray-500 mr-2" />
                <span>Giá: ${car.pricePerDay}/ngày</span>
              </div>
              <div className="flex items-center">
                <FaCar className="text-gray-500 mr-2" />
                <span>Hãng: {car.brand}</span>
              </div>
              <div className="flex items-center">
                <FaCar className="text-gray-500 mr-2" />
                <span>Model: {car.model}</span>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="text-gray-500 mr-2" />
                <span>Năm: {car.year}</span>
              </div>
              <div className="flex items-center">
                <FaPaintBrush className="text-gray-500 mr-2" />
                <span>Màu: {car.color}</span>
              </div>
              <div className="flex items-center">
                <FaIdCard className="text-gray-500 mr-2" />
                <span>Biển số: {car.licensePlate}</span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-gray-500 mr-2" />
                <span>Tình trạng: {car.available ? 'Có sẵn' : 'Đã thuê'}</span>
              </div>
            </div>
          </div>

          {car.description && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Mô tả</h2>
              <p className="text-gray-700">{car.description}</p>
            </div>
          )}

          {!bookingMode && (
            <BookingForm carId={car.id} />
          )}
        </div>
      </div>
    </div>
  )
}

function BookingForm({ carId }) {
  // ... giữ nguyên form booking như cũ
}
