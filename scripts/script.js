const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');
const closeButton = document.querySelectorAll('.popup__close');
const openImagePopup = document.querySelector('#popup-open-image');
const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".elements");
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');
const closeImagePopup = openImagePopup.querySelector('.popup__close');
const inputNameCard = document.querySelector('#title');
const inputUrlCard = document.querySelector('#link');
const template = document.querySelector('#card-template').content;
const addPhotoButton = document.querySelector('.profile__add-button');
const popupAddPhoto = document.querySelector('#popup-add-photo');
const popupAddPhotoClose = popupAddPhoto.querySelector('.popup__close');
const popupEditProfileClose = document.querySelector('.popup__close');
const likeButton = document.querySelector('.element__like-button');


//Открытие и закрытие модального окна
function openPopup (elem) {
  elem.classList.add("popup_opened");
};
function closePopup (elem) {
  elem.classList.remove("popup_opened");
};
  closeImagePopup.addEventListener('click', () => {
  closePopup(openImagePopup);
  });
//Редактирование имени и информации о себе
profileEditButton.addEventListener('click', () => { 
openPopup(popupEditProfile); 
}); 
popupEditProfileClose.addEventListener('click', () => { 
closePopup(popupEditProfile); 
}); 
nameInput.value = profileName.textContent;
jobInput.value = profileAbout.textContent;

function submitFormHandler (evt) {
    evt.preventDefault(); 
profileName.textContent = nameInput.value;
profileAbout.textContent = jobInput.value;
closePopup(popupEditProfile);
}
popupEditProfile.addEventListener('submit', submitFormHandler); 

const cardInfo = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
}); 

function create() {
  for (let i = 0; i <= cardInfo.length-1; i = i + 1) {
  renderedCards = createCard({name: cardInfo[i].name, link: cardInfo[i].link});
  cardsContainer.prepend(renderedCards);
} 
} 
  //Функция создания карточки
  function createCard({name, link}) {
  const cardElement = cardTemplate.querySelector(".element") 
    .cloneNode(true); 
  cardElement.querySelector('.element__title').textContent = name;
  const cardImage = cardElement.querySelector('.element__image');
  cardImage.src = link;
  cardImage.alt = `Фото места ${name}`;   
  cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) { 
  evt.target.classList.toggle('element__like-button_active');
  });
  cardElement.querySelector('.element__delete-button').addEventListener('click', function () { 
  const cardItem = cardElement.closest('.element'); 
  cardItem.remove(); 
  });  
  cardElement.querySelector('.element__image').addEventListener('click', () => {
  popupImage.src = link;
  popupImage.alt = `Фото места ${name}`;  
  popupCaption.textContent = name; 
  openPopup(openImagePopup);
  });
  return cardElement;
}
create();

//Форма добавления карточки
addPhotoButton.addEventListener('click', () => {
openPopup(popupAddPhoto);
});

popupAddPhotoClose.addEventListener('click', () => {
closePopup(popupAddPhoto);
});

//Добавление карточки
function addPhotoSubmitHandler (evt) {
  evt.preventDefault(); 
  cardsContainer.prepend(createCard({name: inputNameCard.value, link: inputUrlCard.value}));
  inputNameCard.value = ""; 
  inputUrlCard.value = ""; 
  closePopup(popupAddPhoto);

}
popupAddPhoto.addEventListener('submit', addPhotoSubmitHandler);