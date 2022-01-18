import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const btn = document.querySelector('[data-start]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
        // window.alert("Please choose a date in the future");
        Notiflix.Notify.warning("Please choose a date in the future");
        btn.setAttribute('disabled', 'disabled');
    } else {
        btn.removeAttribute('disabled');
    }
    btn.addEventListener('click', () => {
        let result = selectedDates[0] - new Date();
        let timerId = setInterval(() => {
            result -= 1000;
            if (result >= 0) {
                fn(convertMs(result));
            }  
        }, 1000);
    })
  },
};

flatpickr("#datetime-picker", options);

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

const daySpan = document.querySelector('[data-days]');
const hourSpan = document.querySelector('[data-hours]');
const minuteSpan = document.querySelector('[data-minutes]');
const secondSpan = document.querySelector('[data-seconds]');

function fn({ days, hours, minutes, seconds }) {
    daySpan.textContent = String(days).padStart(2, 0);
    hourSpan.textContent = String(hours).padStart(2, 0);
    minuteSpan.textContent = String(minutes).padStart(2, 0);
    secondSpan.textContent = String(seconds).padStart(2, 0);
};