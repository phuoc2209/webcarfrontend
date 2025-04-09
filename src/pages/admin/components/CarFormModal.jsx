import { useState, useEffect } from 'react';
import { FaTimes, FaCar, FaImage, FaInfoCircle } from 'react-icons/fa';

export default function CarFormModal({ show, onClose, onSubmit, car }) {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    color: '',
    licensePlate: '',
    pricePerDay: '',
    description: '',
    imageUrl: '',
    isFeatured: false
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (car) {
      setFormData({
        brand: car.brand,
        model: car.model,
        year: car.year,
        color: car.color,
        licensePlate: car.licensePlate,
        pricePerDay: car.pricePerDay,
        description: car.description || '',
        imageUrl: car.imageUrl || '',
        isFeatured: car.isFeatured || false
      });
    } else {
      setFormData({
        brand: '',
        model: '',
        year: '',
        color: '',
        licensePlate: '',
        pricePerDay: '',
        description: '',
        imageUrl: '',
        isFeatured: false
      });
    }
    setErrors({});
  }, [car, show]);

  const validate = () => {
    const newErrors = {};
    if (!formData.brand) newErrors.brand = 'Vui lòng nhập hãng xe';
    if (!formData.model) newErrors.model = 'Vui lòng nhập model';
    if (!formData.year || formData.year < 1900 || formData.year > new Date().getFullYear() + 1) 
      newErrors.year = 'Năm sản xuất không hợp lệ';
    if (!formData.color) newErrors.color = 'Vui lòng nhập màu sắc';
    if (!formData.licensePlate) newErrors.licensePlate = 'Vui lòng nhập biển số';
    if (!formData.pricePerDay || formData.pricePerDay <= 0) 
      newErrors.pricePerDay = 'Giá thuê phải lớn hơn 0';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaCar className="text-xl" />
            <h3 className="text-xl font-bold">
              {car ? 'CẬP NHẬT XE' : 'THÊM XE MỚI'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hãng xe <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.brand ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="VD: Toyota, Honda..."
                  />
                  {errors.brand && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <FaInfoCircle className="mr-1" /> {errors.brand}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.model ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="VD: Camry, CR-V..."
                  />
                  {errors.model && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <FaInfoCircle className="mr-1" /> {errors.model}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Năm sản xuất <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.year ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.year && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <FaInfoCircle className="mr-1" /> {errors.year}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Màu sắc <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.color ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.color && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <FaInfoCircle className="mr-1" /> {errors.color}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Biển số <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.licensePlate ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.licensePlate && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <FaInfoCircle className="mr-1" /> {errors.licensePlate}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giá thuê/ngày (VND) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="pricePerDay"
                    value={formData.pricePerDay}
                    onChange={handleChange}
                    min="0"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.pricePerDay ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.pricePerDay && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <FaInfoCircle className="mr-1" /> {errors.pricePerDay}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ảnh xe
                </label>
                <div className="flex items-center space-x-2">
                  <FaImage className="text-gray-400" />
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/car-image.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Thông tin chi tiết về xe..."
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="isFeatured" className="ml-2 text-sm font-medium text-gray-700">
                  Xe nổi bật
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {car ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
