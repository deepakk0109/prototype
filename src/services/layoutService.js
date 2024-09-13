// src/services/layoutService.js
import axios from 'axios';

const API_URL ='http://localhost:5000/layout';
const layoutService = {
  // Create a new layout (POST)
  createLayout: async (layoutData) => {
    try {
      const response = await axios.post(API_URL, layoutData);
      return response.data;
    } catch (error) {
      console.error('Error creating layout:', error);
      throw error;
    }
  },
//Fet one layout
getLayoutbyId: async (layoutId) => {
  try {
    const response = await axios.get(`${API_URL}/${layoutId}`);
    return response.data;
  } catch (error) {
    console.error('Error updating layout:', error);
    throw error;
  }
},
  // Get all layouts (GET)
  getLayouts: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching layouts:', error);
      throw error;
    }
  },

  // Update an existing layout (PUT)
  updateLayout: async (layoutId, layoutData) => {
    try {
      const response = await axios.put(`${API_URL}/${layoutId}`, layoutData);
      return response.data;
    } catch (error) {
      console.error('Error updating layout:', error);
      throw error;
    }
  },

  // Delete a layout (DELETE)
  deleteLayout: async (layoutId) => {
    try {
      const response = await axios.delete(`${API_URL}/${layoutId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting layout:', error);
      throw error;
    }
  },
};

export default layoutService;
