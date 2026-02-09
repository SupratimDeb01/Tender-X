import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  // Show loader while fetching user
  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-slate-50 text-slate-600 font-medium">
      Loading...
    </div>
  );

  // Redirect if user not logged in
  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12'>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
