import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MainLayout, AuthLayout } from './components/layout/Layout';
import TodoPage from './pages/TodoPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useAuth } from './hooks/useAuth';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}

const App = () => {
  // 1. 초기값을 false(화이트 모드)로 고정
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // 2. 컴포넌트가 마운트되자마자 강제로 클래스 제거 (초기화)
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // 현재 상태 저장
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  return (
    <AuthProvider>
      <Routes>
        <Route
          element={
            <MainLayout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <TodoPage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          element={
            <AuthLayout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          }
        >
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
