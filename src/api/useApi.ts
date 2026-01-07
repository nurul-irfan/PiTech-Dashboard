import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Define types for API responses and errors
interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
}

interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

let token;
// Base API configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  // headers: {
  //   'Content-Type': 'application/json',
  //   "Authorization": `Bearer ${localStorage.getItem("token") != null && localStorage.getItem("token")}`
  // },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Set the authentication token
const setAuthToken = (token: string) => {
  // if (token) {
  //   api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  // } else {
  //   delete api.defaults.headers.common['Authorization'];
  // }
};

// Generic API request function
const apiRequest = async <T>(
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  url: string,
  data?: any,
  params?: any,
  config?: AxiosRequestConfig,
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await api({
      method,
      url,
      data,
      params,
      ...config,
    });
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    const apiError: ApiError = {
      message: axiosError.message,
      status: axiosError.response?.status,
      data: axiosError.response?.data,
    };
    throw apiError;
  }
};

// Admin API functions
const adminApi = {
  login: (data: any) => apiRequest<{ token: string }>('post', '/api/admin/login', data),
  verifyAdmin: (data: any) => apiRequest('post', '/api/admin/verify-admin', data),
  createAdmin: (data: any) => apiRequest('post', '/api/admin/create', data),
  listAdmins: () => apiRequest<any[]>('get', '/api/admin/list'),
  getAdminById: (id: string) => apiRequest('get', `/api/admin/listById/${id}`),
  resetPassword: (data: any) => apiRequest('post', '/api/admin/reset-password', data),
  changePassword: (data: any) => apiRequest('post', '/api/admin/change-password', data),
  getRoles: () => apiRequest<any[]>('get', '/api/admin/roles'),
  getRoleById: (id: string) => apiRequest('get', `/api/admin/roles/${id}`),
};

// User API functions
const userApi = {
  createUser: (data: any) => apiRequest('post', '/api/users/create', data),
  loginUser: (data: any) => apiRequest<{ token: string }>('post', '/api/users/login', data),
  verifyOtp: (data: any) => apiRequest('post', '/api/users/verify-otp', data),
  logoutUser: () => apiRequest('post', '/api/users/logout'),
  resetPassword: (data: any) => apiRequest('post', '/api/users/reset-password', data),
  changePassword: (data: any) => apiRequest('post', '/api/users/change-password', data),
  getProfile: () => apiRequest('get', '/api/users/profile'),
  listUsers: () => apiRequest<any[]>('get', '/api/users/list'),
  getUserById: (id: string) => apiRequest('get', `/api/users/listById/${id}`),
};

// Payment API functions
const paymentApi = {
  getRequests: () => apiRequest<any[]>('get', '/api/payment/requests'),
  getRequestById: (requestId: string) => apiRequest('get', `/api/payment/requests/${requestId}`),
  approveRequest: (requestId: string) => apiRequest('post', `/api/payment/requests/${requestId}/approve`),
  rejectRequest: (requestId: string) => apiRequest('post', `/api/payment/requests/${requestId}/reject`),
};

// Transaction API functions
const transactionApi = {
  getTransactions: () => apiRequest<any[]>('get', '/api/transactions/'),
  getTransactionById: (transactionId: string) => apiRequest('get', `/api/transactions/${transactionId}`),
  executeTransaction: (transactionId: string) => apiRequest('post', `/api/transactions/${transactionId}/execute`),
  auditTransaction: (transactionId: string) => apiRequest('post', `/api/transactions/${transactionId}/audit`),
};

// Support API functions
const supportApi = {
  getTickets: () => apiRequest<any[]>('get', '/api/support/tickets'),
  updateTicketStatus: (ticketId: string, data: any) => apiRequest('put', `/api/support/tickets/${ticketId}/status`, data),
  getContacts: () => apiRequest<any[]>('get', '/api/support/contacts'),
};

// Logs API functions
const logsApi = {
  getLogs: () => apiRequest<any[]>('get', '/api/logs/'),
  getLogById: (logId: string) => apiRequest('get', `/api/logs/${logId}`),
};

// Export the API functions and setAuthToken
export {
  setAuthToken,
  adminApi,
  userApi,
  paymentApi,
  transactionApi,
  supportApi,
  logsApi,
};
