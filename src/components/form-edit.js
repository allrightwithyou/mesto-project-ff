
import { handleOpenPopup, closeModal } from "./popup";

// Находим элементы на странице
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupEdit = document.querySelector('.popup_type_edit');
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
