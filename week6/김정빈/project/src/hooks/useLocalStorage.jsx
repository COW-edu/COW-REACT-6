import { useEffect, useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return typeof initialValue === 'function' ? initialValue() : initialValue;
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
