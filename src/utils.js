export function getProgressBarColor(value, low, high) {  
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

export function getYearsString(num) {
  if (num % 100 >= 11 && num % 100 <= 14) {
    return `${num} лет`
  }

  const lastDigit = num % 10;

  if (lastDigit === 1) {
    return `${num} год`
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return `${num} года`
  } else {
    return `${num} лет`
  }
}