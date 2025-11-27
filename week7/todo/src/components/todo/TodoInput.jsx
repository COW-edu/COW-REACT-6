import React, { useState } from 'react';
// [수정] 경로 변경
import { useAuth } from '../../hooks/useAuth';

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const { currentUser, setModalType } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('로그인 후에 할 일을 추가할 수 있습니다.');
      setModalType('login');
      return;
    }
    if (!text.trim()) return;
    onAdd(text, category);
    setText('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-3 text-base border border-[#dee2e6] rounded-xl bg-[#f1f3f5] dark:bg-[#2c2c2c] dark:border-[#444] dark:text-[#f1f3f5]"
        required
      />
      <input
        type="text"
        placeholder="카테고리"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-[120px] p-3 text-sm border border-[#dee2e6] rounded-xl bg-[#f1f3f5] dark:bg-[#2c2c2c] dark:border-[#444] dark:text-[#f1f3f5]"
      />
      <button
        type="submit"
        className="px-4 py-3 bg-[#3182f6] text-white rounded-xl font-bold hover:bg-[#1c64f2]"
      >
        추가
      </button>
    </form>
  );
}
