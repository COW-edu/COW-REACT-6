import React, { useState } from 'react';

export default function LoginContent({ login, setModalType }) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleLogin = () => {
    // login 함수는 비동기(async)일 수 있으므로 필요시 await 처리 가능
    // 여기서는 간단히 호출 결과로 분기 처리
    login(id, pw).then((success) => {
      if (success) {
        alert('로그인 성공!');
        setModalType(null);
      } else {
        // 실패 메시지는 AuthContext 등에서 처리하거나 여기서 처리
      }
    });
  };

  return (
    <>
      <h3 className="text-xl font-bold mb-2">로그인</h3>
      <input
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="p-3 border rounded-xl dark:bg-[#2c2c2c] dark:border-[#444]"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        className="p-3 border rounded-xl dark:bg-[#2c2c2c] dark:border-[#444]"
      />
      <button
        onClick={handleLogin}
        className="p-3 bg-[#3182f6] text-white rounded-xl font-bold hover:bg-[#1c64f2]"
      >
        로그인
      </button>
      <div className="text-center text-[13px] text-[#3182f6] space-x-2">
        <span onClick={() => setModalType('findId')} className="cursor-pointer">
          아이디 찾기
        </span>
        |
        <span onClick={() => setModalType('findPw')} className="cursor-pointer">
          비밀번호 찾기
        </span>
        |
        <span onClick={() => setModalType('signup')} className="cursor-pointer">
          회원가입
        </span>
      </div>
    </>
  );
}
