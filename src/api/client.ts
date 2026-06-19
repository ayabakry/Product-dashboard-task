import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);