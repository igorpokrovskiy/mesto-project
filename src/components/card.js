import { openPopup, closePopup } from "./modal";

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
const popupCaption = document.querySelector('.popup__caption');
const cardInfo = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
});
// Генерация карточек
export function create() {
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
  const popupImage = document.querySelector('.popup__image');
  const closeImagePopup = openImagePopup.querySelector('.popup__close');
  openPopup(openImagePopup);
  popupImage.src = link;
  popupCaption.textContent = name; 
    closeImagePopup.addEventListener('click', () => {
  closePopup(openImagePopup);
  });
 });
  cardsContainer.prepend(cardElement);
}

create();

//Добавление карточки
const inputNameCard = document.querySelector('#title');
const inputUrlCard = document.querySelector('#link');
const template = document.querySelector('#card-template').content;

export function addPhotoSubmitHandler (evt) {
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
