import React, { useEffect, useState } from 'react';
import { MdClose } from "react-icons/md";

const Modals = ({
  children,
  isOpen,
  onClose,
  title,
  hideHeader = false,
  showActionButton = false,
  actionBtnIcon = null,
  actionBtnText = '',
  onActionClick = () => {},
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className={`
          relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 
          transform transition-all duration-300 
          ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
        `}
      >
        {/* Header */}
        {!hideHeader && (
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            {showActionButton && (
              <button
                onClick={onActionClick}
                className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                {actionBtnIcon}
                {actionBtnText}
              </button>
            )}
          </div>
        )}

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
        >
          <MdClose className="text-xl" />
        </button>

        {/* Content */}
        <div className="max-h-[80vh] overflow-y-auto custom-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modals;
