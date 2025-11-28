import { formatDate } from './date';

export function createCalendar(selectedDateStr, todos = []) {
  const today = new Date();
  const refDate = selectedDateStr ? new Date(selectedDateStr) : today;
  const currentMonth = refDate.getMonth();
  const currentYear = refDate.getFullYear();

  const firstDay = new Date(currentYear, currentMonth, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay()); // start from Sunday

  const calendar = [];
  const currentDate = new Date(startDate);

  for (let week = 0; week < 6; week++) {
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
      const dateStr = formatDate(currentDate);
      const isCurrentMonth = currentDate.getMonth() === currentMonth;
      const isToday = dateStr === formatDate(today);
      const isSelected = selectedDateStr ? dateStr === selectedDateStr : false;
      const todoCount = todos ? todos.filter((todo) => todo.date === dateStr).length : 0;

      weekDays.push({
        date: new Date(currentDate),
        dateStr,
        isCurrentMonth,
        isToday,
        isSelected,
        todoCount,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }
    calendar.push(weekDays);
  }


  return calendar;
}

export default createCalendar;
