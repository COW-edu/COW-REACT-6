const formatDate = (date) => {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().split('T')[0];
};

function Calendar({ selectedDate, onDateSelect, todos }) {
  // 캘린더 생성 함수
  const generateCalendar = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay()); // 일요일부터 시작
    
    const calendar = [];
    const currentDate = new Date(startDate);
    
    for (let week = 0; week < 6; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        const dateStr = formatDate(currentDate);
        const isCurrentMonth = currentDate.getMonth() === currentMonth;
        const isToday = dateStr === formatDate(today);
        const isSelected = dateStr === selectedDate;
        const todoCount = todos.filter(todo => todo.date === dateStr).length;
        
        weekDays.push({
          date: new Date(currentDate),
          dateStr,
          isCurrentMonth,
          isToday,
          isSelected,
          todoCount
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      calendar.push(weekDays);
    }
    
    return calendar;
  };

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

        {generateCalendar()
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