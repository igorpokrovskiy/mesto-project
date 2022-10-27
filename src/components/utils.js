import { closePopupEscape } from "./modal";
const popups = document.querySelectorAll('.popup')
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
export function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', closePopupEscape);
  }
  
export function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', closePopupEscape);
  }