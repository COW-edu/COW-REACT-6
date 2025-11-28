import React from 'react';
import { getStorageData } from '../../utils/storage';

export default function Calendar({
  currentDate,
  setCurrentDate,
  selectedDateKey,
  setSelectedDateKey,
}) {
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= lastDate; i++) days.push(i);
    return days;
  };

  const changeMonth = (offset) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
    );
  };

  return (
    <aside className="w-full md:w-[40%] p-8 bg-[#f1f3f5] border-r border-[#dee2e6] dark:bg-[#2c2c2c] dark:border-[#444]">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="text-[#3182f6] text-lg font-bold hover:text-[#1c64f2]"
        >
          &lt;
        </button>
        <span className="text-xl font-bold text-[#495057] dark:text-[#f1f3f5]">
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </span>
        <button
          onClick={() => changeMonth(1)}
          className="text-[#3182f6] text-lg font-bold hover:text-[#1c64f2]"
        >
          &gt;
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
              <th key={d} className="p-2 text-[#495057] dark:text-[#adb5bd]">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil(getCalendarDays().length / 7) }).map(
            (_, weekIndex) => (
              <tr key={weekIndex}>
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const day = getCalendarDays()[weekIndex * 7 + dayIndex];
                  if (!day) return <td key={dayIndex}></td>;

                  const dateKey = `${currentDate.getFullYear()}-${String(
                    currentDate.getMonth() + 1
                  ).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const isSelected = selectedDateKey === dateKey;
                  const dayData = getStorageData(`todo-${dateKey}`);

                  let bgClass = '';
                  if (isSelected) bgClass = 'bg-[#3182f6] text-white font-bold';
                  else if (dayData) {
                    const hasT = (dayData.todos?.length || 0) > 0;
                    const hasD = (dayData.dones?.length || 0) > 0;
                    if (hasT && hasD) bgClass = 'bg-[#d3f9d8] dark:text-black';
                    else if (hasT) bgClass = 'bg-[#fff3bf] dark:text-black';
                    else if (hasD) bgClass = 'bg-[#dee2e6] text-[#495057]';
                  }

                  return (
                    <td
                      key={dayIndex}
                      onClick={() => setSelectedDateKey(dateKey)}
                      className={`text-center p-2 rounded-lg cursor-pointer hover:bg-[#e7f1ff] dark:hover:bg-[#3b5bdb] ${bgClass}`}
                    >
                      {day}
                    </td>
                  );
                })}
              </tr>
            )
          )}
        </tbody>
      </table>

      <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#495057] dark:text-[#ced4da]">
        <span className="flex items-center gap-1">
          <span className="w-3.5 h-3.5 bg-[#fff3bf] rounded"></span>할 일
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3.5 h-3.5 bg-[#d3f9d8] rounded"></span>진행 中
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3.5 h-3.5 bg-[#dee2e6] rounded"></span>완료
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3.5 h-3.5 bg-[#3182f6] rounded"></span>선택
        </span>
      </div>
    </aside>
  );
}
