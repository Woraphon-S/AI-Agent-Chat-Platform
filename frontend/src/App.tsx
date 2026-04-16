import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth.store';
import { Toaster } from 'sonner';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';

import { useThemeStore } from './store/theme.store';

const App: React.FC = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const theme = useThemeStore(state => state.theme);

  React.useEffect(() => {
    // Apply initial theme
    const currentTheme = useThemeStore.getState().theme;
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
