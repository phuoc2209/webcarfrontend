import apiService from './apiService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getUserBookings = async () => {
  try {
    const response = await apiService.get(`${API_BASE_URL}/bookings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    throw error;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const response = await apiService.delete(`${API_BASE_URL}/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Error canceling booking:', error);
    throw error;
  }
};

export const getBookingById = async (id) => {
  try {
    const response = await apiService.get(`${API_BASE_URL}/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw error;
  }
};

export const createBooking = async (bookingData, frontIdCard, backIdCard, driverLicense, userId) => {
  try {
    const formData = new FormData();
    formData.append('bookingInfo', JSON.stringify(bookingData));
    if (frontIdCard) formData.append('frontIdCard', frontIdCard);
    if (backIdCard) formData.append('backIdCard', backIdCard);
    if (driverLicense) formData.append('driverLicense', driverLicense);
    formData.append('userId', userId);

    const response = await apiService.post(`${API_BASE_URL}/bookings`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};
