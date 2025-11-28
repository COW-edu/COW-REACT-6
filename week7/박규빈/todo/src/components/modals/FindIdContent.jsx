import React, { useState } from 'react';
import { formatPhoneNumber } from '../../utils/formatters';

export default function FindIdContent({ setModalType }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // 전화번호 입력 핸들러 (하이픈 포맷팅)
  const handlePhoneChange = (e) => {
    const { formatted } = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const find = async () => {
    // 1. JSON Server에서 모든 유저 가져오기
    try {
      const response = await fetch('http://localhost:5000/users');
      const users = await response.json();

      // 2. 입력한 전화번호에서 하이픈 제거 후 비교
      const cleanPhone = phone.replace(/[^0-9]/g, '');

      const user = users.find((u) => u.name === name && u.phone === cleanPhone);

      if (user) {
        alert(`회원님의 아이디는 [ ${user.id} ] 입니다.`);
        setModalType(null);
      } else {
        alert('일치하는 정보가 없습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('서버 통신 오류');
    }
  };

  return (
    <>
      <h3 className="text-xl font-bold">아이디 찾기</h3>
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
      <button
        onClick={find}
        className="p-3 bg-[#3182f6] text-white rounded-xl font-bold"
      >
        찾기
      </button>
    </>
  );
}
