

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
export const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
export function createCard(link, name, handleLike, handleImageClick, deleteCard) {
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

  cardLink.addEventListener('click', () => handleImageClick(link, name));
  

  
  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);  // Вызываем переданный обработчик для удаления
  });
  return cardElement;
}


// Обработчик для лайка
export function handleLike(evt) {
 
 // Переключаем класс активности лайка
 evt.target.classList.toggle('card__like-button_is-active');
}

