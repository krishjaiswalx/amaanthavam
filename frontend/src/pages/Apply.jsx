import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useForm as useHookForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import applicationService from '../services/applicationService';
import Loader from '../components/Loader';

import userService from '../services/userService';

export default function Apply() {
  const { internshipId } = useParams();
  const user = userService.getCurrentUser();
  const { register, handleSubmit, reset, formState: { errors } } = useHookForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || ''
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      const formData = new FormData();
      formData.append('internshipId', internshipId);
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('skills', data.skills);
      
      if (data.resume && data.resume[0]) {
        formData.append('resume', data.resume[0]);
      }

      await applicationService.submitApplication(formData);
      
      toast.success('Application submitted successfully!');
      navigate('/my-applications');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
      <div className="p-8 bg-white border border-gray-100 shadow-xl rounded-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Apply for Internship</h1>
          <p className="mt-2 text-gray-600">Join our team and build amazing things together.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              readOnly={!!user}
              {...register('name', { required: 'Name is required' })}
              className={`mt-1 block w-full px-4 py-3 ${user ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-gray-50'} border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none`}
              placeholder="John Doe"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              readOnly={!!user}
              {...register('email', { 
                required: 'Email is required',
                pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' }
              })}
              className={`mt-1 block w-full px-4 py-3 ${user ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-gray-50'} border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
            <input
              type="text"
              {...register('skills', { required: 'Skills are required' })}
              className={`mt-1 block w-full px-4 py-3 bg-gray-50 border ${errors.skills ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none`}
              placeholder="React, Node.js, MongoDB"
            />
            {errors.skills && <p className="mt-1 text-sm text-red-500">{errors.skills.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Resume (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              {...register('resume', { required: 'Resume is required' })}
              className={`mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all ${errors.resume ? 'border-red-500' : ''}`}
            />
            {errors.resume && <p className="mt-1 text-sm text-red-500">{errors.resume.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center w-full px-8 py-4 text-base font-medium text-white transition-all transform rounded-xl bg-primary hover:bg-secondary hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <Loader /> : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}
