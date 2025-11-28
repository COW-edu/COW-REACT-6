import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Main from './pages/Main.jsx';
import SignUp from './pages/SignUp.jsx';
import ProtectedRoute from './components/protectedRoute.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default App;