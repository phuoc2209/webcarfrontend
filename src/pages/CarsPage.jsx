import { useState, useEffect } from 'react'
import { FaCar, FaSearch, FaFilter, FaStar } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { getCars } from '../api/carApi'

export default function CarsPage() {
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    type: '',
    transmission: '',
    minPrice: '',
    maxPrice: ''
  })
  const [showFilters, setShowFilters] = useState(false)

  const location = useLocation()

  useEffect(() => {
    const handleRefresh = () => {
      const loadCars = async () => {
        try {
          const data = await getCars();
          setCars(data);
          setFilteredCars(data);
          setLoading(false);
        } catch (err) {
          setError('Failed to load cars. Please try again later.');
          setLoading(false);
          console.error('Error loading cars:', err);
        }
      };
      loadCars();
    };

    window.addEventListener('carDataShouldRefresh', handleRefresh);
    return () => {
      window.removeEventListener('carDataShouldRefresh', handleRefresh);
    };
  }, []);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const data = await getCars();
        setCars(data);
        setFilteredCars(data);
        
        const params = new URLSearchParams(location.search);
        const searchTerm = params.get('search') || '';
        setSearchTerm(searchTerm);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load cars. Please try again later.');
        setLoading(false);
        console.error('Error loading cars:', err);
      }
    };

    loadCars();
  }, [location.search]);

  useEffect(() => {
    const filtered = cars.filter(car => (
      car.available === true &&
      (!filters.type || car.type === filters.type) &&
      (!filters.transmission || car.transmission === filters.transmission) &&
      (!filters.minPrice || car.pricePerDay >= Number(filters.minPrice)) &&
      (!filters.maxPrice || car.pricePerDay <= Number(filters.maxPrice)) &&
      (!searchTerm || car.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
       car.brand.toLowerCase().includes(searchTerm.toLowerCase()))
    ));
    setFilteredCars(filtered);
  }, [filters, cars])
  const handleSearch = (e) => {
    e.preventDefault()
    const filtered = cars.filter(car => 
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
      car.brand.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCars(filtered)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading cars...</p>
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Cars</h1>
      
      {/* Search and Filter Bar */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by car name..."
                className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <FaSearch /> Search
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition-colors"
            >
              <FaFilter /> Filters
            </button>
          </div>
        </form>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                >
                  <option value="">All Types</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Pickup">Pickup</option>
                  <option value="Van">Van</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
                <select
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={filters.transmission}
                  onChange={(e) => setFilters({...filters, transmission: e.target.value})}
                >
                  <option value="">All</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Price ($)</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Price ($)</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <p className="text-gray-600 mb-4">
        Showing {filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'}
      </p>

      {/* Cars Grid */}
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map(car => (
            <div key={car.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow relative">
              {!car.available && (
                <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 rounded-br-lg z-10">
                  Đã được đặt
                </div>
              )}
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {car.imageUrl ? (
                  <img 
                    src={car.imageUrl} 
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaCar className="text-4xl text-gray-400" />
                )}
              </div>
              <div className="p-6">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{car.brand} {car.model}</h3>
                    {car.available && (
                      <div className="flex items-center text-yellow-500">
                        <FaStar className="mr-1" />
                        <span>Popular</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between text-gray-600 mb-4">
                    <span>{car.color}</span>
                    <span>{car.year}</span>
                    <span>{car.licensePlate}</span>
                  </div>
                  {car.description && (
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {car.description}
                    </p>
                  )}
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold text-primary-600">{car.pricePerDay.toLocaleString()}₫<span className="text-sm font-normal text-gray-500">/ngày</span></p>
                    <Link
                      to={`/cars/${car.id}`}
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FaCar className="mx-auto text-5xl text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900">No cars found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
