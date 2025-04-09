import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaCalendarAlt, FaUser, FaIdCard, FaCar } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { createBooking, uploadBookingDocuments } from '../api/bookingApi'
import { fetchFeaturedCars } from '../services/carService'

export default function BookingFormPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { car } = location.state || {}
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    pickupDate: '',
    returnDate: '',
    licenseNumber: '',
    address: ''
  })

  const [idCardFront, setIdCardFront] = useState(null)
  const [idCardBack, setIdCardBack] = useState(null)
  const [licenseFront, setLicenseFront] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // First create the booking
      const bookingResponse = await createBooking({
        carId: car.id,
        startDate: formData.pickupDate,
        endDate: formData.returnDate,
        notes: `Customer: ${formData.fullName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nLicense: ${formData.licenseNumber}\nAddress: ${formData.address}`
      })
      
      // Then upload documents if any
      if (idCardFront || idCardBack || licenseFront) {
        await uploadBookingDocuments(bookingResponse.id, {
          idCardFront,
          idCardBack,
          driverLicense: licenseFront
        })
      }

      toast.success('Đã gửi yêu cầu đặt xe thành công!');
      
      // Force refresh cars data in all pages
      window.dispatchEvent(new Event('carDataShouldRefresh'));
      
      navigate('/bookings', { state: { refresh: true } })
    } catch (error) {
      toast.error('Đặt xe thất bại: ' + error.response?.data?.message || error.message)
      console.error('Booking error:', error)
    }
  }

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-red-500">Không tìm thấy thông tin xe</div>
        <button 
          onClick={() => navigate('/cars')}
          className="mt-4 bg-primary-600 text-white px-4 py-2 rounded-lg"
        >
          Quay lại danh sách xe
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Đặt xe {car.name}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Car Info */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center">
              {car.imageUrl ? (
                <img src={car.imageUrl} alt={car.name} className="h-full w-full object-cover rounded-lg"/>
              ) : (
                <FaCar className="text-2xl text-gray-400" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{car.name}</h3>
              <p className="text-gray-600">Giá: ${car.price}/ngày</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-gray-400" />
              <span>Ngày nhận: {formData.pickupDate || 'Chưa chọn'}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-gray-400" />
              <span>Ngày trả: {formData.returnDate || 'Chưa chọn'}</span>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Họ tên</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full border border-gray-300 rounded-lg py-2 px-4"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Số điện thoại</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full border border-gray-300 rounded-lg py-2 px-4"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full border border-gray-300 rounded-lg py-2 px-4"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Ngày nhận</label>
                <input
                  type="date"
                  required
                  value={formData.pickupDate}
                  onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg py-2 px-4"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Ngày trả</label>
                <input
                  type="date"
                  required
                  value={formData.returnDate}
                  onChange={(e) => setFormData({...formData, returnDate: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg py-2 px-4"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Số bằng lái</label>
              <input
                type="text"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                className="w-full border border-gray-300 rounded-lg py-2 px-4"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Địa chỉ</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full border border-gray-300 rounded-lg py-2 px-4"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">CCCD mặt trước</label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => setIdCardFront(e.target.files[0])}
                  className="w-full border border-gray-300 rounded-lg py-2 px-4"
                />
                {idCardFront && (
                  <img 
                    src={URL.createObjectURL(idCardFront)}
                    alt="CCCD mặt trước"
                    className="mt-2 h-20 object-contain"
                  />
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-1">CCCD mặt sau</label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => setIdCardBack(e.target.files[0])}
                  className="w-full border border-gray-300 rounded-lg py-2 px-4"
                />
                {idCardBack && (
                  <img
                    src={URL.createObjectURL(idCardBack)} 
                    alt="CCCD mặt sau"
                    className="mt-2 h-20 object-contain"
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Bằng lái xe (mặt trước)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => setLicenseFront(e.target.files[0])}
                  className="w-full"
                />
                {licenseFront && (
                  <img
                    src={URL.createObjectURL(licenseFront)}
                    alt="Bằng lái mặt trước"
                    className="mt-4 max-h-40 mx-auto object-contain"
                  />
                )}
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700"
            >
              Xác nhận đặt xe
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
