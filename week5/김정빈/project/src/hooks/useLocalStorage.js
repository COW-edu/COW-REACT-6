import { useEffect, useState } from 'react';

// 로컬스토리지와 동기화되는 범용 상태 훅
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return typeof initialValue === 'function' ? initialValue() : initialValue;
      // JSON.parse 실패 시(순수 문자열 저장 케이스) 원본 문자열 반환
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    } catch {
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // 저장 실패는 조용히 무시
    }
  }, [key, value]);

  return [value, setValue];
}
