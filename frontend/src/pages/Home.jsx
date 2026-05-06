import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import internshipService from '../services/internshipService';
import InternshipCard from '../components/InternshipCard';
import Loader from '../components/Loader';

export default function Home() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('latest'); // 'latest', 'oldest'

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      setLoading(true);
      const data = await internshipService.getInternships();
      setInternships(data);
    } catch (error) {
      toast.error('Failed to load internships');
    } finally {
      setLoading(false);
    }
  };

  const filteredInternships = internships
    .filter(i => {
      const matchSearch = i.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          i.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          i.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchType = typeFilter === 'All' || i.type === typeFilter;
      return matchSearch && matchType;
    })
    .sort((a, b) => {
      if (sortBy === 'latest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

  return (
    <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Discover Your Next <span className="text-primary">Internship</span>
        </h1>
        <p className="max-w-2xl mx-auto mt-4 text-xl text-gray-500">
          Find the best opportunities from top companies and kickstart your career today.
        </p>
      </div>

      <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full py-3 pl-11 pr-4 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all"
            placeholder="Search by role, company, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex items-center px-4 py-3 bg-gray-50 rounded-xl">
            <Filter className="w-5 h-5 mr-2 text-gray-400" />
            <select
              className="bg-transparent border-none outline-none text-gray-700 font-medium focus:ring-0 cursor-pointer"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Internship">Internship</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </select>
          </div>

          <div className="flex items-center px-4 py-3 bg-gray-50 rounded-xl">
            <span className="text-gray-400 mr-2 text-sm font-medium">Sort by:</span>
            <select
              className="bg-transparent border-none outline-none text-gray-700 font-medium focus:ring-0 cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader />
        </div>
      ) : filteredInternships.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredInternships.map(internship => (
            <InternshipCard key={internship._id} internship={internship} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white border border-dashed border-gray-200 rounded-3xl">
          <h3 className="text-xl font-semibold text-gray-900">No internships found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
