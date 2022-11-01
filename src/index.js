import './pages/index.css';
import { renderInitialCards, handleAddPhotoSubmit } from "./components/card.js";
import { openPopup, closePopup } from './components/utils.js';
import { profileEditButton,popupEditProfile, getProfileFromServer, profileForm, handleProfileFormSubmit, profileName, profileAbout, profileAvatar, nameInput, jobInput, handleAvatarSubmit} from "./components/modal.js"
import { enableValidation, settings } from './components/validate.js';
import { addPhotoButton, popupAddPhoto, popups, cardsContainer, avatarEditButton, popupEditAvatar } from './components/constants.js'
import { fetchUser, getInitialCards } from "./components/api.js";

//Загрузка информации о пользователе
fetchUser()
.then((data) => {
  getProfileFromServer(profileName, profileAbout, profileAvatar, data)
  const myId = data['_id'];
  getInitialCards()
    .then((json) => {
      renderInitialCards(cardsContainer, json, myId)
    })
  .catch((err) => {
    console.log(`Что-то пошло не так. Ошибка: ${err}`);
  })
})

profileEditButton.addEventListener('click', () => {
    openPopup(popupEditProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
  });

addPhotoButton.addEventListener('click', () => {
    openPopup(popupAddPhoto);
  });
popupAddPhoto.addEventListener('submit', handleAddPhotoSubmit); 
profileForm.addEventListener('submit', handleProfileFormSubmit); 

//Функции открытия и закрытия попапа
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
  })
});

//Редактирование аватара
avatarEditButton.addEventListener('click', () => {
  openPopup(popupEditAvatar);
});
popupEditAvatar.addEventListener('submit', handleAvatarSubmit);

enableValidation(settings);