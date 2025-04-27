import { closeModal, popupNewCard } from "./modal.js";
import { createCard, handleLike, cardList } from "./card.js";


const popupNewCardForm = popupNewCard.querySelector('.popup__form');
popupNewCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const placeName = popupNewCardForm.querySelector('.popup__input_type_card-name').value;
  const imageLink = popupNewCardForm.querySelector('.popup__input_type_url').value;

  // Создаем новую карточку
  const newCard = createCard(imageLink, placeName, handleLike);
  // Добавляем новую карточку в начало списка
  cardList.prepend(newCard);

  // Закрываем попап и очищаем форму
  closeModal(popupNewCard);
  popupNewCardForm.reset();
});
