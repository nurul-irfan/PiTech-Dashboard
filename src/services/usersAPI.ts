// src/services/usersAPI.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

const usersAPI = {
  // Get all users
  getAll: async () => {
    return axios.get(`${API_URL}/users`, {
      headers: getAuthHeader(),
    });
  },

  // Get user by ID
  getById: async (id: string) => {
    return axios.get(`${API_URL}/users/${id}`, {
      headers: getAuthHeader(),
    });
  },

  // Create user
  create: async (data: any) => {
    return axios.post(`${API_URL}/users`, data, {
      headers: getAuthHeader(),
    });
  },

  // Update user
  update: async (id: string, data: any) => {
    return axios.put(`${API_URL}/users/${id}`, data, {
      headers: getAuthHeader(),
    });
  },

  // Delete user
  delete: async (id: string) => {
    return axios.delete(`${API_URL}/users/${id}`, {
      headers: getAuthHeader(),
    });
  },

  // Get user by email
  getByEmail: async (email: string) => {
    return axios.get(`${API_URL}/users/email/${email}`, {
      headers: getAuthHeader(),
    });
  },

  // Search users
  search: async (query: string) => {
    return axios.get(`${API_URL}/users/search?q=${query}`, {
      headers: getAuthHeader(),
    });
  },

  // Get user profile
  getProfile: async () => {
    return axios.get(`${API_URL}/users/profile`, {
      headers: getAuthHeader(),
    });
  },

  // Update user profile
  updateProfile: async (data: any) => {
    return axios.put(`${API_URL}/users/profile`, data, {
      headers: getAuthHeader(),
    });
  },

  // Change user role
  changeRole: async (id: string, role: string) => {
    return axios.put(
      `${API_URL}/users/${id}/role`,
      { role },
      {
        headers: getAuthHeader(),
      }
    );
  },

  // Activate user
  activate: async (id: string) => {
    return axios.post(
      `${API_URL}/users/${id}/activate`,
      {},
      {
        headers: getAuthHeader(),
      }
    );
  },

  // Deactivate user
  deactivate: async (id: string) => {
    return axios.post(
      `${API_URL}/users/${id}/deactivate`,
      {},
      {
        headers: getAuthHeader(),
      }
    );
  },

  // Reset user password
  resetPassword: async (id: string) => {
    return axios.post(
      `${API_URL}/users/${id}/reset-password`,
      {},
      {
        headers: getAuthHeader(),
      }
    );
  },

  // Get user activity
  getActivity: async (id: string) => {
    return axios.get(`${API_URL}/users/${id}/activity`, {
      headers: getAuthHeader(),
    });
  },

  // Export users
  export: async (format: 'csv' | 'pdf' | 'json') => {
    return axios.get(`${API_URL}/users/export?format=${format}`, {
      headers: getAuthHeader(),
      responseType: 'blob',
    });
  },
};

export default usersAPI;
