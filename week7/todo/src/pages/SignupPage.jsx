import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInput } from '../hooks/useInput';
import { usePhoneInput } from '../hooks/usePhoneInput';
import { validateSignup } from '../utils/validators';
import AuthForm from '../context/AuthForm';
import AuthInput from '../context/AuthInput';
import Button from '../components/common/Button';
import { authApi } from '../api/authApi';

export default function SignupPage() {
  const navigate = useNavigate();
  const name = useInput('');
  const phone = usePhoneInput('');
  const id = useInput('');
  const pw = useInput('');
  const pw2 = useInput('');

  const handleSignup = async (e) => {
    e.preventDefault();

    const error = validateSignup(
      name.value,
      phone.value,
      id.value,
      pw.value,
      pw2.value
    );
    if (error) return alert(error);

    try {
      await authApi.register(id.value, pw.value, name.value, phone.rawValue);

      alert('회원가입이 완료되었습니다!');
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AuthForm title="회원가입" onSubmit={handleSignup}>
      <div className="mb-4">
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="text-[#3182f6] font-bold mb-2"
        >
          &lt; 뒤로가기
        </button>
      </div>

      <AuthInput placeholder="이름" {...name} />
      <AuthInput type="tel" placeholder="전화번호" {...phone} />
      <AuthInput placeholder="아이디" {...id} />
      <AuthInput type="password" placeholder="비밀번호" {...pw} />
      <AuthInput type="password" placeholder="비밀번호 확인" {...pw2} />

      <Button type="submit" className="bg-green-600 hover:bg-green-700">
        가입하기
      </Button>
    </AuthForm>
  );
}
