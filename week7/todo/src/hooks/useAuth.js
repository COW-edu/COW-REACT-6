import { useContext } from 'react';
// [수정] 분리된 Context 정의 파일 import
import { AuthContext } from '../context/AuthContextDef';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
