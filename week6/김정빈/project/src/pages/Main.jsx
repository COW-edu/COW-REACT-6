import { Link } from 'react-router-dom';

export default function Main() {
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">환영합니다 — Todo 앱</h1>
      <p className="mb-6">간단한 일정 관리 앱입니다. 아래 버튼으로 이동하세요.</p>

      {!token && (
        <div className="flex gap-3">
          <Link to="/login" className="px-4 py-2 bg-indigo-600 text-white rounded">로그인</Link>
          <Link to="/register" className="px-4 py-2 border rounded">회원가입</Link>
        </div>
      )}

      {token && (
        <div className="flex gap-3">
          <Link to="/dashboard" className="px-4 py-2 bg-green-600 text-white rounded">내 Todo 보기</Link>
        </div>
      )}
    </div>
  );
}
