'use strict';

import { menuFunc } from './js/menu.js';
import { gameStart } from './js/game-start.js';
import { mainPage } from './js/main-page.js';
import { Cards } from './js/cards-init.js';
import { cardsList } from './js/cards-list.js';
import { reverseMode } from './js/reverse-mode.js';
import { trainMode } from './js/train-mode.js';
import { playModeOn } from './js/play-mode.js';
import { playChoiceSound } from './js/play-mode.js';
import { gameFinal } from './js/play-mode.js';

const mainContainer = document.querySelector('.container');
const pageTitle = document.querySelector('.page-title');
const playBtn = document.getElementById('doggo');
const playBtnOn = document.querySelector('.play-btn');
const pointsLimit = 8;

let randomIndex = [0, 1, 2, 3, 4, 5, 6, 7]
let indexArray = [];
let soundsArray = [];
let playMode = false;
let playModeSound = false;
let points = 0;
let currentWord = 0;
let mistakes = 0;
let hashItem;
let correctChoice;
let indexOfTheme;
let themeArray;

let hashUpdate = () => {
  return hashItem = location.hash.slice(1);
}

let cardListView = () => {
  hashUpdate();
  if (hashItem === 'main-page' || hashItem === '') {
    if ( document.querySelector('.points') ) {
      document.querySelector('.points').remove();
    };
    mainPage();
  } else {
    let wordsList = new Cards(hashItem, cardsList);
    setTimeout(() => {
      wordsList.init();
    }, 500)
  }

  let currentLink = document.querySelector('.current__link');
  if ( currentLink ) {
    currentLink.classList.remove('current__link');
    let menuLinkList = document.querySelectorAll('.menu__link');
    let arrMenu = document.querySelectorAll('.menu__link');
    let arrMenuContent = [];
    arrMenu.forEach(item => {
      arrMenuContent.push(item.textContent.toLocaleLowerCase())
    })
    let currentNumber = arrMenuContent.indexOf(hashItem);
    if (hashItem === 'main-page' || hashItem === '') {
      currentNumber = 0
    }
    
    currentLink = menuLinkList[currentNumber];
    currentLink.classList.add('current__link');
  }
}

let playSound = (hashItem, soundUrl) => {
  hashItem = hashUpdate();
  soundUrl = soundsArray[currentWord];
  let playSoundOn = new Audio;

  if ( playSoundOn.canPlayType('audio/mpeg') === 'probably' ) {
    playSoundOn.src = `../assets/sound/${hashItem}/${soundUrl}`
  }

  function playSoundOnPlay() {
    playSoundOn.currentTime = 0;
    playSoundOn.play();
  }
  playSoundOnPlay();
}

document.addEventListener('DOMContentLoaded', () => {
  menuFunc();
  gameStart();
  cardListView();
})

window.addEventListener('hashchange', () => {
  document.querySelector('.card__list').classList.add('item__off');
  if (playBtnOn.classList.contains('repeat__on')) {
    playBtnOn.classList.remove('repeat__on');
  } 
  playModeSound = false;
  hashUpdate();

  setTimeout(() => {
    if (document.querySelector('.card__list')) {
      document.querySelector('.card__list').remove();
    };
    if (document.querySelector('.points')) {
      document.querySelector('.points').remove();
    };
  }, 400);

  cardListView();
  playMode = false;
});

mainContainer.addEventListener('click', (event) => {
  hashUpdate();
  let currentCard = event.target.closest('.card__item').querySelector('.item__value--text').textContent;
  let choiceItem = event.target.closest('.card__item');

  if ( !playMode ) {
    reverseMode(event, cardsList, hashItem);
    trainMode(event, cardsList, hashItem)
  } else {
    if ( playModeSound && currentCard === indexArray[currentWord] && !choiceItem.classList.contains('correct__item') ) {
      correctChoice = true;
      points++;
      currentWord++;
      playChoiceSound(correctChoice);

      setTimeout(() => {
        playSound();
      }, 1000)
  
      if ( points === pointsLimit ) {
        gameFinal(mistakes);
        playModeSound = false;
        mistakes = 0;
        setTimeout(() => {
          location.hash = 'main-page'
        }, 4000)
      } 
    } else {
      correctChoice = false;
      if ( document.querySelector('.repeat__on') && !choiceItem.classList.contains('correct__item') ) {
        mistakes++;
        playChoiceSound(correctChoice);
      }
    }
  }
});

playBtn.addEventListener('click', () => {
  if ( playMode ) {
    playMode = false;
    playModeSound = false;
  } else {
    playMode = true;
  }
});

playBtnOn.addEventListener('click', () => {
  if ( !playModeSound ) {
    window.scrollTo(0, pageTitle.offsetTop);
    let i = 0;
    points = 0;
    currentWord = 0;
    playModeOn();
    hashUpdate();
    indexOfTheme = cardsList[0].indexOf(hashItem) + 1;
    themeArray = cardsList[indexOfTheme];

    randomIndex.sort(() => Math.round(Math.random() * 100) - 50);
    randomIndex.forEach(item => {
      soundsArray[i] = themeArray[item].sound;
      indexArray[i] = themeArray[item].word;
      i++;
    })
    playModeSound = true;
    console.log(indexOfTheme, themeArray, soundsArray, indexArray);
  }
  playSound();
})