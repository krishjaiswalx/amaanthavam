import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Filter, Eye, Trash2, ChevronDown, PlusCircle, Briefcase, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import applicationService from '../services/applicationService';
import employerService from '../services/employerService';
import internshipService from '../services/internshipService';
import Loader from '../components/Loader';
import Modal from '../components/Modal';

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState('applications'); // 'applications' or 'postings'
  const [applications, setApplications] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState('application'); // 'application' or 'internship'
  const navigate = useNavigate();

  useEffect(() => {
    const employer = employerService.getCurrentEmployer();
    if (!employer && !localStorage.getItem('adminInfo')) {
      navigate('/employer/login');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [appsData, internshipsData] = await Promise.all([
        applicationService.getEmployerApplications(),
        internshipService.getEmployerInternships()
      ]);
      setApplications(appsData);
      setInternships(internshipsData);
    } catch (error) {
      toast.error('Failed to fetch data');
      if (error.response?.status === 401) {
        employerService.logout();
        navigate('/employer/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      setApplications(apps => apps.map(app => 
        app._id === id ? { ...app, status: newStatus } : app
      ));
      await applicationService.updateStatus(id, newStatus);
      toast.success('Status updated successfully');
    } catch (error) {
      fetchData();
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      if (deleteType === 'application') {
        setApplications(apps => apps.filter(app => app._id !== itemToDelete));
        await applicationService.deleteApplication(itemToDelete);
        toast.success('Application deleted');
      } else {
        setInternships(prev => prev.filter(i => i._id !== itemToDelete));
        await internshipService.deleteInternship(itemToDelete);
        toast.success('Internship posting removed');
      }
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      fetchData();
      toast.error('Failed to delete item');
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.internship?.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredInternships = internships.filter(i => 
    i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader />
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'selected': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'test': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shortlisted': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="mb-8 sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employer Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">Manage your internship postings and applicant submissions.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/employer/create-internship"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-all transform border border-transparent rounded-lg shadow-sm bg-primary hover:bg-secondary hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <PlusCircle className="w-5 h-5 mr-2 -ml-1" />
            Post New Internship
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-1 mb-8 space-x-1 bg-gray-100 rounded-xl max-w-md">
        <button
          onClick={() => setActiveTab('applications')}
          className={`flex items-center justify-center w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-all ${
            activeTab === 'applications'
              ? 'bg-white text-primary shadow'
              : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
          }`}
        >
          <Users size={18} className="mr-2" />
          Applications
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === 'applications' ? 'bg-primary/10 text-primary' : 'bg-gray-200 text-gray-600'}`}>
            {applications.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('postings')}
          className={`flex items-center justify-center w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-all ${
            activeTab === 'postings'
              ? 'bg-white text-primary shadow'
              : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
          }`}
        >
          <Briefcase size={18} className="mr-2" />
          My Postings
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === 'postings' ? 'bg-primary/10 text-primary' : 'bg-gray-200 text-gray-600'}`}>
            {internships.length}
          </span>
        </button>
      </div>

      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full py-2 pl-10 pr-3 border border-gray-200 bg-white rounded-lg focus:ring-primary focus:border-primary sm:text-sm outline-none transition-all"
            placeholder={activeTab === 'applications' ? "Search applicants or roles..." : "Search your postings..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {activeTab === 'applications' && (
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              className="block w-full py-2 pl-3 pr-10 text-base border border-gray-200 bg-white rounded-lg focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="test">Test</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="selected">Selected</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        )}
      </div>

      <div className="overflow-hidden bg-white shadow-sm ring-1 ring-black ring-opacity-5 rounded-2xl border border-gray-100">
        <div className="overflow-x-auto">
          {activeTab === 'applications' ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-4 pl-6 pr-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Applicant</th>
                  <th scope="col" className="px-3 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Internship</th>
                  <th scope="col" className="px-3 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-3 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Resume</th>
                  <th scope="col" className="relative py-4 pl-3 pr-6 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => (
                    <tr key={app._id} className="transition-colors hover:bg-gray-50/50">
                      <td className="py-4 pl-6 pr-3 whitespace-nowrap">
                        <div>
                          <div className="font-semibold text-gray-900">{app.name}</div>
                          <div className="text-xs text-gray-500">{app.email}</div>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-600 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{app.internship?.title || 'Unknown Internship'}</div>
                        <div className="text-xs text-gray-400">{new Date(app.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap">
                        <div className="relative inline-block text-left">
                          <select
                            value={app.status}
                            onChange={(e) => handleStatusChange(app._id, e.target.value)}
                            className={`appearance-none outline-none border pl-3 pr-8 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${getStatusColor(app.status)} transition-all cursor-pointer`}
                          >
                            <option value="pending">Pending</option>
                            <option value="test">Test</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="selected">Selected</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                            <ChevronDown size={12} />
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-sm text-center whitespace-nowrap">
                        {app.resumeUrl ? (
                          <a
                            href={`http://localhost:5000/${app.resumeUrl.replace(/\\/g, '/')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center p-2 text-primary transition-all rounded-lg bg-primary/5 hover:bg-primary/10 hover:scale-110"
                            title="View Resume"
                          >
                            <Eye size={18} />
                          </a>
                        ) : (
                          <span className="text-gray-300">N/A</span>
                        )}
                      </td>
                      <td className="py-4 pl-3 pr-6 text-sm text-center whitespace-nowrap">
                        <button
                          onClick={() => {
                            setItemToDelete(app._id);
                            setDeleteType('application');
                            setIsDeleteModalOpen(true);
                          }}
                          className="inline-flex items-center justify-center p-2 text-red-500 transition-all bg-red-50 rounded-lg hover:bg-red-100 hover:scale-110"
                          title="Delete Application"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-3 py-12 text-sm text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <Users className="w-12 h-12 text-gray-200 mb-2" />
                        <p>No applications found matching your criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-4 pl-6 pr-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Internship Details</th>
                  <th scope="col" className="px-3 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type / Location</th>
                  <th scope="col" className="px-3 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Skills</th>
                  <th scope="col" className="px-3 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Posted On</th>
                  <th scope="col" className="relative py-4 pl-3 pr-6 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInternships.length > 0 ? (
                  filteredInternships.map((internship) => (
                    <tr key={internship._id} className="transition-colors hover:bg-gray-50/50">
                      <td className="py-4 pl-6 pr-3">
                        <div className="font-semibold text-gray-900">{internship.title}</div>
                        <div className="text-xs text-gray-500 line-clamp-1 max-w-xs">{internship.description}</div>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-600">
                        <div className="flex flex-col space-y-1">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 uppercase w-fit">
                            {internship.type}
                          </span>
                          <span className="text-xs font-medium text-gray-500">{internship.locationType} {internship.location ? `(${internship.location})` : ''}</span>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-600">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {internship.skills.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] border border-gray-200">
                              {skill}
                            </span>
                          ))}
                          {internship.skills.length > 3 && <span className="text-[10px] text-gray-400">+{internship.skills.length - 3}</span>}
                        </div>
                      </td>
                      <td className="px-3 py-4 text-center text-sm text-gray-500">
                        {new Date(internship.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 pl-3 pr-6 text-sm text-center whitespace-nowrap">
                        <button
                          onClick={() => {
                            setItemToDelete(internship._id);
                            setDeleteType('internship');
                            setIsDeleteModalOpen(true);
                          }}
                          className="inline-flex items-center justify-center p-2 text-red-500 transition-all bg-red-50 rounded-lg hover:bg-red-100 hover:scale-110"
                          title="Remove Internship"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-3 py-12 text-sm text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <Briefcase className="w-12 h-12 text-gray-200 mb-2" />
                        <p>No internships posted yet.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this {deleteType}? This action cannot be undone.
            {deleteType === 'internship' && " This will also affect any existing applications for this internship."}
          </p>
        </div>
        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-sm"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
