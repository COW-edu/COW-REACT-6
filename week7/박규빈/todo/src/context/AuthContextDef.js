import { createContext } from 'react';

// Context 객체만 따로 정의하여 Fast Refresh 오류 방지
export const AuthContext = createContext(null);
