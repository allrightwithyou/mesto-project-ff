// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(link, name){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardName = cardElement.querySelector('.card__title');
  const cardLink = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardLink.src = link;
  cardName.textContent = name;
  cardLink.alt = name;

  deleteButton.addEventListener('click', function () {
    deleteCard(cardElement);
  });

  return cardElement;
};
// @todo: Функция удаления карточки
function deleteCard(cardElement){
  cardList.removeChild(cardElement)
};
// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  const cardElement = createCard(element.link , element.name);
  cardList.append(cardElement);
});

