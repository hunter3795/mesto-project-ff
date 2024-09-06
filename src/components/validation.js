function showInputError(formElement, inputElement, errorMessage, сonfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(сonfig.inputErrorClass); //'popup__input_type_error'
  errorElement.textContent = errorMessage;
  errorElement.classList.add(сonfig.errorClass); //'popup__error_visible'
};

function hideInputError(formElement, inputElement, сonfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(сonfig.inputErrorClass); //'popup__input_type_error'
  errorElement.classList.remove(сonfig.errorClass); //'popup__error_visible'
  // Очистим ошибку
  errorElement.textContent = '';
};

function isValid(formElement, inputElement, сonfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, сonfig);
  } else {
    hideInputError(formElement, inputElement, сonfig);
  }
};

function setEventListeners(formElement, сonfig) {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(сonfig.inputSelector)); //'.popup__input'
  const buttonElement = formElement.querySelector(сonfig.submitButtonSelector); //'.popup__button'
  // toggleButtonState(inputList, buttonElement);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, сonfig);
      toggleButtonState(inputList, buttonElement, сonfig);
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

function toggleButtonState(inputList, buttonElement, сonfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(сonfig.inactiveButtonClass) //'popup__button_disabled'
  }
  else {
    buttonElement.classList.remove(сonfig.inactiveButtonClass) //'popup__button_disabled'
  }
}

export function enableValidation(сonfig) {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(сonfig.formSelector)); //'.popup__form'

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement, сonfig);
  });
};

export function clearValidation(formElement, сonfig) {
  const errorItems = Array.from(formElement.querySelectorAll(`.${сonfig.errorClass}`));
  const InputItems = Array.from(formElement.querySelectorAll(`.${сonfig.inputErrorClass}`));
  const button = formElement.querySelector(сonfig.submitButtonSelector)
  errorItems.forEach((errorItem) =>
    errorItem.classList.remove(сonfig.errorClass))
  InputItems.forEach((InputItem) =>
    InputItem.classList.remove(сonfig.inputErrorClass))
  button.classList.add(сonfig.inactiveButtonClass)
}