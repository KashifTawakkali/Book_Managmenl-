
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Components/Navbar';

export const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="py-4 bg-white border-t">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Book Manager - All rights reserved
        </div>
      </footer>
    </div>
  );
};
