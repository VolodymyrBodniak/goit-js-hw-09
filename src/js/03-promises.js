import { Notiflix } from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); // Виконуємо проміс зі значеннями position і delay
      } else {
        reject({ position, delay }); // Відхиляємо проміс зі значеннями position і delay
      }
    }, delay);
  });
}

function createPromises(amount, firstDelay, step) {
  for (let i = 1; i <= amount; i += 1) {
    const delay = firstDelay + (i - 1) * step;
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

const form = document.querySelector('.form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const amount = parseInt(form.elements.amount.value, 10);
  const firstDelay = parseInt(form.elements.delay.value, 10);
  const step = parseInt(form.elements.step.value, 10);
  createPromises(amount, firstDelay, step);
});

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }
