import React, { useState } from 'react';
import { authApi } from '../../api/authApi';
import { formatPhoneNumber } from '../../utils/formatters';
import { validateSignup } from '../../utils/validators';

export default function SignupContent({ setModalType }) {
  // 상태 관리로 변경 (실시간 포맷팅을 위해 필요)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');

  const handlePhoneChange = (e) => {
    const { formatted } = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const handleSignup = async () => {
    // 1. 유효성 검사
    const error = validateSignup(name, phone, id, pw, pw2);
    if (error) return alert(error);

    try {
      // 2. 서버 전송 시 하이픈 제거
      const cleanPhone = phone.replace(/[^0-9]/g, '');

      await authApi.register(id, pw, name, cleanPhone);

      alert('회원가입 완료! 로그인 해주세요.');
      setModalType('login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <h3 className="text-xl font-bold mb-2">회원가입</h3>
      <input
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-3 border rounded-xl dark:bg-[#2c2c2c] dark:border-[#444]"
      />
      <input
        type="tel"
        placeholder="전화번호"
        value={phone}
        onChange={handlePhoneChange}
        maxLength={13}
        className="p-3 border rounded-xl dark:bg-[#2c2c2c] dark:border-[#444]"
      />
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
        className="p-3 border rounded-xl dark:bg-[#2c2c2c] dark:border-[#444]"
      />
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={pw2}
        onChange={(e) => setPw2(e.target.value)}
        className="p-3 border rounded-xl dark:bg-[#2c2c2c] dark:border-[#444]"
      />
      <button
        onClick={handleSignup}
        className="p-3 bg-[#3182f6] text-white rounded-xl font-bold hover:bg-[#1c64f2]"
      >
        가입하기
      </button>
    </>
  );
}
