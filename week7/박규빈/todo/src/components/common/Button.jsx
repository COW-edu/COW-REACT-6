import React from 'react';

export default function Button({
  children,
  onClick,
  type = 'button',
  className = '',
}) {
  // 기존 Tailwind 스타일 유지 + 추가 클래스 병합
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-2 rounded-lg font-bold transition duration-200 text-white bg-[#3182f6] hover:bg-[#1c64f2] ${className}`}
    >
      {children}
    </button>
  );
}
