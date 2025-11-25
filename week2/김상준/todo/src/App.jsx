// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import TodoApp from "./TodoApp";
import { setAuthToken } from "./api";

export default function App() {
  const [token, setToken] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [initialized, setInitialized] = useState(false); // ⭐ 초기 로딩 여부

  // ⭐ 앱 첫 로딩 시 localStorage에서 불러와서 상태 + axios 헤더 복원
  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    const savedNickname = localStorage.getItem("nickname");

    if (savedToken) {
      setToken(savedToken);
      setAuthToken(savedToken); // axios Authorization 세팅
    }

    if (savedNickname) {
      setNickname(savedNickname);
    }

    setInitialized(true); // 초기화 완료
  }, []);

  // 💡 초기화 되기 전에는 아무것도 렌더 안 함 (깜빡임 방지용)
  if (!initialized) {
    return null;
    // 혹은 로딩 표시 원하면:
    // return <div>로딩 중...</div>;
  }

  // 로그인 성공 시
  function handleLoginSuccess(accessToken, nickname) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("nickname", nickname);

    setToken(accessToken);
    setNickname(nickname);

    setAuthToken(accessToken); // axios 헤더 설정
  }

  // 로그아웃
  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("nickname");

    setToken(null);
    setNickname(null);

    setAuthToken(null); // axios 헤더 제거
  }

  return (
    <Routes>
      {/* ⭐ 이미 로그인 상태에서 /login 들어오면 / 로 다시 보내기 */}
      <Route
        path="/login"
        element={
          token ? (
            <Navigate to="/" />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )
        }
      />

      <Route path="/register" element={<Register />} />

      {/* 메인: 토큰 없으면 /login 으로, 있으면 TodoApp */}
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

      {/* 그 외 모든 경로 → /로 리다이렉트 (선택) */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
