import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaCar, FaSearch, FaCalendarAlt, FaStar } from 'react-icons/fa'
import { fetchFeaturedCars } from '../services/carService'

export default function HomePage() {
  const [featuredCars, setFeaturedCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const navigate = useNavigate()

  const loadFeaturedCars = async () => {
    try {
      const featured = await fetchFeaturedCars()
      setFeaturedCars(featured)
      setLoading(false)
    } catch (err) {
      setError('Failed to load featured cars')
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFeaturedCars()
  }, [])

  // Refresh cars data when needed
  useEffect(() => {
    const handleRefresh = () => {
      loadFeaturedCars();
    };

    window.addEventListener('carDataShouldRefresh', handleRefresh);
    return () => {
      window.removeEventListener('carDataShouldRefresh', handleRefresh);
    };
  }, []);

  // Also refresh when page gains focus
  useEffect(() => {
    const handleFocus = () => {
      loadFeaturedCars();
    };
    
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault()
    if (!startDate || !endDate) {
      alert('Please select both pickup and return dates')
      return
    }
    navigate(`/cars?search=${searchTerm}&startDate=${startDate}&endDate=${endDate}`)
  }

  return (
    <div className="space-y-12 container mx-auto px-4 pb-12">
      {/* Hero section */}
      <div className="bg-blue-700 text-white p-8 rounded-xl">
        <h1 className="text-4xl font-bold mb-4">Find your perfect car</h1>
        <p className="text-xl mb-8">Rent the best cars at affordable prices</p>
        
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search by make or model..."
              className="w-full pl-10 py-3 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
              <input
                type="date"
                className="pl-10 py-3 rounded-lg min-w-[200px]"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
              <input
                type="date"
                className="pl-10 py-3 rounded-lg min-w-[200px]"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Featured cars section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Featured Cars</h2>
        
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map((car) => (
              <div key={car.id} className={`bg-white rounded-lg shadow-md overflow-hidden ${!car.available ? 'opacity-75' : ''}`}>
                <div className="h-48 bg-gray-200 flex items-center justify-center relative">
                  {car.image_url ? (
                    <img src={car.image_url} alt={car.model} className="h-full w-full object-cover" />
                  ) : (
                    <FaCar className="text-gray-400 text-5xl" />
                  )}
                  {!car.available && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">Đã đặt</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-xl">{car.brand} {car.model}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-600">{car.year}</span>
                    <div className="flex items-center space-x-1">
                      <FaStar className="text-yellow-400" />
                      <span>4.5</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xl font-bold">${car.price_per_day}/day</span>
                    <Link 
                      to={`/cars/${car.id}`} 
                      className={`px-4 py-2 rounded-lg font-medium ${
                        !car.available 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                      onClick={(e) => !car.available && e.preventDefault()}
                    >
                      {!car.available ? 'Không khả dụng' : 'Đặt ngay'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
