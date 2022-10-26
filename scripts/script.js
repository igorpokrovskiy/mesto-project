//Открытие и закрытие модального окна
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupEditProfileClose = document.querySelector('.popup__close');
const popupCaption = document.querySelector('.popup__caption');
const popup = document.querySelector('.popup');

//Функции открытия и закрытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupEscape, overlayClickClose(popup));
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupEscape);
}

//Закрытие попапа нажатием на Esc
function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
};

//Закрытие попапа кликом на оверлей
function overlayClickClose(popup) {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
};

profileEditButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
});

popupEditProfileClose.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

//Редактирование имени и информации о себе
const formEdit = document.querySelector('#popup-edit-profile');
const nameInput = document.querySelector('#username');
const jobInput = document.querySelector('#description');
nameInput.value = profileName.textContent;
jobInput.value = profileAbout.textContent;

function formSubmitHandler (evt) {
    evt.preventDefault(); 
profileName.textContent = nameInput.value;
profileAbout.textContent = jobInput.value;
closePopup(popupEditProfile);
}
formEdit.addEventListener('submit', formSubmitHandler); 

//Шесть карточек «из коробки»
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;
const cardInfo = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
});
// Генерация карточек
function create() {
  cardInfo.forEach(createCard);
}

function createCard({ name, link }) {
  const cardElement = cardTemplate.querySelector(".element")
    .cloneNode(true);
  cardElement.querySelector('.element__title').textContent = name;
  cardElement.querySelector('.element__image').src = link;
  cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });
  cardElement.querySelector('.element__delete-button').addEventListener('click', function () {
  const cardItem = cardElement.closest('.element');
  cardItem.remove();
}); 
  cardElement.querySelector('.element__image').addEventListener('click', function () {
  const openImagePopup = document.querySelector('#popup-open-image');
  openPopup(openImagePopup);
  const popupImage = document.querySelector('.popup__image');
  popupImage.src = link;
  popupCaption.textContent = name; 
  const closeImagePopup = openImagePopup.querySelector('.popup__close');
  closeImagePopup.addEventListener('click', () => {
    closePopup(openImagePopup);
  });
 });
  cardsContainer.prepend(cardElement);
}

create();

//Форма добавления карточки
const addPhotoButton = document.querySelector('.profile__add-button');
const popupAddPhoto = document.querySelector('#popup-add-photo');
const popupAddPhotoClose = popupAddPhoto.querySelector('.popup__close');

addPhotoButton.addEventListener('click', () => {
  openPopup(popupAddPhoto);
});

popupAddPhotoClose.addEventListener('click', () => {
  closePopup(popupAddPhoto);
});

//Добавление карточки
const inputNameCard = document.querySelector('#title');
const inputUrlCard = document.querySelector('#link');
const template = document.querySelector('#card-template').content;

function addPhotoSubmitHandler (evt) {
    evt.preventDefault(); 
   let cardTitle = inputNameCard.value;
   let cardUrl  =inputUrlCard.value;
   let newCard = template.querySelector('.element').cloneNode(true);
   newCard.querySelector('.element__title').textContent = cardTitle;
   newCard.querySelector('.element__image').src = cardUrl;
    cardsContainer.prepend(newCard);
   inputNameCard.value = "";
   inputUrlCard.value= "";
   newCard.querySelector('.element__like-button').addEventListener('click', function (e) {
    e.target.classList.toggle('element__like-button_active');
  });
  newCard.querySelector('.element__delete-button').addEventListener('click', function () {
  const cardItem = newCard.closest('.element');
  cardItem.remove();
  }); 
  newCard.querySelector('.element__image').addEventListener('click', function () {
  const openImagePopup = document.querySelector('#popup-open-image');
  openPopup(openImagePopup);
  const popupImage = document.querySelector('.popup__image');
  popupImage.src = cardUrl;
  popupCaption.textContent = cardTitle; 
  const closeImagePopup = openImagePopup.querySelector('.popup__close');
  closeImagePopup.addEventListener('click', () => {
    closePopup(openImagePopup);
  });
 });
};
popupAddPhoto.addEventListener('submit', addPhotoSubmitHandler); 

//Валидация
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(input => !input.validity.valid)
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add('form__submit_disabled'); 
  buttonElement.disabled = true;
} else {
  buttonElement.classList.remove('form__submit_disabled'); 
  buttonElement.disabled = false;
};
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  });
};
enableValidation();
setEventListeners(formEdit);
setEventListeners(popupAddPhoto);