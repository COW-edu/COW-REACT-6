// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import TodoApp from "./TodoApp";

export default function App() {
  const [token, setToken] = useState(null);
  const [nickname, setNickname] = useState(null);

  // 앱 첫 로딩 시 localStorage에서 불러오기
  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    const savedNickname = localStorage.getItem("nickname");

    if (savedToken) setToken(savedToken);
    if (savedNickname) setNickname(savedNickname);
  }, []);

  // 로그인 성공 시
  function handleLoginSuccess(accessToken, nickname) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("nickname", nickname);

    setToken(accessToken);
    setNickname(nickname);
  }

  // 로그아웃
  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("nickname");

    setToken(null);
    setNickname(null);
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login onLoginSuccess={handleLoginSuccess} />}
      />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          token ? (
            <TodoApp nickname={nickname} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}
