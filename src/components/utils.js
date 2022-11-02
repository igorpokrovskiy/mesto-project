  export function loadingMessage(target, isLoading) {
    if (isLoading) {
      target.textContent = 'Сохранение...'
    } else {
        target.textContent = 'Сохранить';
      }
    };