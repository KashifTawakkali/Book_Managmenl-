
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/views/Home/Layout';
import { Dashboard } from '@/views/Home/Dashboard';
import NotFound from '@/pages/NotFound';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
