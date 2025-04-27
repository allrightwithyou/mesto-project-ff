import { initialCards } from './cards.js';
import '../pages/index.css';
import { createCard, cardList, handleLike } from '../components/card.js';



// Генерация карточек из initialCards
initialCards.forEach(function(element) {
  const link = element.link;
  const name = element.name;
  
  // Создаем карточку
  const cardElement = createCard(link, name, handleLike);

  


  // Добавляем карточку в список
  cardList.append(cardElement);
});


