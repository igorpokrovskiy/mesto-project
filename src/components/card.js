import { openPopup } from "./modal";
import { deleteCard, putLike, deleteLike } from "./api";
const openImagePopup = document.querySelector('#popup-open-image');
const popupImage = document.querySelector('.popup__image');
const cardTemplate = document.querySelector("#card-template").content;
const popupCaption = document.querySelector('.popup__caption');

//Получение карточек с сервера
export function renderInitialCards(container, json, myId) {
  json.forEach((card) => {
    container.prepend(addCard(card.name, card.link, card['owner']['_id'], myId, card['likes'], card['_id']))
  });
};

//Проверка моего лайка
function isLikedbyMe(myId, likes) {
  return likes.some((obj) => {
    return obj['_id'] == myId;
  })
};

//Добавление карточки
export function addCard (descriptionValue, imageLinkValue, userId, myId, likes, cardId) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const likeCounter = cardElement.querySelector('.element__like-counter');
  const likeButton = cardElement.querySelector('.element__like-button');
  const trashButton = cardElement.querySelector('.element__delete-button');
  likeCounter.textContent = likes.length;
  if (isLikedbyMe(myId, likes)) {
    likeButton.classList.add('element__like-button_active')
  }
//Установка и снятие лайка на карточке
  likeButton.addEventListener('click', function (evt) {
    if (isLikedbyMe(myId, likes)) {
      deleteLike(cardId)
        .then((res) => {
          likeCounter.textContent = res['likes'].length;
          evt.target.classList.toggle('element__like-button_active');
          return likes = res['likes'];
        })
        .catch((err) => {
          console.log(`Что-то пошло не так. Ошибка: ${err}`);
        })
    }
    else {
      putLike(cardId)
        .then((res) => {
          likeCounter.textContent = res['likes'].length;
          evt.target.classList.toggle('element__like-button_active');
          return likes = res['likes'];
        })
        .catch((err) => {
          console.log(`Что-то пошло не так. Ошибка: ${err}`);
        })
    }
  });

//Установка кнопки удаления
if (myId == userId) {
  trashButton.addEventListener('click', function() {
    const cardItem = cardElement.closest('.element');
    deleteCard(cardId)
      .then((res)=>{
        cardItem.remove();
      })
      .catch((err) => {
        console.log(`Что-то пошло не так. Ошибка: ${err}`);
      })
  });
}
else {
  trashButton.remove()
};

//Открытие попапа с картинкой
cardImage.addEventListener('click', function () {
  openPopup(openImagePopup);
  popupImage.src = imageLinkValue;
  popupImage.alt = descriptionValue;
  popupCaption.textContent = descriptionValue; 
 });
 cardElement.querySelector('.element__title').textContent = descriptionValue;
 cardImage.src = imageLinkValue;
 cardImage.alt = descriptionValue;
return cardElement
};