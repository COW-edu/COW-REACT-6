const BASE_URL = 'http://localhost:5000';

export const authApi = {
  // 회원가입
  register: async (userId, password, name, phone) => {
    const checkResponse = await fetch(`${BASE_URL}/users?id=${userId}`);
    const existingUsers = await checkResponse.json();

    if (existingUsers.length > 0) {
      throw new Error('이미 존재하는 아이디입니다.');
    }

    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userId,
        password,
        name,
        phone,
      }),
    });

    if (!response.ok) {
      throw new Error('회원가입 실패');
    }

    return await response.json();
  },

  // 로그인
  login: async (userId, password) => {
    const response = await fetch(
      `${BASE_URL}/users?id=${userId}&password=${password}`
    );
    const users = await response.json();

    if (users.length === 0) {
      throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
    }

    return {
      token: 'mock-jwt-token-server-side',
      user: users[0],
    };
  },
};
