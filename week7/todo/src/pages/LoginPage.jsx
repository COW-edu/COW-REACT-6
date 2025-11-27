import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useInput } from '../hooks/useInput';
import AuthForm from '../context/AuthForm';
import AuthInput from '../context/AuthInput';
import Button from '../components/common/Button';

export default function LoginPage() {
  const idInput = useInput('');
  const pwInput = useInput('');
  const { login, setModalType } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e?.preventDefault();

    const success = await login(idInput.value, pwInput.value);

    if (success) {
      alert('로그인 성공!');
      navigate('/dashboard');
    }
  };

  return (
    <AuthForm title="로그인" onSubmit={handleLogin}>
      <AuthInput placeholder="아이디" {...idInput} />
      <AuthInput
        type="password"
        placeholder="비밀번호"
        {...pwInput}
        onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
      />

      <Button type="submit">로그인하기</Button>

      <div className="mt-4 text-center text-sm text-[#3182f6] space-x-2 cursor-pointer">
        <span onClick={() => setModalType('findId')}>아이디 찾기</span>|
        <span onClick={() => setModalType('findPw')}>비밀번호 찾기</span>|
        <span onClick={() => navigate('/signup')}>회원가입</span>
      </div>
    </AuthForm>
  );
}
