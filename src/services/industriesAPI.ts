// src/services/industriesAPI.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

const industriesAPI = {
  // Get all industries
  getAll: async () => {
    return axios.get(`${API_URL}/industries`, {
      headers: getAuthHeader(),
    });
  },

  // Get industry by ID
  getById: async (id: string) => {
    return axios.get(`${API_URL}/industries/${id}`, {
      headers: getAuthHeader(),
    });
  },

  // Create industry
  create: async (data: any) => {
    return axios.post(`${API_URL}/industries`, data, {
      headers: getAuthHeader(),
    });
  },

  // Update industry
  update: async (id: string, data: any) => {
    return axios.put(`${API_URL}/industries/${id}`, data, {
      headers: getAuthHeader(),
    });
  },

  // Delete industry
  delete: async (id: string) => {
    return axios.delete(`${API_URL}/industries/${id}`, {
      headers: getAuthHeader(),
    });
  },

  // Get industry by code
  getByCode: async (code: string) => {
    return axios.get(`${API_URL}/industries/code/${code}`, {
      headers: getAuthHeader(),
    });
  },

  // Search industries
  search: async (query: string) => {
    return axios.get(`${API_URL}/industries/search?q=${query}`, {
      headers: getAuthHeader(),
    });
  },

  // Get industry fees
  getFees: async (id: string) => {
    return axios.get(`${API_URL}/industries/${id}/fees`, {
      headers: getAuthHeader(),
    });
  },

  // Update industry fees
  updateFees: async (id: string, fees: any) => {
    return axios.put(`${API_URL}/industries/${id}/fees`, fees, {
      headers: getAuthHeader(),
    });
  },

  // Get active industries
  getActive: async () => {
    return axios.get(`${API_URL}/industries/active`, {
      headers: getAuthHeader(),
    });
  },
};

export default industriesAPI;
