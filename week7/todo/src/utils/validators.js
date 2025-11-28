export const validateLogin = (id, pw) => {
  if (!id || !pw) return '아이디와 비밀번호를 입력해주세요.';
  return null;
};

export const validateSignup = (name, phone, id, pw, pw2) => {
  if (!name || !phone || !id || !pw || !pw2) return '모든 필드를 입력해주세요.';
  if (pw !== pw2) return '비밀번호가 일치하지 않습니다.';
  return null;
};
