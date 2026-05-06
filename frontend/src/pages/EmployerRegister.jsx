import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import employerService from '../services/employerService';
import Loader from '../components/Loader';
import { Building } from 'lucide-react';

export default function EmployerRegister() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await employerService.register(data.companyName, data.email, data.password);
      toast.success('Employer registered successfully!');
      navigate('/employer/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10">
            <Building className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Employer Signup</h2>
          <p className="mt-2 text-sm text-gray-600">
            Create an account to post internships
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              {...register('companyName', { required: 'Company name is required' })}
              className={`mt-1 block w-full px-4 py-3 bg-gray-50 border ${errors.companyName ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all`}
            />
            {errors.companyName && <p className="mt-1 text-sm text-red-500">{errors.companyName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Work Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className={`mt-1 block w-full px-4 py-3 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 chars' } })}
              className={`mt-1 block w-full px-4 py-3 bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all`}
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-8 py-4 font-medium text-white transition-all bg-primary hover:bg-secondary rounded-xl disabled:opacity-70"
          >
            {isLoading ? <Loader /> : 'Register Company'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already registered? <Link to="/employer/login" className="font-medium text-primary hover:text-secondary">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
