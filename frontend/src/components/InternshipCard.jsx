import { MapPin, Briefcase, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function InternshipCard({ internship }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between p-6 transition-all bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md">
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
              {internship.employer?.logoUrl ? (
                <img src={internship.employer.logoUrl} alt={internship.companyName} className="w-8 h-8 rounded-lg" />
              ) : (
                <Building className="w-6 h-6 text-primary" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{internship.title}</h3>
              <p className="text-sm font-medium text-primary">{internship.companyName}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
            <Briefcase size={12} className="mr-1" /> {internship.type}
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
            <MapPin size={12} className="mr-1" /> {internship.locationType}
          </span>
          {internship.locationType !== 'Remote' && internship.location && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-700 border border-gray-100">
              {internship.location}
            </span>
          )}
        </div>

        <p className="mb-4 text-sm text-gray-600 line-clamp-3">
          {internship.description}
        </p>

        <div className="mb-6">
          <h4 className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">Skills Required</h4>
          <div className="flex flex-wrap gap-1">
            {internship.skills.map((skill, idx) => (
              <span key={idx} className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate(`/apply/${internship._id}`)}
        className="w-full px-4 py-2.5 text-sm font-semibold text-white transition-colors rounded-xl bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Apply Now
      </button>
    </div>
  );
}
