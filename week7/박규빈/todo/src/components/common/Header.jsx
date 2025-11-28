import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { currentUser, logout, setModalType } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/signup';

  const handleLoginClick = () => {
    if (currentUser) {
      if (confirm('로그아웃 하시겠습니까?')) {
        logout();
        alert('로그아웃 되었습니다.');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  };

  if (isAuthPage) return null;

  return (
    // [수정] fixed w-full로 변경하여 상단 바 형태로 고정
    <header className="fixed top-0 left-0 w-full flex justify-end items-center p-4 z-50 pointer-events-none">
      {/* pointer-events-none을 쓴 이유: 
         헤더 영역 전체가 클릭을 막지 않게 하고, 버튼들만 클릭되게 하기 위함 
      */}

      <div className="flex items-center gap-3 pointer-events-auto bg-white/80 dark:bg-black/50 backdrop-blur-sm p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
        <button
          onClick={handleLoginClick}
          className="px-4 py-2 bg-[#3182f6] text-white font-bold rounded-xl text-sm hover:bg-[#1c64f2] transition"
        >
          {currentUser ? '로그아웃' : '로그인'}
        </button>

        {currentUser && (
          <span
            className="font-bold cursor-pointer px-2 text-gray-700 dark:text-[#f1f3f5] hover:text-[#3182f6] transition"
            onClick={() => setModalType('editProfile')}
          >
            {currentUser.name} 님
          </span>
        )}

        <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-1"></div>

        <button
          onClick={() => setModalType('settings')}
          className="text-xl p-1 text-[#495057] hover:text-[#3182f6] dark:text-[#f1f3f5] transition"
        >
          ⚙️
        </button>
        <button
          onClick={() => setModalType('info')}
          className="text-xl p-1 text-[#495057] hover:text-[#3182f6] dark:text-[#f1f3f5] transition"
        >
          ℹ️
        </button>
      </div>
    </header>
  );
}
