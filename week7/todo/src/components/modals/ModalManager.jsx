import React from 'react';
import { useAuth } from '../../hooks/useAuth';

import LoginContent from './LoginContent';
import SignupContent from './SignupContent';
import FindIdContent from './FindIdContent';
import FindPwContent from './FindPwContent';
import EditProfileContent from './EditProfileContent';
import SettingsContent from './SettingsContent';
import InfoContent from './InfoContent';

export default function ModalManager() {
  const { modalType, setModalType, login, updateProfile, currentUser } =
    useAuth();

  if (!modalType) return null;

  const close = () => setModalType(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(33,37,41,0.3)]">
      <div
        className={`relative bg-white p-8 rounded-2xl shadow-xl flex flex-col gap-3 max-h-[80vh] overflow-y-auto dark:bg-[#1e1e1e] dark:text-[#f1f3f5] ${
          modalType === 'info' ? 'w-[400px]' : 'w-[320px]'
        }`}
      >
        <button
          onClick={close}
          className="absolute top-4 right-5 text-xl text-[#868e96] hover:text-black dark:hover:text-white"
        >
          &times;
        </button>

        {modalType === 'login' && (
          <LoginContent login={login} setModalType={setModalType} />
        )}
        {modalType === 'signup' && (
          <SignupContent setModalType={setModalType} />
        )}
        {modalType === 'findId' && (
          <FindIdContent setModalType={setModalType} />
        )}
        {modalType === 'findPw' && (
          <FindPwContent setModalType={setModalType} />
        )}
        {modalType === 'editProfile' && (
          <EditProfileContent
            currentUser={currentUser}
            updateProfile={updateProfile}
            close={close}
          />
        )}
        {/* 다크모드 props 제거 */}
        {modalType === 'settings' && <SettingsContent close={close} />}
        {modalType === 'info' && <InfoContent />}
      </div>
    </div>
  );
}
