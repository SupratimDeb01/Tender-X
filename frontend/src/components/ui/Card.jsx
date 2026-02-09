import React from 'react';

const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <div 
      className={`
        bg-white rounded-xl border border-slate-100 shadow-sm 
        ${hover ? 'hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer' : ''} 
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
