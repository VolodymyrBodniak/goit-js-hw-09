import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { setInputDisabled, addLeadingZero } from './utils.js';
import Notiflix from 'notiflix';

const input = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
const daysValue = timer.querySelector('[data-days]');
const hoursValue = timer.querySelector('[data-hours]');
const minutesValue = timer.querySelector('[data-minutes]');
const secondsValue = timer.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
      setInputDisabled(true); // Вимикаємо input
      startButton.disabled = true;
    } else {
      setInputDisabled(false); // Знову дозволяємо вибір дати
      startButton.disabled = false;
    }
  },
};

flatpickr(input, options);

let countdownInterval;

startButton.addEventListener('click', () => {
  const selectedDate = new Date(input.value).getTime();
  const currentDate = new Date().getTime();
  const timeLeft = selectedDate - currentDate;

  if (timeLeft <= 0) {
    Notiflix.Notify.warning('Please choose a date in the future');
    return;
  }

  setInputDisabled(true); // Вимикаємо input

  clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeLeft = selectedDate - currentTime;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      setInputDisabled(false); // Знову дозволяємо вибір дати
      renderTimer(0, 0, 0, 0); // Оновлюємо таймер на значення 00:00:00:00
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeLeft);
      renderTimer(days, hours, minutes, seconds);
    }
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function renderTimer(days, hours, minutes, seconds) {
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}
