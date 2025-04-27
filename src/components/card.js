import { openImagePopup } from "../scripts/index.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
export const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
export function createCard(link, name, handleLike, openImagePopup) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardName = cardElement.querySelector('.card__title');
  const cardLink = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  // Добавляем обработчик события на лайк
  likeButton.addEventListener('click', handleLike);

  cardLink.src = link;
  cardLink.alt = name;
  cardName.textContent = name;

  // Получаем картинку карточки и добавляем обработчик клика
  const cardImage = cardElement.querySelector('.card__image');

  // Добавляем обработчик клика на картинку, чтобы открыть попап с изображением
  cardImage.addEventListener('click', () => {
    openImagePopup(link, name); // Передаем ссылку на изображение и название
  });

  deleteButton.addEventListener('click', function () {
    deleteCard(cardElement);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardList.removeChild(cardElement);
}

// Обработчик для лайка
export function handleLike(evt) {
 
 // Переключаем класс активности лайка
 evt.target.classList.toggle('card__like-button_is-active');
}

