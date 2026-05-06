import api from './api';

const submitApplication = async (formData) => {
  const response = await api.post('/applications', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const getApplications = async () => {
  const response = await api.get('/applications');
  return response.data;
};

const getEmployerApplications = async () => {
  const response = await api.get('/applications/employer');
  return response.data;
};

const getMyApplications = async () => {
  const response = await api.get('/applications/my');
  return response.data;
};

const updateStatus = async (id, status) => {
  const response = await api.put(`/applications/${id}/status`, { status });
  return response.data;
};

const deleteApplication = async (id) => {
  const response = await api.delete(`/applications/${id}`);
  return response.data;
};

const applicationService = {
  submitApplication,
  getApplications,
  getEmployerApplications,
  getMyApplications,
  updateStatus,
  deleteApplication,
};

export default applicationService;
