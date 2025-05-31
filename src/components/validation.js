// Функция для отображения ошибки
function showError(input, errorMessage, settings) {
  const errorElement = document.querySelector(`#${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

// Функция для скрытия ошибки
function hideError(input, settings) {
  const errorElement = document.querySelector(`#${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
}

// Функция для проверки поля на валидность и установки кастомной ошибки
function checkInputValidity(input, settings) {
  const errorMessage = validateInput(input);
  if (errorMessage) {
    input.setCustomValidity(errorMessage); // Устанавливаем ошибку валидности
    showError(input, errorMessage, settings);
  } else {
    input.setCustomValidity(''); // Очищаем ошибку валидности
    hideError(input, settings);
  }
}

// Функция для проверки поля на валидность
function validateInput(input) {
  const value = input.value.trim();

  if (!value) {
    return 'Поле обязательно для заполнения';
  }

  if (input.name === 'name' && !/^[A-Za-zА-Яа-яЁё\s-]+$/.test(value)) {
    return 'Имя может содержать только буквы, пробелы и дефисы';
  }

  if (input.name === 'description' && !/^[A-Za-zА-Яа-яЁё\s-,]+$/.test(value)) {
    return 'О себе может содержать только буквы, пробелы и дефисы';
  }

  if (input.name === 'name' && (value.length < 2 || value.length > 40)) {
    return 'Имя должно быть от 2 до 40 символов';
  }

  if (input.name === 'description' && (value.length < 2 || value.length > 200)) {
    return 'О себе должно быть от 2 до 200 символов';
  }

  if (input.name === 'place-name' && !/^[A-Za-zА-Яа-яЁё\s-]+$/.test(value)) {
    return 'Название места может содержать только буквы, пробелы и дефисы';
  }

  if (input.name === 'place-name' && (value.length < 2 || value.length > 30)) {
    return 'Название места должно быть от 2 до 30 символов';
  }

  if (input.name === 'link' && !/^https?:\/\/[^\s]+$/i.test(value)) {
    return 'Введите корректный URL (например, http://example.com)';
  }

  return '';
}

// Функция для активации/деактивации кнопки
function toggleButtonState(inputs, button, settings) {
  // Проверяем валидность с учётом кастомных ошибок
  const hasInvalidInput = inputs.some(input => !input.validity.valid || input.value.trim() === '');
  if (hasInvalidInput) {
    button.classList.add(settings.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(settings.inactiveButtonClass);
    button.disabled = false;
  }
}

// Функция для добавления слушателей на форму
function setEventListeners(form, settings) {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const button = form.querySelector(settings.submitButtonSelector);

  // Проверка полей при изменении их значения
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input, settings);
      toggleButtonState(inputs, button, settings);
    });
  });

  // Обработчик отправки формы
  form.addEventListener('submit', (event) => {
    let isFormValid = true;

    inputs.forEach(input => {
      checkInputValidity(input, settings);
      if (!input.validity.valid) {
        isFormValid = false;
      }
    });

    toggleButtonState(inputs, button, settings);

    if (!isFormValid) {
      event.preventDefault(); // Останавливаем отправку формы, если есть ошибки
    }
  });

  // Инициализация состояния кнопки при загрузке
  toggleButtonState(inputs, button, settings);
}

// Функция для включения валидации
export function enableValidation(settings) {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach(form => {
    setEventListeners(form, settings);
  });
}

// Функция для очистки ошибок валидации
export function clearValidation(form, settings) {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const button = form.querySelector(settings.submitButtonSelector);

  inputs.forEach(input => {
    input.setCustomValidity(''); // очистить кастомные ошибки
    hideError(input, settings);
  });

  toggleButtonState(inputs, button, settings); // Сделаем кнопку неактивной, если нужно
}


