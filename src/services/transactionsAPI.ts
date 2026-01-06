// src/services/transactionsAPI.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

const transactionsAPI = {
  // Get all transactions
  getAll: async () => {
    return axios.get(`${API_URL}/transactions`, {
      headers: getAuthHeader(),
    });
  },

  // Get transaction by ID
  getById: async (id: string) => {
    return axios.get(`${API_URL}/transactions/${id}`, {
      headers: getAuthHeader(),
    });
  },

  // Create transaction
  create: async (data: any) => {
    return axios.post(`${API_URL}/transactions`, data, {
      headers: getAuthHeader(),
    });
  },

  // Update transaction
  update: async (id: string, data: any) => {
    return axios.put(`${API_URL}/transactions/${id}`, data, {
      headers: getAuthHeader(),
    });
  },

  // Delete transaction
  delete: async (id: string) => {
    return axios.delete(`${API_URL}/transactions/${id}`, {
      headers: getAuthHeader(),
    });
  },

  // Get all payment tokens
  getAllPaymentTokens: async () => {
    return axios.get(`${API_URL}/transactions/payment-tokens`, {
      headers: getAuthHeader(),
    });
  },

  // Create payment token
  createPaymentToken: async (data: any) => {
    return axios.post(`${API_URL}/transactions/payment-tokens`, data, {
      headers: getAuthHeader(),
    });
  },

  // Generate QR Code
  getQRCode: async (data: any) => {
    return axios.post(`${API_URL}/transactions/qr-code`, data, {
      headers: getAuthHeader(),
    });
  },

  // Verify payment
  verifyPayment: async (merchantId: string, txnId: string) => {
    return axios.post(
      `${API_URL}/transactions/verify`,
      {
        merchant_id: merchantId,
        txn_id: txnId,
      },
      {
        headers: getAuthHeader(),
      }
    );
  },

  // Get transactions by merchant
  getByMerchant: async (merchantId: string) => {
    return axios.get(`${API_URL}/transactions/merchant/${merchantId}`, {
      headers: getAuthHeader(),
    });
  },

  // Get transactions by status
  getByStatus: async (status: string) => {
    return axios.get(`${API_URL}/transactions/status/${status}`, {
      headers: getAuthHeader(),
    });
  },

  // Get transactions by date range
  getByDateRange: async (startDate: string, endDate: string) => {
    return axios.get(
      `${API_URL}/transactions/date-range?start=${startDate}&end=${endDate}`,
      {
        headers: getAuthHeader(),
      }
    );
  },

  // Export transactions
  export: async (format: 'csv' | 'pdf' | 'json') => {
    return axios.get(`${API_URL}/transactions/export?format=${format}`, {
      headers: getAuthHeader(),
      responseType: 'blob',
    });
  },

  // Get transaction statistics
  getStats: async () => {
    return axios.get(`${API_URL}/transactions/stats`, {
      headers: getAuthHeader(),
    });
  },
};

export default transactionsAPI;
