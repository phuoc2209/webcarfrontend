import axios from 'axios';
import { getAuthHeader } from '../services/authService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCars = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cars`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error getting cars:', error);
    throw error;
  }
};

export const createCar = async (carData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/cars`, carData, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error creating car:', error);
    throw error;
  }
};

export const updateCar = async (id, carData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/cars/${id}`, carData, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error updating car:', error);
    throw error;
  }
};

export const deleteCar = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/cars/${id}`, getAuthHeader());
  } catch (error) {
    console.error('Error deleting car:', error);
    throw error;
  }
};
