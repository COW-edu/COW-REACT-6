import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import ModalManager from '../modals/ModalManager';

// 1. 메인 레이아웃 (헤더 O)
export const MainLayout = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <div className="relative min-h-screen bg-[#f9fafb] dark:bg-[#121212]">
      {/* 헤더 */}
      <Header />

      {/* 자식 라우트(페이지)가 렌더링되는 위치 */}
      <Outlet />

      {/* 모달 (전역 설정, 정보 수정 등) */}
      <ModalManager isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </div>
  );
};

// 2. 인증 레이아웃 (헤더 X, 배경색 변경 가능)
export const AuthLayout = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-[#121212]">
      {/* 헤더 없음 */}

      <Outlet />

      {/* 로그인 페이지에서도 아이디/비번 찾기 모달이 필요하므로 포함 */}
      <ModalManager isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </div>
  );
};
