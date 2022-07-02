//Открытие и закрытие модального окна
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupEditProfileClose = document.querySelector('.popup__close');
const popupCaption = document.querySelector('.popup__caption');

profileEditButton.addEventListener('click', () => {
popupEditProfile.classList.add("popup_opened");
});

popupEditProfileClose.addEventListener('click', () => {
popupEditProfile.classList.remove("popup_opened");
});

let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

//Редактирование имени и информации о себе
const formElement = document.querySelector('#popup-edit-profile');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');
nameInput.value = profileName.textContent;
jobInput.value = profileAbout.textContent;

function formSubmitHandler (evt) {
    evt.preventDefault(); 
profileName.textContent = nameInput.value;
profileAbout.textContent = jobInput.value;
}
formElement.addEventListener('submit', formSubmitHandler); 

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
  openImagePopup.classList.add("popup_opened");
  const popupImage = document.querySelector('.popup__image');
  popupImage.src = link;
  popupCaption.textContent = name; 
  const closeImagePopup = openImagePopup.querySelector('.popup__close');
  closeImagePopup.addEventListener('click', function() {
  openImagePopup.classList.remove("popup_opened");
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
popupAddPhoto.classList.add("popup_opened");
});

popupAddPhotoClose.addEventListener('click', () => {
popupAddPhoto.classList.remove("popup_opened");
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
  openImagePopup.classList.add("popup_opened");
  const popupImage = document.querySelector('.popup__image');
  popupImage.src = cardUrl;
  popupCaption.textContent = cardTitle; 
  const closeImagePopup = openImagePopup.querySelector('.popup__close');
  closeImagePopup.addEventListener('click', function() {
  openImagePopup.classList.remove("popup_opened");
  });
 });
}
popupAddPhoto.addEventListener('submit', addPhotoSubmitHandler); 