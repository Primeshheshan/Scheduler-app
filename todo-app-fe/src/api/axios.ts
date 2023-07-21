import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `backend/api/v1/`,
});

axiosInstance.interceptors.response.use(
  async (response) => response,
  (error) => {
    if (error.response.status === 403) {
      const getRefreshToken = async () => {
        const response = await axiosInstance.get('auth/refresh', {
          withCredentials: true,
        });
        const { accessToken } = response?.data ?? '';
        localStorage.setItem('accessToken', accessToken);
      };
      getRefreshToken();
    }
  }
);
export default axiosInstance;
