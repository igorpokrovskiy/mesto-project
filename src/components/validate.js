//Валидация
export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputForm: '.form__input',
  submitButtonSelector: '.form__submit',
  disabledButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  elementErrorClass: 'form__input-error'
};

  function showInputError(formElement, inputElement, errorMessage, settings){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.elementErrorClass);
  };
  
  function hideInputError(formElement, inputElement, settings){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.elementErrorClass);
    errorElement.textContent = '';
  };
  
  function checkInputValidity(formElement, inputElement, settings){
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      hideInputError(formElement, inputElement, settings);
    }
  };
  
  function hasInvalidInput(inputList){
    return inputList.some(input => !input.validity.valid)
  };
  
  function toggleButtonState(inputList, buttonElement, settings){
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.disabledButtonClass); 
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.disabledButtonClass); 
    buttonElement.disabled = false;
  };
  };
  
 export function setEventListeners(formElement, settings){
    const inputList = Array.from(formElement.querySelectorAll(settings.inputForm));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, settings);
    formElement.addEventListener('reset', () => {
      setTimeout(() => {
       toggleButtonState(inputList, buttonElement, settings);
      }, 0);
    });
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
      });
    });
  };
  
 export function enableValidation(obj){
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, settings);
    });
  };