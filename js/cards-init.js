'use strict';

export class Cards {
  constructor(name, cardsList) {
    this.name = name;
    this.cardsList = cardsList;
  }

  init() {
    const cardNumber = 8;
    let currPageTitle = this.name;
    const playMode = document.querySelector('.play-mode');
    const trainMode = document.querySelector('.train-mode');
    const switcher = document.getElementById('doggo');
    const playBtn = document.querySelector('.play-btn');
    switcher.checked = false;
    switcher.removeAttribute('disabled');
    if (playMode.classList.contains('active-mode')) {
      playMode.classList.remove('active-mode');
      playBtn.classList.remove('play-btn__on');
      playBtn.classList.add('play-btn__off');
      trainMode.classList.add('active-mode');

      setTimeout(() => {
        playBtn.classList.remove('play-btn__off')
      }, 250)
    }

    if (currPageTitle === 'yummy') {
      currPageTitle = 'yummy!'
    };

    document.querySelector('.page-title').textContent = `${currPageTitle}`;
    const mainContainer = document.querySelector('.container');
    const pageTitle = document.querySelector('.page-title');

    if (pageTitle.classList.contains('main-page__title')) {
      pageTitle.classList.remove('main-page__title')
    };
    
    const points = document.createElement('div');
    const pointsWrapper = document.createElement('div');
    points.className = 'points';
    pointsWrapper.className = 'points__wrapper';
    mainContainer.append(points);
    points.append(pointsWrapper);
    
    const mainMenuList = document.createElement('ul');
    mainMenuList.className = 'card__list';
    mainMenuList.classList.add('item__on');
    mainContainer.append(mainMenuList);

    let indexOfItem = this.cardsList[0].indexOf(this.name) + 1;
    let itemArray = this.cardsList[indexOfItem];

    for (let i = 0; i < cardNumber; i++) {
      const cardItem = document.createElement('li');
      cardItem.className = 'card__item';
      mainMenuList.append(cardItem);

      const cardItemImg = document.createElement('div');
      cardItemImg.className = 'item__image';
      cardItemImg.style.backgroundImage = `url('../assets/img/${itemArray[i].imgUrl}')`;
      cardItemImg.classList.add('item__image--word')
      cardItem.append(cardItemImg);

      const cardItemTitle = document.createElement('p');
      cardItemTitle.className = 'item__value';
      cardItemImg.append(cardItemTitle);

      const cardItemTitleText = document.createElement('span');
      cardItemTitleText.className = 'item__value--text';
      cardItemTitle.append(cardItemTitleText);
      cardItemTitleText.textContent = `${itemArray[i].word}`;

      const cardItemReverse = document.createElement('span');
      cardItemReverse.className = 'item__reverse-btn';
      cardItemTitle.append(cardItemReverse);
    }
  }
}