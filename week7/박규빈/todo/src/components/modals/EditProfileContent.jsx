import React, { useState } from 'react';
import { formatPhoneNumber } from '../../utils/formatters';

export default function EditProfileContent({
  currentUser,
  updateProfile,
  close,
}) {
  const [name, setName] = useState(currentUser?.name || '');

  // 초기값 포맷팅
  const [phone, setPhone] = useState(
    currentUser?.phone ? formatPhoneNumber(currentUser.phone).formatted : ''
  );

  const [pw, setPw] = useState('');

  const handlePhoneChange = (e) => {
    const { formatted } = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const handleSave = () => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (updateProfile(name, cleanPhone, pw)) {
      alert('수정 완료');
      close();
    }
  };

  return (
    <>
      <h3 className="text-xl font-bold mb-4">회원정보 수정</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
        className="w-full p-3 border rounded-xl mb-2 dark:bg-[#2c2c2c] dark:border-[#444]"
      />
      <input
        type="tel"
        value={phone}
        onChange={handlePhoneChange}
        maxLength={13}
        placeholder="전화번호"
        className="w-full p-3 border rounded-xl mb-2 dark:bg-[#2c2c2c] dark:border-[#444]"
      />
      <input
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        type="password"
        placeholder="새 비밀번호 (변경 시 입력)"
        className="w-full p-3 border rounded-xl mb-4 dark:bg-[#2c2c2c] dark:border-[#444]"
      />
      <button
        onClick={handleSave}
        className="w-full p-3 bg-[#3182f6] text-white rounded-xl font-bold mb-2"
      >
        저장
      </button>
    </>
  );
}
