
import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-book-primary" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M9 4.804A1 1 0 0 0 7.757 4H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2.757A1 1 0 0 0 11 5.195V5h2v12H5V5h2v-.195z" />
          </svg>
          <h1 className="text-xl font-bold text-gray-800">Book Manager</h1>
        </div>
        <div>
          <Link 
            to="/" 
            className="text-book-primary hover:text-book-secondary transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};
