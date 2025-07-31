import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './components/common/ProtectedRoute';

// Public Pages
import Landing from './pages/public/Landing';
import UnlockPoem from './pages/public/UnlockPoem';
import PoemView from './pages/public/PoemView';
import ThankYou from './pages/public/ThankYou';

// Admin Pages
import Login from './pages/admin/Login';
import Register from './pages/admin/Register';
import Dashboard from './pages/admin/Dashboard';
import AddPoem from './pages/admin/AddPoem';
import EditPoem from './pages/admin/EditPoem';
import ViewFeedback from './pages/admin/ViewFeedback';
import Analytics from './pages/admin/Analytics';

const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<Landing />} />
    <Route path="/unlock/:id" element={<UnlockPoem />} />
    <Route path="/poem/:id" element={<PoemView />} />
    <Route path="/thank-you" element={<ThankYou />} />

    {/* Admin Public */}
    <Route path="/admin/login" element={<Login />} />
    <Route path="/admin/register" element={<Register />} />

    {/* Admin Protected Routes */}
    <Route path="/admin/dashboard" element={
      <ProtectedRoute><Dashboard /></ProtectedRoute>
    } />
    <Route path="/admin/dashboard/add" element={
      <ProtectedRoute><AddPoem /></ProtectedRoute>
    } />
    <Route path="/admin/dashboard/edit/:id" element={
      <ProtectedRoute><EditPoem /></ProtectedRoute>
    } />
    <Route path="/admin/feedback" element={
      <ProtectedRoute><ViewFeedback /></ProtectedRoute>
    } />
    <Route path="/admin/analytics" element={
      <ProtectedRoute><Analytics /></ProtectedRoute>
    } />

    {/* Redirect unknown routes */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
