import './pages/index.css';
import { renderInitialCards, addCard } from "./components/card.js";
import { openPopup, closePopup } from './components/modal.js';
import { loadingMessage } from './components/utils.js';
import { enableValidation, settings } from './components/validate.js';
import { addPhotoButton, popupAddPhoto, cardsContainer, avatarEditButton, 
  popupEditAvatar, avatarEditInput, inputNameCard, inputUrlCard, profileEditButton,
 popupEditProfile, profileForm, profileName, profileAbout, nameInput, jobInput, profileAvatar} from './components/constants.js'
import { fetchUser, getInitialCards, postCard, patchProfile, patchAvatar } from "./components/api.js";

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

//Редактирование имени и информации о себе
function getProfileFromServer (name, about, avatar, json) {
  name.textContent = json['name'];
  about.textContent = json['about'];
  avatar.src = json['avatar'];
};

function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  loadingMessage(evt.submitter, true);
  patchProfile(nameInput.value, jobInput.value)
  .then((json) => {
    getProfileFromServer(profileName, profileAbout, profileAvatar, json);
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
  closePopup(popupEditProfile);
})
  .catch((err) => {
  console.log(`Что-то пошло не так. Ошибка: ${err}`);
})
  .finally(() => {
  loadingMessage(evt.submitter, false)
})
};

//Добавление карточки на сервер
function handleAddPhotoSubmit (evt) {
  evt.preventDefault();
  loadingMessage(evt.submitter, true);
  postCard(inputNameCard.value, inputUrlCard.value)
  .then((json) => {
    cardsContainer.prepend(addCard(json['name'], json['link'], json['owner']['_id'], json['owner']['_id'], json['likes'], json['_id']));
    closePopup(popupAddPhoto);
    evt.target.reset();
  })
  .catch((err) => {
    console.log(`Что-то пошло не так. Ошибка: ${err}`);
  })
  .finally(() => {
    loadingMessage(evt.submitter, false)
  })
};

//Редактирование аватара
avatarEditButton.addEventListener('click', () => {
  openPopup(popupEditAvatar);
});
popupEditAvatar.addEventListener('submit', handleAvatarSubmit);

function handleAvatarSubmit (evt) {
  evt.preventDefault(); 
  loadingMessage(evt.submitter, true);
  patchAvatar(avatarEditInput.value)
  .then((json) => {
    getProfileFromServer(profileAvatar, profileName, profileAbout, json);
    closePopup(popupEditAvatar);
    profileAvatar.src = json.avatar;
    evt.target.reset();
  })
  .catch((err) => {
    console.log(`Что-то пошло не так. Ошибка: ${err}`);
  })
  .finally(() => {
    loadingMessage(evt.submitter, false)
  })
};


enableValidation(settings);