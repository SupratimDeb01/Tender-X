import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import Modals from '../components/Modals';
import SignInPage from './Auth/SignInPage';
import SignUpPage from './Auth/SignUpPage';
import UserSignOutCard from "../components/cards/UserSignOutCard";
import Button from '../components/ui/Button';
import logo from '../assets/logo (2).png';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("sign-in");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCTA = () => {
    if (user?.token) {
      if (user.role === "supplier") {
        navigate("/dashboard/supplier");
      } else if (user.role === "manufacturer") {
        navigate("/dashboard/manufacturer");
      } else {
        navigate("/dashboard");
      }
    } else {
      setOpenAuthModal(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header 
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Assuming logo is an image, if it's text we can style it */}
            <img src={logo} alt="NexSCM Logo" className="h-25 w-auto mt-2" />
          </div>
          
          <div>
            {user ? (
              <UserSignOutCard />
            ) : (
              <Button 
                variant="outline" 
                size="md" 
                onClick={() => setOpenAuthModal(true)}
                className="gap-2"
              >
                Sign In <FaUser className="text-xs" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center relative z-10 pt-15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-8">
          
          <div className="animate-fade-in space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Empowering You to <br />
              <span className="text-gradient">Make Smarter Decisions</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Create tenders, compare supplier bids, auto-generate POs, and verify invoices — all in one platform, built for speed and simplicity.
            </p>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Button 
              variant="primary" 
              size="lg" 
              onClick={handleCTA}
              className="gap-2 text-lg px-8 py-4 shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transform hover:-translate-y-1 transition-all"
            >
              Get Started <MdKeyboardDoubleArrowRight className="text-xl" />
            </Button>
          </div>

          {/* Feature Pills (Optional visual enhancement) */}
          <div className="flex flex-wrap justify-center gap-4 mt-1 animate-fade-in opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            {['Smart Procurement', 'Real-time Analytics', 'Seamless Collaboration'].map((feature, i) => (
              <span key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 shadow-sm">
                {feature}
              </span>
            ))}
          </div>

        </div>
      </main>

      {/* Auth Modal */}
      <Modals
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("sign-in");
        }}
        hideHeader
      >
        <div className="p-1">
          {currentPage === "sign-in" && (<SignInPage setCurrentPage={setCurrentPage} />)}
          {currentPage === "sign-up" && (<SignUpPage setCurrentPage={setCurrentPage} />)}
        </div>
      </Modals>
    </div>
  );
};

export default LandingPage;
