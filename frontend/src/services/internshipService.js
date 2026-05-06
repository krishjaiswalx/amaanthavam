import api from './api';

const getInternships = async () => {
  const response = await api.get('/internships');
  return response.data;
};

const getEmployerInternships = async () => {
  const response = await api.get('/internships/employer');
  return response.data;
};

const createInternship = async (data) => {
  const response = await api.post('/internships', data);
  return response.data;
};

const deleteInternship = async (id) => {
  const response = await api.delete(`/internships/${id}`);
  return response.data;
};

const internshipService = {
  getInternships,
  getEmployerInternships,
  createInternship,
  deleteInternship,
};

export default internshipService;
