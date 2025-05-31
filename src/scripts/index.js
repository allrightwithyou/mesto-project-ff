//import { initialCards } from './cards.js';
import '../pages/index.css';
import { createCard, cardList} from '../components/card.js';
import { openModal, addPopupListeners, closeModal } from '../components/modal.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import { getUserInfo, getInitialCards, updateUserProfile, addNewCard, deleteCardFromServer} from '../components/api.js';

let userId;

/* Генерация карточек из initialCards
initialCards.forEach(function(element) {
  const link = element.link;
  const name = element.name;
  
  // Создаем карточку
  const cardElement = createCard(link, name, handleLike,handleImageClick, deleteCard);

  


  // Добавляем карточку в список
  cardList.append(cardElement);
});
*/

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
  clearValidation(popupForm, validationConfig); 
  handleOpenPopup('.popup_type_edit');
});


/* Обработчик отправки формы редактирования профиля
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
}*/

// Добавляем обработчик отправки формы
popupForm.addEventListener('submit', handleEditProfileSubmit);
const popupNewCardForm = popupNewCard.querySelector('.popup__form');

/*перенес из form-new.js

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
}); */

/* @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardList.removeChild(cardElement);
}*/

// Настройки для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// Включение валидации
enableValidation(validationConfig);

// Основная функция загрузки данных
function loadPageData() {
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cards]) => {

      // Сохраняем userId для дальнейшего использования (например, чтобы показывать кнопки удаления)
      userId = userData._id;

      // Отобразим данные пользователя
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      document.querySelector('.profile__image').style.backgroundImage =`url(${userData.avatar})`;

      // Отобразим карточки (придётся реализовать функцию renderCards)
      renderCards(cards, userId);
    })
    .catch(err => {
      console.error('Ошибка загрузки данных:', err);
    });
}

// Функция отрисовки карточек с сервера
function renderCards(cards, userId) {
  cardList.innerHTML = ''; // Очистить список перед добавлением

  cards.forEach(card => {
    const cardElement = createCard(
      card.link,
      card.name,
      handleImageClick,
      deleteCard,
      card._id,
      card.owner._id,
      userId,
      card.likes
    );

    // Скрываем кнопку удаления, если карточка чужая
    if (card.owner._id !== userId) {
      const deleteButton = cardElement.querySelector('.card__delete-button');
      if (deleteButton) {
        deleteButton.style.display = 'none';
      }
    }

    cardList.append(cardElement);
  });
}


function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  const newName = popupNameInput.value;
  const newDescription = popupDescriptionInput.value;

  // Добавляем отправку данных на сервер
  updateUserProfile(newName, newDescription)
    .then(updatedUser => {
      // Обновляем данные на странице только после успешного ответа сервера
      profileTitle.textContent = updatedUser.name;
      profileDescription.textContent = updatedUser.about;
      closeModal(popupEdit);
    })
    .catch(err => {
      console.error('Ошибка обновления профиля:', err);
    });
}
popupNewCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const placeName = popupNewCardForm.querySelector('.popup__input_type_card-name').value;
  const imageLink = popupNewCardForm.querySelector('.popup__input_type_url').value;

  addNewCard(placeName, imageLink)
    .then(cardData => {
      const newCard = createCard(
        cardData.link,
        cardData.name,
        handleLike,
        handleImageClick,
        deleteCard,
        cardData._id,
        cardData.owner._id,
        userId 
      );
      cardList.prepend(newCard);

      closeModal(popupNewCard);
      popupNewCardForm.reset();
    })
    .catch(err => {
      console.error('Ошибка добавления карточки:', err);
    });
});



function deleteCard(cardElement, cardId) {
  deleteCardFromServer(cardId)
    .then(() => {
      cardElement.remove(); // удаляем карточку из DOM
    })
    .catch(err => {
      console.error('Ошибка удаления карточки:', err);
    });
}



// Вызов загрузки данных при старте
loadPageData();
