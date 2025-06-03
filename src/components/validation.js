// Показывает ошибку
function showError(input, errorMessage, settings) {
  const errorElement = document.querySelector(`#${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

// Скрывает ошибку
function hideError(input, settings) {
  const errorElement = document.querySelector(`#${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
}

// Проверяет валидность поля 
function checkInputValidity(input, settings) {
  if (input.validity.patternMismatch) {
    // Если ошибка паттерна — показываем кастомное сообщение из data-error-pattern
    const customMessage = input.dataset.errorPattern || 'Неверный формат';
    input.setCustomValidity(customMessage);
    showError(input, customMessage, settings);
  } else if (!input.validity.valid) {
    // Для остальных ошибок показываем встроенное сообщение браузера
    input.setCustomValidity('');
    showError(input, input.validationMessage, settings);
  } else {
    // Ошибок нет — скрываем ошибку
    input.setCustomValidity('');
    hideError(input, settings);
  }
}


// Переключает состояние кнопки в зависимости от валидности
function toggleButtonState(inputs, button, settings) {
  const hasInvalidInput = inputs.some(input => !input.validity.valid);
  if (hasInvalidInput) {
    button.classList.add(settings.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(settings.inactiveButtonClass);
    button.disabled = false;
  }
}

// Устанавливает слушатели на форму
function setEventListeners(form, settings) {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const button = form.querySelector(settings.submitButtonSelector);

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input, settings);
      toggleButtonState(inputs, button, settings);
    });
  });

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
      event.preventDefault();
    }
  });

  toggleButtonState(inputs, button, settings);
}

// Включает валидацию для всех форм
export function enableValidation(settings) {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach(form => {
    setEventListeners(form, settings);
  });
}

// Очищает ошибки и сбрасывает состояние кнопки
export function clearValidation(form, settings) {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const button = form.querySelector(settings.submitButtonSelector);

  inputs.forEach(input => {
    input.setCustomValidity('');
    hideError(input, settings);
  });

  toggleButtonState(inputs, button, settings);
}
