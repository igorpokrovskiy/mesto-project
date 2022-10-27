import { closePopup } from "./utils";
//Открытие и закрытие модального окна
export const profileEditButton = document.querySelector('.profile__edit-button');
export const popupEditProfile = document.querySelector('#popup-edit-profile');
export const profileForm = document.forms["edit-profile"];
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
export const nameInput = document.querySelector('#username');
export const jobInput = document.querySelector('#description');

//Закрытие попапа нажатием на Esc
export function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
};

//Редактирование имени и информации о себе
export function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popupEditProfile);
};