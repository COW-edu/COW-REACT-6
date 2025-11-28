import React, { useState } from 'react';
import { formatPhoneNumber } from '../../utils/formatters';

export default function InfoContent() {
  const [showFeatures, setShowFeatures] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);

  // 요청사항 폼 상태 관리
  const [reqName, setReqName] = useState('');
  const [reqPhone, setReqPhone] = useState('');
  const [reqMsg, setReqMsg] = useState('');

  // 전화번호 포맷팅 핸들러
  const handlePhoneChange = (e) => {
    const { formatted } = formatPhoneNumber(e.target.value);
    setReqPhone(formatted);
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    if (!reqName || !reqMsg) return alert('이름과 요청사항을 입력해주세요.');

    try {
      // 전송 시 하이픈 제거 (선택 사항, 여기서는 제거 후 전송)
      const cleanPhone = reqPhone.replace(/[^0-9]/g, '');

      // json-server에 요청사항 저장 (POST 요청)
      await fetch('http://localhost:5000/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: crypto.randomUUID(),
          name: reqName,
          phone: cleanPhone,
          message: reqMsg,
          date: new Date().toISOString(), // 작성 시간
        }),
      });

      alert('소중한 의견이 전달되었습니다. 감사합니다! 🙇‍♂️');
      setReqName('');
      setReqPhone('');
      setReqMsg('');
      setShowRequestForm(false); // 폼 닫기
    } catch (error) {
      console.error(error);
      alert('전송 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="text-sm text-[#495057] dark:text-[#ced4da] leading-relaxed space-y-6">
      <h3 className="text-xl font-bold mb-4 text-[#212529] dark:text-[#f1f3f5]">
        사이트 안내
      </h3>

      {/* 1. 사이트 목적 & 저장 방식 */}
      <section className="space-y-4">
        <div>
          <h4 className="flex items-center gap-2 font-bold text-[#212529] dark:text-[#f1f3f5] mb-2">
            <span className="text-lg">📌</span> 사이트 목적
          </h4>
          <p className="pl-1">
            이 사이트는 사용자의 일정을 직관적으로 기록하고 관리할 수 있도록
            돕는
            <strong> 할 일(To-Do) 관리 플랫폼</strong>입니다.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-[#1a2332] p-4 rounded-xl border border-blue-100 dark:border-[#2c2c2c]">
          <h4 className="flex items-center gap-2 font-bold text-[#212529] dark:text-[#f1f3f5] mb-2">
            <span className="text-lg">🔒</span> 데이터 저장 방식 (Server)
          </h4>
          <p>
            이 사이트는 <strong>REST API 서버(JSON Server)</strong>와 통신하여
            데이터를 관리합니다.
            <br className="mb-2" />
            모든 데이터는{' '}
            <code className="bg-white dark:bg-[#2c2c2c] px-1 py-0.5 rounded border border-gray-200 dark:border-gray-600 font-mono text-xs">
              db.json
            </code>{' '}
            데이터베이스 파일에 안전하게 저장되며, 새로고침이나 재접속 시에도
            서버로부터 최신 데이터를 받아와 유지됩니다.
          </p>
        </div>
      </section>

      <hr className="border-gray-200 dark:border-gray-700" />

      {/* 2. 기능별 상세 설명 (토글 - 아코디언 스타일) */}
      <section>
        <button
          onClick={() => setShowFeatures(!showFeatures)}
          className={`w-full flex justify-between items-center p-4 rounded-xl font-bold transition-all duration-200 ${
            showFeatures
              ? 'bg-[#3182f6] text-white shadow-md'
              : 'bg-gray-100 dark:bg-[#2c2c2c] text-[#495057] dark:text-[#f1f3f5] hover:bg-gray-200 dark:hover:bg-[#383838]'
          }`}
        >
          <span className="flex items-center gap-2">🛠️ 기능별 상세 설명</span>
          <span
            className={`transform transition-transform duration-200 ${
              showFeatures ? 'rotate-180' : ''
            }`}
          >
            ▼
          </span>
        </button>

        {showFeatures && (
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 animate-fade-in-down">
            {[
              '✅ 할 일 완료/취소선',
              '⭐ 중요 표시/필터링',
              '📅 캘린더 연동 관리',
              '✏️ 날짜 직접 입력 추가',
              '📂 카테고리 필터/통계',
              '📊 월간 요약 차트',
              '👤 회원 정보 수정',
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex justify-center items-center gap-2 p-3 bg-white dark:bg-[#1e1e1e] rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm text-xs font-medium text-center hover:bg-gray-50 dark:hover:bg-[#2c2c2c] transition-colors cursor-default"
              >
                {feature}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. 개발자 소개 (깃허브 + 인스타 + 호버 효과) */}
      <section>
        <h4 className="font-bold text-[#212529] dark:text-[#f1f3f5] mb-2">
          👤 개발자 소개
        </h4>
        <div className="flex flex-col sm:flex-row items-center justify-between bg-[#f8f9fa] dark:bg-[#2c2c2c] p-4 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white dark:hover:bg-[#383838]">
          <div className="mb-3 sm:mb-0 text-center sm:text-left">
            <p className="font-bold mb-1 text-lg">BXXNXXII</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Frontend Developer
            </p>
          </div>

          <div className="flex gap-2">
            {/* GitHub 버튼 */}
            <a
              href="https://github.com/BXXNXXII"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-[#24292e] text-white text-xs rounded-lg hover:bg-black transition-colors shadow-sm"
            >
              <svg
                height="16"
                width="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              GitHub
            </a>

            {/* Instagram 버튼 */}
            <a
              href="https://www.instagram.com/bxxnxxii/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-linear-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-xs rounded-lg hover:opacity-90 transition-opacity shadow-sm"
            >
              <svg
                height="16"
                width="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.234-.047c-.78-.036-1.203-.166-1.484-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </section>

      <hr className="border-gray-200 dark:border-gray-700" />

      {/* 4. 활용 팁 (다크모드 제거, 호버 효과 추가) */}
      <section>
        <h4 className="font-bold text-[#212529] dark:text-[#f1f3f5] mb-2">
          🎯 활용 팁
        </h4>
        <div className="space-y-2">
          {[
            { icon: '⭐', text: '중요한 일은 별표를 눌러 상단에 고정하세요.' },
            { icon: '📅', text: '캘린더에서 날짜를 클릭해 일정을 확인하세요.' },
            { icon: '📊', text: '카테고리를 지정하면 통계를 볼 수 있어요.' },
          ].map((tip, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 bg-[#f1f3f5] dark:bg-[#2c2c2c] rounded-xl transition-all duration-200 hover:bg-[#e7f1ff] dark:hover:bg-[#3b5bdb] hover:shadow-sm cursor-default hover:-translate-y-0.5"
            >
              <span className="text-lg">{tip.icon}</span>
              <span className="text-xs leading-5 pt-0.5">{tip.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 요청사항 보내기 (토글 - 카드 스타일) */}
      <section className="pt-2">
        <div
          className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
            showRequestForm
              ? 'border-[#3182f6] shadow-lg'
              : 'border-gray-200 dark:border-gray-700'
          }`}
        >
          <button
            onClick={() => setShowRequestForm(!showRequestForm)}
            className={`w-full flex justify-between items-center p-4 font-bold transition-colors ${
              showRequestForm
                ? 'bg-[#3182f6] text-white'
                : 'bg-white dark:bg-[#1e1e1e] hover:bg-gray-50 dark:hover:bg-[#2c2c2c]'
            }`}
          >
            <span className="flex items-center gap-2">
              📨 개발자에게 의견 보내기
            </span>
            <span
              className={`transform transition-transform duration-200 ${
                showRequestForm ? 'rotate-180' : ''
              }`}
            >
              ▼
            </span>
          </button>

          {showRequestForm && (
            <form
              onSubmit={handleRequestSubmit}
              className="p-5 bg-white dark:bg-[#1e1e1e] space-y-4"
            >
              <div>
                <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400">
                  이름
                </label>
                <input
                  type="text"
                  value={reqName}
                  onChange={(e) => setReqName(e.target.value)}
                  placeholder="이름을 입력하세요"
                  className="w-full p-2.5 bg-gray-50 dark:bg-[#2c2c2c] border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3182f6] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400">
                  전화번호 (선택)
                </label>
                <input
                  type="tel"
                  value={reqPhone}
                  onChange={handlePhoneChange}
                  maxLength={13}
                  placeholder="010-0000-0000"
                  className="w-full p-2.5 bg-gray-50 dark:bg-[#2c2c2c] border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3182f6] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5 text-gray-500 dark:text-gray-400">
                  요청사항
                </label>
                <textarea
                  value={reqMsg}
                  onChange={(e) => setReqMsg(e.target.value)}
                  placeholder="버그 제보나 추가되었으면 하는 기능을 자유롭게 적어주세요."
                  rows="4"
                  className="w-full p-2.5 bg-gray-50 dark:bg-[#2c2c2c] border border-gray-200 dark:border-gray-600 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#3182f6] transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#3182f6] text-white rounded-xl font-bold text-sm hover:bg-[#1c64f2] active:scale-[0.98] transition-all shadow-md"
              >
                의견 보내기
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
