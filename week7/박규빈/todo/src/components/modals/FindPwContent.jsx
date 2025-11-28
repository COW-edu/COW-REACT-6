import React, { useState } from 'react';
import { formatPhoneNumber } from '../../utils/formatters';

export default function FindPwContent({ setModalType }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (e) => {
    const { formatted } = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const find = async () => {
    try {
      const response = await fetch('http://localhost:5000/users');
      const users = await response.json();

      const cleanPhone = phone.replace(/[^0-9]/g, '');

      const user = users.find(
        (u) => u.id === id && u.name === name && u.phone === cleanPhone
      );

      if (user) {
        alert(`회원님의 비밀번호는 [ ${user.password} ] 입니다.`);
        setModalType(null);
      } else {
        alert('일치하는 정보가 없습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('서버 오류 발생');
    }
  };

  return (
    <>
      <h3 className="text-xl font-bold">비밀번호 찾기</h3>
      <input
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="p-3 border rounded-xl dark:bg-[#2c2c2c] dark:border-[#444]"
      />
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
