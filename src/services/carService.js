import axios from 'axios'
import { getAuthHeader } from './authService'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCars = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cars`, getAuthHeader())
    return response.data
  } catch (error) {
    console.error('Error fetching all cars:', error)
    throw error
  }
}

export const fetchFeaturedCars = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cars/featured`)
    return response.data
  } catch (error) {
    console.error('Error fetching featured cars:', error)
    throw error  
  }
}

export const getCarById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cars/${id}`, getAuthHeader())
    return response.data
  } catch (error) {
    console.error(`Error fetching car with id ${id}:`, error)
    throw error
  }
}

export const searchCars = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cars/search?q=${query}`, getAuthHeader())
    return response.data
  } catch (error) {
    console.error('Error searching cars:', error)
    throw error
  }
}

export const createCar = async (carData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/cars`, carData, getAuthHeader())
    return response.data
  } catch (error) {
    console.error('Error creating car:', error)
    throw error
  }
}

export const updateCar = async (id, carData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/cars/${id}`, carData, getAuthHeader())
    return response.data
  } catch (error) {
    console.error('Error updating car:', error)
    throw error
  }
}

export const deleteCar = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/cars/${id}`, getAuthHeader())
  } catch (error) {
    console.error('Error deleting car:', error)
    throw error
  }
}

export const checkCarAvailability = async (carId, startDate, endDate) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/cars/${carId}/availability`,
      { 
        params: { startDate, endDate },
        ...getAuthHeader()
      }
    )
    return response.data.available
  } catch (error) {
    console.error('Error checking car availability:', error)
    throw error
  }
}
