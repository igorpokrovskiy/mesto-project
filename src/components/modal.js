import { patchProfile, patchAvatar } from "./api";
import { closePopup } from "./utils";
import { avatarEditInput,popupEditAvatar } from "./constants";
import { switchLoadingMessage } from "./utils";
//Открытие и закрытие модального окна
export const profileEditButton = document.querySelector('.profile__edit-button');
export const popupEditProfile = document.querySelector('#popup-edit-profile');
export const profileForm = document.forms["edit-profile"];
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
export const nameInput = document.querySelector('#username');
export const jobInput = document.querySelector('#description');
export const profileAvatar = document.querySelector('.profile__avatar');

//Закрытие попапа нажатием на Esc
export function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
};

//Редактирование имени и информации о себе
export function getProfileFromServer (name, about, avatar, json) {
  name.textContent = json['name'];
  about.textContent = json['about'];
  avatar.src = json['avatar'];
};

export function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    patchProfile(nameInput.value, jobInput.value)
    .then((json) => {
      getProfileFromServer(profileName, profileAbout, profileAvatar, json);
    closePopup(popupEditProfile);
  })
    .catch((err) => {
    console.log(`Что-то пошло не так. Ошибка: ${err}`);
  })
    .finally(() => {
    setTimeout(() => {loadingMessage(evt.submitter, false);}, 100)
  })
};


export function handleAvatarSubmit (evt) {
  evt.preventDefault(); 
  patchAvatar(avatarEditInput.value)
  .then((json) => {
    getProfileFromServer(profileAvatar, profileName, profileAbout, json);
    closePopup(popupEditAvatar);
    evt.target.reset();
  })
  .catch((err) => {
    console.log(`Что-то пошло не так. Ошибка: ${err}`);
  })
  .finally(() => {
    setTimeout(() => {loadingMessage(evt.submitter, false);}, 100)
  })
};
