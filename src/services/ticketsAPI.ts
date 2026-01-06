// src/services/ticketsAPI.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

const ticketsAPI = {
  // Get all tickets
  getAll: async () => {
    return axios.get(`${API_URL}/tickets`, {
      headers: getAuthHeader(),
    });
  },

  // Get ticket by ID
  getById: async (id: string) => {
    return axios.get(`${API_URL}/tickets/${id}`, {
      headers: getAuthHeader(),
    });
  },

  // Create ticket
  create: async (data: any) => {
    return axios.post(`${API_URL}/tickets`, data, {
      headers: getAuthHeader(),
    });
  },

  // Update ticket
  update: async (id: string, data: any) => {
    return axios.put(`${API_URL}/tickets/${id}`, data, {
      headers: getAuthHeader(),
    });
  },

  // Delete ticket
  delete: async (id: string) => {
    return axios.delete(`${API_URL}/tickets/${id}`, {
      headers: getAuthHeader(),
    });
  },

  // Update ticket status
  updateStatus: async (id: string, status: string) => {
    return axios.put(
      `${API_URL}/tickets/${id}/status`,
      { status },
      {
        headers: getAuthHeader(),
      }
    );
  },

  // Get tickets by status
  getByStatus: async (status: string) => {
    return axios.get(`${API_URL}/tickets/status/${status}`, {
      headers: getAuthHeader(),
    });
  },

  // Get tickets by merchant
  getByMerchant: async (merchantId: string) => {
    return axios.get(`${API_URL}/tickets/merchant/${merchantId}`, {
      headers: getAuthHeader(),
    });
  },

  // Add comment to ticket
  addComment: async (id: string, comment: string) => {
    return axios.post(
      `${API_URL}/tickets/${id}/comments`,
      { comment },
      {
        headers: getAuthHeader(),
      }
    );
  },

  // Get ticket comments
  getComments: async (id: string) => {
    return axios.get(`${API_URL}/tickets/${id}/comments`, {
      headers: getAuthHeader(),
    });
  },

  // Assign ticket
  assign: async (id: string, assignedTo: string) => {
    return axios.put(
      `${API_URL}/tickets/${id}/assign`,
      { assigned_to: assignedTo },
      {
        headers: getAuthHeader(),
      }
    );
  },

  // Close ticket
  close: async (id: string) => {
    return axios.post(
      `${API_URL}/tickets/${id}/close`,
      {},
      {
        headers: getAuthHeader(),
      }
    );
  },

  // Reopen ticket
  reopen: async (id: string) => {
    return axios.post(
      `${API_URL}/tickets/${id}/reopen`,
      {},
      {
        headers: getAuthHeader(),
      }
    );
  },
};

export default ticketsAPI;
