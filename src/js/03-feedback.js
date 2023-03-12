import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormElemInput, 500));

populateTaxtearea();

function onFormSubmit(event) {
  event.preventDefault();

  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);

  console.log(formData);
}

// збереження складної форми в LocalStorage
function onFormElemInput(event) {
  formData[event.target.name] = event.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// //  для збереження одного елементу форми в LocalStorage
// refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));
// function onTextareaInput(event) {
//   const message = event.target.value;
//   // не використ. JSON.stingify тому, що value в textare це завжди рядок
//   localStorage.setItem('feedback-msg', message);
// }

// функція, що перевіряє стан сховища і заповнює форму, якщо в сховищі є збереженні данні
function populateTaxtearea() {
  const savedFeedback = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedFeedback) {
    for (const key of Object.keys(savedFeedback)) {
      form.elements[key].value = savedFeedback[key];
    }
  }
}
