//import { initialCards } from './cards.js';
import '../pages/index.css';
import { createCard, cardList} from '../components/card.js';
import { openModal, addPopupListeners, closeModal } from '../components/modal.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import { getUserInfo, getInitialCards, updateUserProfile, addNewCard, deleteCardFromServer, updateAvatar} from '../components/api.js';

let userId;

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


// Находим элементы на странице
const popupForm = popupEdit.querySelector('.popup__form');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupNameInput = popupEdit.querySelector('.popup__input_type_name');
const popupDescriptionInput = popupEdit.querySelector('.popup__input_type_description');

const popupNewCardForm = popupNewCard.querySelector('.popup__form');
// Функция для открытия попапа при клике
document.querySelector('.profile__edit-button').addEventListener('click', () => {
  popupNameInput.value = profileTitle.textContent;
  popupDescriptionInput.value = profileDescription.textContent;
  clearValidation(popupForm, validationConfig); 
  handleOpenPopup('.popup_type_edit');
});


// Добавляем обработчик отправки формы
popupForm.addEventListener('submit', handleEditProfileSubmit);

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
  const submitButton = popupEdit.querySelector('.popup__button');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
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
    })
    .finally(() => {
      submitButton.textContent = originalText;
    });
}
popupNewCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const placeName = popupNewCardForm.querySelector('.popup__input_type_card-name').value;
  const imageLink = popupNewCardForm.querySelector('.popup__input_type_url').value;
  const submitButton = popupNewCard.querySelector('.popup__button');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
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
    })
    .finally(() => {
      submitButton.textContent = originalText;
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

const popupAvatar = document.querySelector('.popup_type_avatar');
const popupAvatarForm = popupAvatar.querySelector('.popup__form');
const avatarInput = popupAvatar.querySelector('.popup__input_type_avatar-url');
const avatarImage = document.querySelector('.profile__image');
const avatarEditIcon = document.querySelector('.profile__avatar-edit');
addPopupListeners(popupAvatar);
avatarEditIcon.addEventListener('click', () => {
  clearValidation(popupAvatarForm, validationConfig);
  popupAvatarForm.reset();
  openModal(popupAvatar);
});

popupAvatarForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const avatarUrl = avatarInput.value;
  const submitButton = popupAvatar.querySelector('.popup__button');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  updateAvatar(avatarUrl)
    .then(user => {
      avatarImage.style.backgroundImage =`url(${user.avatar})`;
      closeModal(popupAvatar);
    })
    .catch(err => {
      console.error('Ошибка обновления аватара:', err);
    })
    .finally(() => {
      submitButton.textContent = originalText;
    });
});


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
      avatarImage.style.backgroundImage =`url(${userData.avatar})`;

      // Отобразим карточки (придётся реализовать функцию renderCards)
      renderCards(cards, userId);
    })
    .catch(err => {
      console.error('Ошибка загрузки данных:', err);
    });
}


// Вызов загрузки данных при старте
loadPageData();
