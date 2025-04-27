import { initialCards } from './cards.js';
import '../pages/index.css';
import { createCard, cardList, handleLike } from '../components/card.js';
import {openModal, addPopupListeners, closeModal } from '../components/modal.js';


// Генерация карточек из initialCards
initialCards.forEach(function(element) {
  const link = element.link;
  const name = element.name;
  
  // Создаем карточку
  const cardElement = createCard(link, name, handleLike,handleImageClick, deleteCard);

  


  // Добавляем карточку в список
  cardList.append(cardElement);
});


// перенес из modal.js
// Функция для открытия попапа по клику
export const handleOpenPopup = (popupSelector) => {
  const popup = document.querySelector(popupSelector);
  if (popup) {
    openModal(popup);
  }
};
// Функция для открытия попапа с изображением handleImageClick
export function handleImageClick(imageUrl, caption) {
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');

  popupImage.src = imageUrl;
  popupCaption.textContent = caption;
  popupImage.alt = caption;
  handleOpenPopup('.popup_type_image');
}
// Получаем попапы
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// Добавляем слушателей на попапы
addPopupListeners(popupEdit);
addPopupListeners(popupNewCard);
addPopupListeners(imagePopup);

// Открытие попапа для добавления нового места
document.querySelector('.profile__add-button').addEventListener('click', () => {
  handleOpenPopup('.popup_type_new-card');
});



//перенес из form-edit.js

// Находим элементы на странице
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupNameInput = popupEdit.querySelector('.popup__input_type_name');
const popupDescriptionInput = popupEdit.querySelector('.popup__input_type_description');
const popupForm = popupEdit.querySelector('.popup__form');

// Функция для открытия попапа при клике
document.querySelector('.profile__edit-button').addEventListener('click', () => {
  popupNameInput.value = profileTitle.textContent;
  popupDescriptionInput.value = profileDescription.textContent;
  handleOpenPopup('.popup_type_edit');
});


// Обработчик отправки формы редактирования профиля
function handleEditProfileSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное поведение формы

  // Получаем новые значения из полей ввода
  const newName = popupNameInput.value;
  const newDescription = popupDescriptionInput.value;

  // Обновляем данные на странице
  profileTitle.textContent = newName;
  profileDescription.textContent = newDescription;

  // Закрываем попап
  closeModal(popupEdit);
}

// Добавляем обработчик отправки формы
popupForm.addEventListener('submit', handleEditProfileSubmit);


//перенес из form-new.js
const popupNewCardForm = popupNewCard.querySelector('.popup__form');
popupNewCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const placeName = popupNewCardForm.querySelector('.popup__input_type_card-name').value;
  const imageLink = popupNewCardForm.querySelector('.popup__input_type_url').value;

  // Создаем новую карточку
  const newCard = createCard(imageLink, placeName, handleLike,handleImageClick, deleteCard);
  // Добавляем новую карточку в начало списка
  cardList.prepend(newCard);

  // Закрываем попап и очищаем форму
  closeModal(popupNewCard);
  popupNewCardForm.reset();
});

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardList.removeChild(cardElement);
}
