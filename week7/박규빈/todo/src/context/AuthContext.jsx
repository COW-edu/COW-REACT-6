import React, { useState } from 'react';
import { AuthContext } from './AuthContextDef';
import { authApi } from '../api/authApi';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [modalType, setModalType] = useState(null);

  const login = async (userId, pw) => {
    try {
      const data = await authApi.login(userId, pw);
      setCurrentUser(data.user);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateProfile = (newName, newPhone, newPw) => {
    if (!currentUser) return false;

    const updatedUser = { ...currentUser, name: newName, phone: newPhone };
    if (newPw) updatedUser.password = newPw;

    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        updateProfile,
        modalType,
        setModalType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
