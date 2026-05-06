import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import internshipService from '../services/internshipService';
import Loader from '../components/Loader';

export default function CreateInternship() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await internshipService.createInternship(data);
      toast.success('Internship posted successfully!');
      navigate('/employer/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post internship');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
      <div className="p-8 bg-white border border-gray-100 shadow-xl rounded-2xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Post a New Internship</h2>
          <p className="mt-2 text-gray-600">Fill in the details below to attract top talent.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Internship Title</label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className={`mt-1 block w-full px-4 py-3 bg-gray-50 border ${errors.title ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all`}
              placeholder="e.g. Frontend Developer Intern"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                {...register('type', { required: 'Type is required' })}
                className="block w-full px-4 py-3 mt-1 transition-all border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-primary"
              >
                <option value="Internship">Internship</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location Type</label>
              <select
                {...register('locationType', { required: 'Location type is required' })}
                className="block w-full px-4 py-3 mt-1 transition-all border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-primary"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location (if Hybrid/On-site)</label>
            <input
              type="text"
              {...register('location')}
              className="block w-full px-4 py-3 mt-1 transition-all border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-primary"
              placeholder="e.g. New York, NY"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Skills Required (comma separated)</label>
            <input
              type="text"
              {...register('skills', { required: 'Skills are required' })}
              className="block w-full px-4 py-3 mt-1 transition-all border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-primary"
              placeholder="e.g. React, Node.js, MongoDB"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={4}
              className="block w-full px-4 py-3 mt-1 transition-all border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-primary"
              placeholder="Describe the internship role, responsibilities, and requirements..."
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-8 py-4 font-medium text-white transition-all bg-primary hover:bg-secondary rounded-xl disabled:opacity-70"
          >
            {isLoading ? <Loader /> : 'Post Internship'}
          </button>
        </form>
      </div>
    </div>
  );
}
