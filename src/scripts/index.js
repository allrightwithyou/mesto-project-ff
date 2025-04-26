import { initialCards } from './cards.js';
import '../pages/index.css';
import { handleOpenPopup } from '../components/popup.js';
import { createCard, cardList, handleLike } from '../components/card.js';

// Функция для открытия попапа с изображением
function openImagePopup(imageUrl, caption) {
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  const popup = document.querySelector('.popup_type_image');

  popupImage.src = imageUrl;
  popupCaption.textContent = caption;
  popupImage.alt = caption;
  handleOpenPopup(popup);
}

// Генерация карточек из initialCards
initialCards.forEach(function(element) {
  const link = element.link;
  const name = element.name;
  
  // Создаем карточку
  const cardElement = createCard(link, name, handleLike);

  // Получаем картинку карточки и добавляем обработчик клика
  const cardImage = cardElement.querySelector('.card__image');
  


  // Добавляем карточку в список
  cardList.append(cardElement);
});

// Открытие попапа для добавления нового места
document.querySelector('.profile__add-button').addEventListener('click', () => {
  handleOpenPopup('.popup_type_new-card');
});
