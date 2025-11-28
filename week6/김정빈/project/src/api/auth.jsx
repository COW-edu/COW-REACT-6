const BASE_URL = 'http://localhost:8080/api/auth';

export const signUp = async (username, password, email) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, password, email }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || '회원가입 실패');
  }
  return result.data;
};

export const login = async (username, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || '로그인 실패');
  }

  if (result && result.data) {
    const { token, id } = result.data;
    if (token) sessionStorage.setItem('token', token);
    if (id !== undefined && id !== null) sessionStorage.setItem('memberId', String(id));
  }

  return result.data;
};

export const logout = async () => {
  await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('memberId');
};

export const getAuthHeaders = () => {
  const token = sessionStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};
