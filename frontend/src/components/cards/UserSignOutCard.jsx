import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";
import { toast } from "react-hot-toast";

const UserSignOutCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSignOut = () => {
    console.log("Signing out... Clearing storage.");
    localStorage.removeItem("token");
    localStorage.clear();
    clearUser();
    toast.dismiss(); 
    // Force a hard reload to ensure all states are cleared
    window.location.replace("/"); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 p-1.5 rounded-full hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 border border-indigo-200 overflow-hidden">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="hidden sm:flex flex-col items-start mr-1">
            <span className="text-sm font-semibold text-slate-700 leading-none">{user.name}</span>
            <span className="text-xs text-slate-500 capitalize">{user.role}</span>
          </div>
          
          <FiChevronDown className={`text-slate-400 transition-transform duration-200 hidden sm:block ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        <div 
          className={`
            absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2
            transform transition-all duration-200 origin-top-right z-50
            ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
          `}
        >
          <div className="px-4 py-3 border-b border-slate-100 sm:hidden">
            <p className="text-sm font-semibold text-slate-900">{user.name}</p>
            <p className="text-xs text-slate-500 capitalize">{user.role}</p>
          </div>

          <div className="px-2 py-1">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FiLogOut className="text-lg" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSignOutCard;
