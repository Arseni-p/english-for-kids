export const reverseMode = (event, cardsList, hashItem) => {
  const repeatStorage = 'repeatStorage';
  let currStorage;
  let repeatList;
  let cardItem;
  let cardNameWrap ;
  let cardName;
  let currEnglCard;
  let reverseMode = false;
  const reverseBtn = event.target.classList.contains('item__reverse-btn');
  
  if (event.target.closest('.item__value')) {
    cardNameWrap = event.target.closest('.item__value');
    cardName = cardNameWrap.querySelector('.item__value--text');
    currEnglCard = cardName.textContent;
  }
  
  const indexOfItem = cardsList[0].indexOf(hashItem) + 1;
  const itemArray = cardsList[indexOfItem];

  if ( reverseBtn ) {
    cardItem = event.target.closest('.card__item');
    if (cardItem) {
      cardItem.classList.add('card__item--reverse');
    }
    reverseMode = true;
    if (cardItem.classList.contains('repeat__item')) {
      currStorage = localStorage.getItem(repeatStorage);
      repeatList = JSON.parse(currStorage);
    }

    itemArray.forEach(item => {
      if ( cardName.textContent === item.word ) {
        cardName.textContent = item.translation;
      };
    })

    if (cardItem.classList.contains('repeat__item')) {
      repeatList.forEach(item => {
        if (cardName.textContent === item.word) {
          cardName.textContent = item.translation;
        }
      })
    }
  }

  if ( reverseMode )  {
    cardItem.addEventListener('mouseleave', () => {
      cardItem.classList.remove('card__item--reverse');
      cardName.textContent = currEnglCard;
    })
  }
}