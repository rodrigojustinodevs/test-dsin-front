import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Login } from '../pages/Login';

import { useNavigate } from 'react-router-dom';

export const AuthRouterPublic = () => {
  const navigate = useNavigate();

  // Use o useEffect para redirecionar apenas na montagem do componente
  useEffect(() => {
    navigate('/login');
  }, [navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};