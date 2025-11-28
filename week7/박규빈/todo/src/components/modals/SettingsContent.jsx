import React, { useState } from 'react';

export default function SettingsContent({ close }) {
  const [autoSave, setAutoSave] = useState(
    localStorage.getItem('autoSaveAlert') === 'true'
  );

  const save = () => {
    localStorage.setItem('autoSaveAlert', autoSave);
    alert('설정이 저장되었습니다.');
    close();
  };

  return (
    <>
      <h3 className="text-xl font-bold mb-2">시스템 설정</h3>
      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={autoSave}
          onChange={(e) => setAutoSave(e.target.checked)}
        />{' '}
        자동 저장 알림
      </label>
      <button
        onClick={save}
        className="w-full p-3 bg-[#3182f6] text-white rounded-xl font-bold"
      >
        저장
      </button>
    </>
  );
}
