import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/user/Home';
import BookDetail from "./components/user/BookDetail";
import Profile from './components/user/Profile';
import AdminHome from './pages/AdminHome';
import AdminBooks from './pages/AdminBooks';
import AdminUsers from './pages/AdminUsers';
import BookAdminDetail from './pages/BookDetail';
import UserAdminDetail from './pages/UserDetail';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import AddBook from './components/admin/AddBook';

function App() {
  return (
<Router>
  <Routes>
    {/* Admin routes */}
    <Route
      path="/admin/home"
      element={<ProtectedRoute requiredRole="ADMIN"><AdminHome /></ProtectedRoute>}
    />
    <Route
      path="/admin/books"
      element={<ProtectedRoute requiredRole="ADMIN"><AdminBooks /></ProtectedRoute>}
    />
    <Route
      path="/admin/users"
      element={<ProtectedRoute requiredRole="ADMIN"><AdminUsers /></ProtectedRoute>}
    />

    {/* User routes */}
    <Route
      path="/home"
      element={<ProtectedRoute requiredRole="USER"><Home /></ProtectedRoute>}
    />
    <Route
      path="/profile"
      element={<ProtectedRoute requiredRole="USER"><Profile /></ProtectedRoute>}
    />

    {/* Shared routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/" element={<Navigate to="/login" />} />
  </Routes>
</Router>

  );
}


export default App;
