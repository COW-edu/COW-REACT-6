// src/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./api";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    try {
      await api.post("/auth/register", { email, nickname, password });
      alert("회원가입이 완료되었습니다!");
      navigate("/login");
    } catch (err) {
      alert("회원가입 실패: " + err.response?.data?.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50 p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-2xl font-semibold mb-6">회원가입</h1>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">이메일</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">닉네임</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">비밀번호</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-slate-800 text-white hover:opacity-95"
          >
            가입하기
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-slate-500">
          이미 계정이 있나요?{" "}
          <Link to="/login" className="text-slate-800 font-semibold">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
