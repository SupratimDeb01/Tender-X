import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo (2).png';
import UserSignOutCard from '../cards/UserSignOutCard';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={`fixed top-0 z-50 w-full transition-all  ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50' : 'bg-white border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} className="h-25 mt-2 w-auto" alt="NexSCM Logo" />
        </Link>

        <UserSignOutCard />
      </div>
    </div>
  );
};

export default Navbar;
