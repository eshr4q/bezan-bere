export function getMonthDays(year, month) {
    const date = new Date(year, month - 1, 1);
    const days = [];
  
    while (date.getMonth() === month - 1) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
  
    return days;
  }
  
  export function getFirstWeekday(year, month) {
    return new Date(year, month - 1, 1).getDay(); // 0 = Sunday
  }
  