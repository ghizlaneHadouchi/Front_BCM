export const calculateDuration = (start, end) => {
  if (!start) return 'Not started'
  if (!end) return 'In progress'

  try {
    const startDate = new Date(start)
    const endDate = new Date(end)

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return 'Invalid date'
    }

    const duration = endDate - startDate
    const seconds = Math.floor(duration / 1000)

    if (seconds === 0) {
      return 'Less than a second'
    }

    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes % 60} minute${minutes % 60 !== 1 ? 's' : ''}`
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ${seconds % 60} second${seconds % 60 !== 1 ? 's' : ''}`
    } else {
      return `${seconds} second${seconds !== 1 ? 's' : ''}`
    }
  } catch (error) {
    console.error('Error calculating duration:', error)
    return 'Error calculating duration'
  }
}

export const getTrimesterLabel = (dateStr) => {
  const date = new Date(dateStr);
  const month = date.getMonth(); // 0-indexed
  const year = date.getFullYear();
  const quarter = Math.floor(month / 3) + 1;
  return `T${quarter}${year}`;
};

export const getMonthYearLabel = (dateStr) => {
  const date = new Date(dateStr);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}${year}`;
};
