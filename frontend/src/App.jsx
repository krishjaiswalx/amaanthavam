import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Apply from './pages/Apply';
import Login from './pages/Login';
import EmployerDashboard from './pages/Dashboard';
import EmployerRegister from './pages/EmployerRegister';
import EmployerLogin from './pages/EmployerLogin';
import CreateInternship from './pages/CreateInternship';
import Register from './pages/Register';
import UserLogin from './pages/UserLogin';
import MyApplications from './pages/MyApplications';
import authService from './services/authService';
import userService from './services/userService';
import employerService from './services/employerService';

const ProtectedAdminRoute = ({ children }) => {
  const admin = authService.getCurrentAdmin();
  if (!admin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const ProtectedEmployerRoute = ({ children }) => {
  const employer = employerService.getCurrentEmployer();
  if (!employer) {
    return <Navigate to="/employer/login" replace />;
  }
  return children;
};

const ProtectedUserRoute = ({ children }) => {
  const user = userService.getCurrentUser();
  if (!user) {
    return <Navigate to="/user-login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/register" element={<Register />} />
            <Route path="/user-login" element={<UserLogin />} />
            
            <Route path="/employer/register" element={<EmployerRegister />} />
            <Route path="/employer/login" element={<EmployerLogin />} />
            
            <Route path="/login" element={<Login />} />
            
            <Route
              path="/apply/:internshipId"
              element={
                <ProtectedUserRoute>
                  <Apply />
                </ProtectedUserRoute>
              }
            />
            
            <Route
              path="/my-applications"
              element={
                <ProtectedUserRoute>
                  <MyApplications />
                </ProtectedUserRoute>
              }
            />
            
            <Route
              path="/employer/dashboard"
              element={
                <ProtectedEmployerRoute>
                  <EmployerDashboard />
                </ProtectedEmployerRoute>
              }
            />

            <Route
              path="/employer/create-internship"
              element={
                <ProtectedEmployerRoute>
                  <CreateInternship />
                </ProtectedEmployerRoute>
              }
            />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
