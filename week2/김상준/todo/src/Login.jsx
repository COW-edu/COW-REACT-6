import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [nickname, setNickname] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = nickname.trim();
    if (!trimmed) return alert("닉네임을 입력해주세요!");
    localStorage.setItem("nickname", trimmed);
    onLogin(trimmed); // ✅ 문자열만 전달해야 함
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white shadow-lg p-8 rounded-2xl w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-4 text-center">Todo 로그인</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)} // ✅ 여기서도 value만 저장
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:opacity-90"
          >
            시작하기
          </button>
        </form>
      </div>
    </div>
  );
}
