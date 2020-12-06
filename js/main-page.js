'use strict'

export let itemsTitle = [
  {
    'imageUrl': 'icon-colors.png',
    'title': 'colors',
  },
  {
    'imageUrl': 'icon-sports.png',
    'title': 'sports',
  },
  {
    'imageUrl': 'icon-family.png',
    'title': 'family',
  },
  {
    'imageUrl': 'icon-animals.png',
    'title': 'animals',
  },
  {
    'imageUrl': 'icon-body.png',
    'title': 'body',
  },
  {
    'imageUrl': 'icon-yummy.png',
    'title': 'yummy',
  },
  {
    'imageUrl': 'icon-home.png',
    'title': 'home',
  },
  {
    'imageUrl': 'icon-nature.png',
    'title': 'nature',
  },
]

export let mainPage = () => {
  const cardNumber = 8;
  const switcher = document.getElementById('doggo').setAttribute('disabled', 'disabled');
  const playMode = document.getElementById('doggo').checked = false;
  const playBtnOn = document.querySelector('.play-btn__on');
  const mainContainer = document.querySelector('.container');
  const pageTitle = document.querySelector('.page-title');
  pageTitle.textContent = 'English for kids';

  if (!pageTitle.classList.contains('main-page__title')) {
    pageTitle.classList.add('main-page__title')
  };

  if ( playBtnOn ) {
    playBtnOn.classList.remove('play-btn__on');
  }

  const mainMenuList = document.createElement('ul');
  mainMenuList.className = 'main-menu__list card__list';
  mainContainer.append(mainMenuList);


  for (let i = 0; i < cardNumber; i++) {
    const cardItem = document.createElement('li');
    cardItem.className = 'card__item';
    mainMenuList.append(cardItem);

    const itemLink = document.createElement('a');
    itemLink.className = 'item__link';
    itemLink.setAttribute('href', `#${itemsTitle[i].title}`);
    cardItem.append(itemLink)

    const cardItemImg = document.createElement('div');
    cardItemImg.className = 'item__image';
    cardItemImg.style.backgroundImage = `url('../assets/img/mainpage/${itemsTitle[i].imageUrl}')`;
    itemLink.append(cardItemImg);

    const cardItemTitle = document.createElement('p');
    cardItemTitle.className = 'item__value';
    itemLink.append(cardItemTitle);
    cardItemTitle.textContent = `${itemsTitle[i].title}`;
  }
}