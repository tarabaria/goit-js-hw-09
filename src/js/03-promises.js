import Notiflix from 'notiflix';

// Функція для створення промісу з відповідною затримкою
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Функція для обробки сабміту форми
function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const delayInput = form.querySelector('input[name="delay"]');
  const stepInput = form.querySelector('input[name="step"]');
  const amountInput = form.querySelector('input[name="amount"]');

  const delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  if (isNaN(delay) || isNaN(step) || isNaN(amount)) {
    Notiflix.Notify.failure('Please fill in all fields with valid numbers.');
    return;
  }

  // Створюємо проміси і обробляємо їх
  const promises = [];

  for (let i = 0; i < amount; i++) {
    const currentDelay = delay + i * step;

    createPromise(i + 1, currentDelay)
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

    promises.push(createPromise(i + 1, currentDelay));
  }

  // Очищаємо значення полів форми
  delayInput.value = '';
  stepInput.value = '';
  amountInput.value = '';
}

// Додаємо обробник події для форми
const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);
