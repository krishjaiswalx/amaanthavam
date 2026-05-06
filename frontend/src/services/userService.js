import api from './api';

const register = async (name, email, password) => {
  const response = await api.post('/users/register', { name, email, password });
  if (response.data) {
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (email, password) => {
  const response = await api.post('/users/login', { email, password });
  if (response.data) {
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('userInfo');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('userInfo'));
};

const userService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default userService;
