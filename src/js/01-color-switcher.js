// Функція для генерації випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

// Отримуємо посилання на кнопки
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

let intervalId = null; // Ідентифікатор інтервалу для зміни кольору

// Функція для зміни кольору фону
function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

// Обробник події для кнопки "Start"
startButton.addEventListener('click', () => {
  if (!intervalId) {
    // Перевіряємо, чи інтервал не запущено
    intervalId = setInterval(changeBackgroundColor, 1000); // Запускаємо зміну кольору кожну секунду
    startButton.disabled = true; // Робимо кнопку "Start" неактивною
  }
});

// Обробник події для кнопки "Stop"
stopButton.addEventListener('click', () => {
  clearInterval(intervalId); // Зупиняємо інтервал
  intervalId = null; // Очищаємо ідентифікатор інтервалу
  startButton.disabled = false; // Робимо кнопку "Start" активною
});
