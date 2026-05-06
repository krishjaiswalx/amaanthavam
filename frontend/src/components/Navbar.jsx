import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, FileText, Building, Menu, X } from 'lucide-react';
import authService from '../services/authService';
import userService from '../services/userService';
import employerService from '../services/employerService';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const admin = authService.getCurrentAdmin();
  const user = userService.getCurrentUser();
  const employer = employerService.getCurrentEmployer();

  const handleLogout = () => {
    setIsOpen(false);
    if (admin) authService.logout();
    if (user) userService.logout();
    if (employer) employerService.logout();
    navigate('/');
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-50 rounded-lg">
                <img 
                  src="/logo.png" 
                  alt="Amaanitvam Logo" 
                  className="object-contain w-full h-full" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.display = 'none';
                  }} 
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-primary">
                Amaanitvam Foundation
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {employer ? (
              <>
                <Link
                  to="/employer/dashboard"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-colors rounded-md hover:text-primary"
                >
                  <LayoutDashboard size={16} className="mr-2" />
                  Employer Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </>
            ) : admin ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-colors rounded-md hover:text-primary"
                >
                  <LayoutDashboard size={16} className="mr-2" />
                  Admin Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </>
            ) : user ? (
              <>
                <Link
                  to="/my-applications"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-colors rounded-md hover:text-primary"
                >
                  <FileText size={16} className="mr-2" />
                  My Applications
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 focus:outline-none"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/employer/login"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-colors rounded-md hover:text-primary"
                >
                  <Building size={16} className="mr-1" />
                  For Employers
                </Link>
                <Link
                  to="/user-login"
                  className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors rounded-md hover:text-primary border border-gray-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="flex items-center px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 text-gray-400 transition-colors rounded-lg hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block w-6 h-6" /> : <Menu className="block w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top-2 duration-200`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {employer ? (
            <>
              <Link
                to="/employer/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-3 text-base font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-primary"
              >
                <LayoutDashboard size={18} className="mr-3" />
                Employer Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-3 text-base font-medium text-red-600 rounded-md hover:bg-red-50"
              >
                <LogOut size={18} className="mr-3" />
                Logout
              </button>
            </>
          ) : admin ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-3 text-base font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-primary"
              >
                <LayoutDashboard size={18} className="mr-3" />
                Admin Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-3 text-base font-medium text-red-600 rounded-md hover:bg-red-50"
              >
                <LogOut size={18} className="mr-3" />
                Logout
              </button>
            </>
          ) : user ? (
            <>
              <Link
                to="/my-applications"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-3 text-base font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-primary"
              >
                <FileText size={18} className="mr-3" />
                My Applications
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-3 text-base font-medium text-red-600 rounded-md hover:bg-red-50"
              >
                <LogOut size={18} className="mr-3" />
                Logout
              </button>
            </>
          ) : (
            <div className="space-y-2 py-2">
              <Link
                to="/employer/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-3 text-base font-medium text-gray-700 rounded-md hover:bg-gray-50"
              >
                <Building size={18} className="mr-3" />
                For Employers
              </Link>
              <Link
                to="/user-login"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-3 text-base font-medium text-gray-700 rounded-md hover:bg-gray-50"
              >
                Sign In
              </Link>
              <div className="px-3 pt-2">
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-white rounded-xl bg-primary hover:bg-secondary"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
