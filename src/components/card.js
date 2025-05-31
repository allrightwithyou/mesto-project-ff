import { likeCard, unlikeCard } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;
export const cardList = document.querySelector('.places__list');

export function createCard(link, name, handleImageClick, deleteCard, cardId, ownerId, userId, likes = []) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardName = cardElement.querySelector('.card__title');
  const cardLink = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.like-count');

  // Установка содержимого
  cardLink.src = link;
  cardLink.alt = name;
  cardName.textContent = name;
  likeCount.textContent = likes.length;

  // Проставляем активный лайк, если пользователь уже лайкал
  const isLiked = likes.some(user => user._id === userId);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // Обработчик клика по изображению
  cardLink.addEventListener('click', () => handleImageClick(link, name));

  // Обработчик лайка
  likeButton.addEventListener('click', () => {
    const currentlyLiked = likeButton.classList.contains('card__like-button_is-active');
    const action = currentlyLiked ? unlikeCard : likeCard;

    action(cardId)
      .then(updatedCard => {
        likeButton.classList.toggle('card__like-button_is-active');
        likeCount.textContent = updatedCard.likes.length;
      })
      .catch(err => console.error('Ошибка при изменении лайка:', err));
  });

  // Обработчик удаления
  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement, cardId);
  });

  return cardElement;
}
