import api from './api';

const register = async (companyName, email, password) => {
  const response = await api.post('/employers/register', { companyName, email, password });
  if (response.data) {
    localStorage.setItem('employerInfo', JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (email, password) => {
  const response = await api.post('/employers/login', { email, password });
  if (response.data) {
    localStorage.setItem('employerInfo', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('employerInfo');
};

const getCurrentEmployer = () => {
  return JSON.parse(localStorage.getItem('employerInfo'));
};

const employerService = {
  register,
  login,
  logout,
  getCurrentEmployer,
};

export default employerService;
