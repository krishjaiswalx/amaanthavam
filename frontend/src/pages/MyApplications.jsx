import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import applicationService from '../services/applicationService';
import userService from '../services/userService';
import Loader from '../components/Loader';

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = userService.getCurrentUser();
    if (!user) {
      navigate('/user-login');
      return;
    }
    fetchMyApplications();
  }, [navigate]);

  const fetchMyApplications = async () => {
    try {
      setLoading(true);
      const data = await applicationService.getMyApplications();
      setApplications(data);
    } catch (error) {
      toast.error('Failed to fetch your applications');
      if (error.response?.status === 401) {
        userService.logout();
        navigate('/user-login');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader />
      </div>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'selected': return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'rejected': return <XCircle className="w-6 h-6 text-red-600" />;
      case 'test': return <Clock className="w-6 h-6 text-blue-600" />;
      case 'shortlisted': return <CheckCircle className="w-6 h-6 text-purple-600" />;
      default: return <Clock className="w-6 h-6 text-yellow-600" />;
    }
  };

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
    <div className="px-4 py-12 mx-auto max-w-4xl sm:px-6 lg:px-8">
      <div className="mb-8 sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
          <p className="mt-2 text-sm text-gray-600">Track the status of your internship applications.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-lg shadow-sm bg-primary hover:bg-secondary focus:outline-none"
          >
            Find New Internships
          </button>
        </div>
      </div>

      {applications.length > 0 ? (
        <div className="space-y-6">
          {applications.map((app) => (
            <div key={app._id} className="p-6 transition-all bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${['selected', 'shortlisted'].includes(app.status) ? 'bg-green-50' : app.status === 'rejected' ? 'bg-red-50' : 'bg-yellow-50'}`}>
                    {getStatusIcon(app.status)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{app.internship?.title || 'Unknown Role'}</h3>
                    <p className="text-sm text-primary font-medium">{app.internship?.companyName || 'Unknown Company'}</p>
                    <p className="text-xs text-gray-500 mt-1">Submitted on {new Date(app.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                  
                  {app.resumeUrl && (
                    <a
                      href={`http://localhost:5000/${app.resumeUrl.replace(/\\/g, '/')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-2 text-gray-500 transition-colors bg-gray-100 rounded-lg hover:text-primary hover:bg-primary/10"
                      title="View Submitted Resume"
                    >
                      <Eye size={18} />
                    </a>
                  )}
                </div>
              </div>
              
              <div className="pt-4 mt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {app.skills.map((skill, i) => (
                    <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white border border-gray-100 border-dashed rounded-2xl">
          <FileText className="w-12 h-12 mx-auto text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No applications yet</h3>
          <p className="mt-2 text-sm text-gray-500">You haven't submitted any applications. Get started now!</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 mt-6 text-sm font-medium text-white rounded-lg bg-primary hover:bg-secondary"
          >
            Find Internships
          </button>
        </div>
      )}
    </div>
  );
}
