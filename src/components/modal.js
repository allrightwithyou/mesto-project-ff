// Обработчик закрытия попапа по нажатию клавиши Escape
const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    if (popup) {
      closeModal(popup);
    }
  }
};

// Функция для открытия попапа
export const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscKeyUp);
};

// Функция для закрытия попапа
export const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  modal.classList.add('popup_is-animated');
  document.removeEventListener("keydown", handleEscKeyUp);
  
};

// Добавление слушателей событий для кнопок закрытия попапа и клика по области попапа
export const addPopupListeners = (popupElement) => {
  const closeButton = popupElement.querySelector(".popup__close");
  
  closeButton.addEventListener("click", () => {
    closeModal(popupElement);
  });

  // Закрытие попапа при клике на область вне попапа
  popupElement.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup")) {
      closeModal(popupElement);
    }
  });
};


