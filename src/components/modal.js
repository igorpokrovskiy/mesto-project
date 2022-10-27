import { addPhotoSubmitHandler } from "./card";
//Открытие и закрытие модального окна
export const profileEditButton = document.querySelector('.profile__edit-button');
export const popupEditProfile = document.querySelector('#popup-edit-profile');
export const popupEditProfileClose = document.querySelector('.popup__close');
export const formEdit = document.querySelector('#popup-edit-profile');
const nameInput = document.querySelector('#username');
const jobInput = document.querySelector('#description');

//Функции открытия и закрытия попапа
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupEscape, overlayClickClose(popup));
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupEscape);
}

//Закрытие попапа нажатием на Esc
export function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
};

//Закрытие попапа кликом на оверлей
export function overlayClickClose(popup) {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
};

let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
//Редактирование имени и информации о себе
nameInput.value = profileName.textContent;
jobInput.value = profileAbout.textContent;

export function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popupEditProfile);
};


