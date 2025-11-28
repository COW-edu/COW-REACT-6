import { useMemo } from 'react';
import { createCalendar } from '../utils/calendar';

function Calendar({ selectedDate, onDateSelect, todos }) {
  // selectedDate: yyyy-mm-dd string
  const calendar = useMemo(() => createCalendar(selectedDate, todos), [selectedDate, todos]);

  return (
    <div className="flex-1">
      <h2 className="text-xl font-semibold mb-3">캘린더</h2>
      <div className="grid grid-cols-7 gap-px mb-5">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div
            key={day}
            className="p-2 text-center font-bold bg-gray-100"
          >
            {day}
          </div>
        ))}

        {calendar
          .flat()
          .map((dayInfo) => {
            const base =
              'relative p-3 text-center cursor-pointer border border-gray-300';
            const state = dayInfo.isSelected
              ? 'bg-blue-600 text-white'
              : dayInfo.isToday
              ? 'bg-blue-50 text-gray-900'
              : dayInfo.isCurrentMonth
              ? 'bg-white text-gray-900'
              : 'bg-gray-50 text-gray-400';

            return (
              <div
                key={dayInfo.dateStr}
                onClick={() => onDateSelect(dayInfo.dateStr)}
                className={`${base} ${state}`}
              >
                {dayInfo.date.getDate()}
                {dayInfo.todoCount > 0 && (
                  <div className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
                    {dayInfo.todoCount}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Calendar;