// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
// @todo: DOM узлы
// @todo: Функция создания карточки
function createCard(link, name){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').alt = name;
  cardList.append(cardElement); 
  deleteButton.addEventListener('click', function () {
    deleteCard(cardElement);
  })
};
// @todo: Функция удаления карточки
function deleteCard(cardElement){
  cardList.removeChild(cardElement)
};
// @todo: Вывести карточки на страницу
initialCards.forEach(function(element){
  const link = element.link;
  const name = element.name;
  createCard(link, name);
});

