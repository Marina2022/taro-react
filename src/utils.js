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