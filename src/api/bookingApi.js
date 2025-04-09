import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  console.log('Booking API Token:', token);
  
  if (!token) {
    console.error('No token found in localStorage');
    return {};
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Token payload:', payload);
    
    // Validate token expiration
    const now = Date.now() / 1000;
    if (payload.exp < now) {
      console.error('Token expired. Exp:', new Date(payload.exp * 1000));
      return {};
    }
    
    const authHeader = { 
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      } 
    };
    console.log('Auth header:', authHeader);
    return authHeader;
  } catch (e) {
    console.error('Error validating token:', e);
    return {};
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const getBookingsByCarId = async (carId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings/car/${carId}`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error fetching car bookings:', error);
    throw error;
  }
};

export const getBookingById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings/${id}`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw error;
  }
};

export const getUserBookings = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings/user/${userId}`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    throw error;
  }
};

export const updateBookingStatus = async (id, status) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/bookings/${id}/status`, 
      { status },
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
};

export const uploadBookingDocuments = async (bookingId, files) => {
  try {
    const formData = new FormData();
    Object.values(files).forEach(file => {
      if (file) {
        formData.append('files', file);
      }
    });

      const config = {
        ...getAuthHeader(),
        headers: {
          ...getAuthHeader().headers,
          'Content-Type': 'multipart/form-data'
        }
      };
      
      const response = await axios.post(
        `${API_BASE_URL}/bookings/${bookingId}/documents`, 
        formData,
        config
      );
    return response.data;
  } catch (error) {
    console.error('Error uploading documents:', error);
    throw error;
  }
};
