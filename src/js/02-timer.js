import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const timerFields = document.querySelectorAll('.value');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      Notiflix.Notify.success('Date selected successfully');
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);
let countdownInterval;

function startCountdown(targetDate) {
  countdownInterval = setInterval(() => {
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      updateTimerFields({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      Notiflix.Notify.success('Countdown complete!');
    } else {
      const time = convertMs(timeDifference);
      updateTimerFields(time);
    }
  }, 1000);
}

function updateTimerFields(time) {
  timerFields[0].textContent = addLeadingZero(time.days);
  timerFields[1].textContent = addLeadingZero(time.hours);
  timerFields[2].textContent = addLeadingZero(time.minutes);
  timerFields[3].textContent = addLeadingZero(time.seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startButton.addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(datetimePicker.value);
  if (selectedDate) {
    startCountdown(selectedDate);
    startButton.disabled = true;
  }
});
