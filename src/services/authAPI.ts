// src/servicesAPI.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;
console.log(API_URL)

const authAPI = {
  // Merchant Login
  merchantLogin: async (email: string, password: string) => {
    return axios.post(`${API_URL}/merchant/login`, {
      email,
      password,
    });
  },

  // Admin Login
  adminLogin: async (email: string, password: string, ipAddress?: string) => {
    return axios.post(`${API_URL}/admin/login`, {
      email,
      password,
      ...(ipAddress && { ip_address: ipAddress }),
    });
  },

  // Refresh Token
  refreshToken: async (token: string) => {
    return axios.post(
      `${API_URL}/refresh-token`,
      { token },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  // Enable 2FA
  enable2FA: async (merchantId: string) => {
    return axios.post(
      `${API_URL}/2fa/enable`,
      { merchant_id: merchantId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  },

  // Verify 2FA
  verify2FA: async (merchantId: string, otp: string) => {
    return axios.post(
      `${API_URL}/2fa/verify`,
      { merchant_id: merchantId, otp },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  },

  // Forgot Password
  forgotPassword: async (email: string) => {
    return axios.post(`${API_URL}/admin/reset-password`, { email });
  },

  // Reset Password
  resetPassword: async (resetHash: string, newPassword: string) => {
    return axios.post(`${API_URL}/admin/reset-password`, {
      reset_hash: resetHash,
      new_password: newPassword,
    });
  },

  // Change Password
  changePassword: async (oldPassword: string, newPassword: string) => {
    return axios.post(
      `${API_URL}/change-password`,
      {
        old_password: oldPassword,
        new_password: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  },

  // Logout
  logout: async () => {
    return axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  },
};

export default authAPI;
