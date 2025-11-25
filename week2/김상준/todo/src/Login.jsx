// src/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { setAuthToken } from "./api";

export default function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });
      const { accessToken, nickname } = res.data.data;

      setAuthToken(accessToken);

      // App.jsx에게 로그인 성공 알림
      onLoginSuccess(accessToken, nickname);

      // ⭐ 가장 중요! — URL을 "/"로 이동시켜 TodoApp 렌더링되게 함
      navigate("/");

    } catch (err) {
      console.error("로그인 오류:", err);
      alert("로그인 실패");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50 p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-2xl font-semibold mb-6">로그인</h1>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium mb-1">이메일</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">비밀번호</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-slate-800 text-white"
          >
            로그인
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-slate-500">
          아직 계정이 없나요?{" "}
          <Link to="/register" className="text-slate-800 font-semibold">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
