import { popupAddPhoto } from "./constants";
import { openPopup, closePopup } from "./utils";
const openImagePopup = document.querySelector('#popup-open-image');
const popupImage = document.querySelector('.popup__image');
const closeImagePopup = openImagePopup.querySelector('.popup__close');
const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;
const popupCaption = document.querySelector('.popup__caption');
const inputNameCard = document.querySelector('#title');
const inputUrlCard = document.querySelector('#link');

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

// Генерация карточек
export function renderInitialCards() {
  initialCards.forEach(createCard);
}

function getCard(item) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  cardElement.querySelector('.element__title').textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });
  cardElement.querySelector('.element__delete-button').addEventListener('click', function () {
  const cardItem = cardElement.closest('.element');
  cardItem.remove();
}); 
  cardImage.addEventListener('click', function () {
  openPopup(openImagePopup);
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupCaption.textContent = item.name; 
  closeImagePopup.addEventListener('click', () => {
  closePopup(openImagePopup);
  closeImagePopup.removeEventListener('click', closePopup);
  });
 });
return cardElement
}

function createCard(item) {
  const cardElement = getCard(item)
  cardsContainer.prepend(cardElement);
}

//Добавление карточки
export function handleAddPhotoSubmit (evt) {
    evt.preventDefault(); 
    const item = {}
   item.name = inputNameCard.value;
   item.link  =inputUrlCard.value;
   getCard(item);
   createCard(item);
   evt.target.reset();
   closePopup(popupAddPhoto);
};

