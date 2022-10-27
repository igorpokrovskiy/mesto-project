import './pages/index.css';
import { renderInitialCards, handleAddPhotoSubmit } from "./components/card.js";
import { openPopup } from './components/utils.js';
import {profileEditButton,popupEditProfile, profileForm, handleProfileFormSubmit, profileName, profileAbout, nameInput, jobInput} from "./components/modal.js"
import { enableValidation } from './components/validate.js';
import { addPhotoButton, popupAddPhoto } from './components/constants.js'

profileEditButton.addEventListener('click', () => {
    openPopup(popupEditProfile);
  });
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;

addPhotoButton.addEventListener('click', () => {
    openPopup(popupAddPhoto);
  });
popupAddPhoto.addEventListener('submit', handleAddPhotoSubmit); 
profileForm.addEventListener('submit', handleProfileFormSubmit); 

renderInitialCards();
enableValidation();