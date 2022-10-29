import './pages/index.css';
import { renderInitialCards, handleAddPhotoSubmit } from "./components/card.js";
import { openPopup, closePopup } from './components/utils.js';
import {profileEditButton,popupEditProfile, profileForm, handleProfileFormSubmit, profileName, profileAbout, nameInput, jobInput} from "./components/modal.js"
import { enableValidation, settings } from './components/validate.js';
import { addPhotoButton, popupAddPhoto, popups } from './components/constants.js'

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
})

renderInitialCards();
enableValidation(settings);