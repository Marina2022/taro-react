export function getProgressBarColor(value, low, high) {
  // Определяем цвет на основе значений
  if (value < low) {
    return "#E63D52"; // Красный
  } else if (value >= low && value < high) {
    return "#FFB94C"; // Желтый
  } else {
    return "#39CB3F"; // Зеленый
  }
}

export const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const addLeadingZero = (num) => {
  return num < 10 ? `0${num}` : `${num}`
}