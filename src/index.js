import './pages/index.css';
import { create, addPhotoSubmitHandler } from "./components/card.js";
import { addPhotoButton, popupAddPhoto, popupAddPhotoClose } from './components/utils.js';
import {profileEditButton,popupEditProfile, popupEditProfileClose, 
    openPopup, closePopup,formEdit ,closePopupEscape, overlayClickClose, formSubmitHandler} from "./components/modal.js"
import { enableValidation,setEventListeners } from './components/validate.js';

profileEditButton.addEventListener('click', () => {
    openPopup(popupEditProfile);
  });
popupEditProfileClose.addEventListener('click', () => {
    closePopup(popupEditProfile);
  });

addPhotoButton.addEventListener('click', () => {
    openPopup(popupAddPhoto);
  });
popupAddPhotoClose.addEventListener('click', () => {
    closePopup(popupAddPhoto);
  });
popupAddPhoto.addEventListener('submit', addPhotoSubmitHandler); 
formEdit.addEventListener('submit', formSubmitHandler); 

setEventListeners(formEdit);
setEventListeners(popupAddPhoto);
enableValidation();