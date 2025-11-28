import React, { useState } from 'react';
import { getTodayKey } from '../utils/formatDate';
import { useTodos } from '../hooks/useTodos';
import Calendar from '../components/todo/Calendar';
import TodoInput from '../components/todo/TodoInput';
import TodoList from '../components/todo/TodoList';

export default function TodoPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateKey, setSelectedDateKey] = useState(getTodayKey());
  const [currentFilter, setCurrentFilter] = useState(null);
  const [showEntryForm, setShowEntryForm] = useState(false);

  // 커스텀 훅으로 로직 가져오기
  const { todos, dones, addTodo, toggleTodo, deleteTodo, toggleImportant } =
    useTodos(selectedDateKey);

  // 카테고리 목록 추출
  const categories = [
    ...new Set([...todos, ...dones].map((t) => t.category).filter(Boolean)),
  ];

  return (
    // [수정] mt-[60px] -> mt-32 로 변경하여 헤더와의 간격을 넓힘
    // [추가] mb-10을 추가하여 하단 여백도 확보
    <div className="flex flex-col md:flex-row max-w-[1080px] mx-auto mt-32 mb-10 bg-white rounded-3xl shadow-sm overflow-hidden dark:bg-[#1e1e1e] dark:text-[#f1f3f5]">
      {/* 캘린더 사이드바 */}
      <Calendar
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        selectedDateKey={selectedDateKey}
        setSelectedDateKey={setSelectedDateKey}
      />

      {/* 메인 섹션 */}
      <main className="flex-1 p-8 bg-white dark:bg-[#1e1e1e]">
        <h2 className="text-2xl font-bold mb-4">오늘의 할 일</h2>

        <button
          onClick={() => {
            setSelectedDateKey(getTodayKey());
            setCurrentDate(new Date());
          }}
          className="mb-3 px-4 py-1.5 bg-[#3182f6] text-white rounded-2xl text-[11px] font-semibold hover:bg-[#1c64f2] active:scale-95 transition-all shadow-sm"
        >
          📅 오늘로 이동
        </button>

        <TodoInput onAdd={addTodo} />

        {/* 날짜 선택 입력 버튼 (토글) */}
        <button
          onClick={() => setShowEntryForm(!showEntryForm)}
          className="mb-4 px-4 py-1.5 bg-[#3182f6] text-white rounded-2xl text-[11px] font-semibold hover:bg-[#1c64f2] active:scale-95 transition-all shadow-sm"
        >
          {showEntryForm ? '❌ 입력 폼 닫기' : '✏️ 날짜 선택 입력'}
        </button>

        {showEntryForm && (
          <div className="mb-4 p-3 bg-[#f8f9fa] rounded-xl dark:bg-[#2c2c2c]">
            <div className="flex gap-2 flex-wrap">
              <input
                type="date"
                id="custom-date"
                className="p-2 border rounded-lg text-sm dark:bg-[#1e1e1e] dark:border-[#444]"
              />
              <input
                type="text"
                id="custom-task"
                placeholder="할 일"
                className="p-2 border rounded-lg text-sm flex-1 dark:bg-[#1e1e1e] dark:border-[#444]"
              />
              <input
                type="text"
                id="custom-cat"
                placeholder="카테고리"
                className="p-2 border rounded-lg text-sm w-24 dark:bg-[#1e1e1e] dark:border-[#444]"
              />
              <button
                onClick={() => {
                  const date = document.getElementById('custom-date').value;
                  const task = document.getElementById('custom-task').value;
                  const cat = document.getElementById('custom-cat').value;
                  if (date && task) {
                    // 날짜 선택 입력은 useTodos 훅을 약간 수정하거나 여기서 직접 처리해야 함.
                    // 간단히 구현하기 위해 LocalStorage 직접 호출 (훅으로 옮기는 게 더 좋음)
                    const key = `todo-${date}`;
                    const data = JSON.parse(localStorage.getItem(key)) || {
                      todos: [],
                      dones: [],
                    };
                    data.todos.push({
                      id: crypto.randomUUID(),
                      text: task,
                      category: cat,
                      isImportant: false,
                    });
                    localStorage.setItem(key, JSON.stringify(data));
                    alert('추가되었습니다.');
                    setShowEntryForm(false);
                  } else alert('날짜와 할 일을 입력하세요.');
                }}
                className="px-3 py-2 bg-[#3182f6] text-white rounded-lg text-sm font-bold hover:bg-[#1c64f2]"
              >
                입력
              </button>
            </div>
          </div>
        )}

        {/* 필터 */}
        <div className="my-3 flex flex-wrap gap-2 items-center text-sm text-[#495057] dark:text-[#ced4da]">
          <strong>📂 카테고리 필터:</strong>
          <button
            onClick={() => setCurrentFilter(null)}
            className={`px-3 py-2 rounded-full font-medium transition-colors ${
              currentFilter === null
                ? 'bg-[#3182f6] text-white'
                : 'bg-[#f1f3f5] text-[#212529] hover:bg-[#e9ecef] dark:bg-[#2c2c2c] dark:text-[#f1f3f5]'
            }`}
          >
            전체
          </button>
          <button
            onClick={() =>
              setCurrentFilter(
                currentFilter === 'important-only' ? null : 'important-only'
              )
            }
            className={`px-3 py-2 rounded-full font-medium transition-colors ${
              currentFilter === 'important-only'
                ? 'bg-[#3182f6] text-white'
                : 'bg-[#f1f3f5] text-[#212529] hover:bg-[#e9ecef] dark:bg-[#2c2c2c] dark:text-[#f1f3f5]'
            }`}
          >
            ⭐ 중요
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setCurrentFilter(currentFilter === cat ? null : cat)
              }
              className={`px-3 py-2 rounded-full font-medium transition-colors ${
                currentFilter === cat
                  ? 'bg-[#3182f6] text-white'
                  : 'bg-[#f1f3f5] text-[#212529] hover:bg-[#e9ecef] dark:bg-[#2c2c2c] dark:text-[#f1f3f5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-[#0ca678] font-bold text-base mb-3">
          ✅ 완료 비율: {dones.length} / {todos.length + dones.length} (
          {todos.length + dones.length === 0
            ? 0
            : Math.round((dones.length / (todos.length + dones.length)) * 100)}
          %)
        </div>

        <TodoList
          todos={todos}
          dones={dones}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onImportant={toggleImportant}
          filter={currentFilter}
        />

        {/* 월간 요약 (간략 구현) */}
        <div className="mt-6 text-sm dark:text-[#ced4da]">
          <h3 className="text-lg font-bold mb-3">📊 월간 요약</h3>
          {/* 계산 로직은 렌더링 시 수행 */}
          {(() => {
            const targetMonth = selectedDateKey.slice(0, 7);
            let total = 0,
              doneCount = 0;
            for (let i = 0; i < localStorage.length; i++) {
              const key = localStorage.key(i);
              if (key.startsWith(`todo-${targetMonth}`)) {
                const d = JSON.parse(localStorage.getItem(key));
                total += (d.todos?.length || 0) + (d.dones?.length || 0);
                doneCount += d.dones?.length || 0;
              }
            }
            return (
              <div>
                <p>
                  총 할 일: <strong>{total}</strong>, 완료:{' '}
                  <strong>{doneCount}</strong> (
                  {total === 0 ? 0 : Math.round((doneCount / total) * 100)}%)
                </p>
              </div>
            );
          })()}
        </div>
      </main>
    </div>
  );
}
