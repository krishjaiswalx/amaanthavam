import api from './api';

const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data) {
    localStorage.setItem('adminInfo', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('adminInfo');
};

const getCurrentAdmin = () => {
  return JSON.parse(localStorage.getItem('adminInfo'));
};

const authService = {
  login,
  logout,
  getCurrentAdmin,
};

export default authService;
