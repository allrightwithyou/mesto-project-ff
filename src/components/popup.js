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

// Функция для открытия попапа по клику
export const handleOpenPopup = (popupSelector) => {
  const popup = document.querySelector(popupSelector);
  if (popup) {
    openModal(popup);
  }
};
// Функция для открытия попапа с изображением
export function openImagePopup(imageUrl, caption) {
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');

  popupImage.src = imageUrl;
  popupCaption.textContent = caption;
  popupImage.alt = caption;
  handleOpenPopup('.popup_type_image');
}
// Получаем попапы
const profileEditPopup = document.querySelector('.popup_type_edit');
const cardAddPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// Добавляем слушателей на попапы
addPopupListeners(profileEditPopup);
addPopupListeners(cardAddPopup);
addPopupListeners(imagePopup);


