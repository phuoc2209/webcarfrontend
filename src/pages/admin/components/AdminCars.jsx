import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { 
  getCars,
  createCar,
  updateCar, 
  deleteCar
} from '../../../api/carApi';
import CarFormModal from './CarFormModal';

export default function AdminCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      const data = await getCars();
      setCars(data);
    } catch (error) {
      console.error('Error loading cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setCurrentCar(null);
    setShowModal(true);
  };

  const handleEdit = (car) => {
    setCurrentCar(car);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa xe này?')) {
      try {
        await deleteCar(id);
        loadCars();
      } catch (error) {
        console.error('Error deleting car:', error);
      }
    }
  };

  const handleSubmit = async (carData) => {
    try {
      if (currentCar) {
        await updateCar(currentCar.id, carData);
      } else {
        await createCar(carData);
      }
      loadCars();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving car:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Quản lý xe</h2>
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Thêm xe mới
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Hãng</th>
              <th className="py-2 px-4 border">Model</th>
              <th className="py-2 px-4 border">Năm</th>
              <th className="py-2 px-4 border">Giá/ngày</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td className="py-2 px-4 border">{car.id}</td>
                <td className="py-2 px-4 border">{car.brand}</td>
                <td className="py-2 px-4 border">{car.model}</td>
                <td className="py-2 px-4 border">{car.year}</td>
                <td className="py-2 px-4 border">${car.pricePerDay}</td>
                <td className="py-2 px-4 border">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(car)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(car.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CarFormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        car={currentCar}
      />
    </div>
  );
}
