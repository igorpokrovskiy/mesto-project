import { closePopupEscape } from "./modal";

export function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', closePopupEscape);
  };
  
export function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', closePopupEscape);
  };

  export function loadingMessage(target, isLoading){
    if (isLoading){
      target.textContent = 'Сохранение...'
    }
    else {
      if (target.id) {
        target.textContent = 'Создать';
      }
      else {
        target.textContent = 'Сохранить';
      }
    }
  }