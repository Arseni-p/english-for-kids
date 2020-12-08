import './css/burger-menu.css';
import './css/common.css';
import './css/container.css';
import './css/footer.css';
import './css/header.css';
import './css/playmode.css';
import './css/start-page.css';
import './css/switcher.css';
import './css/stats.css';


import { menuFunc } from './js/menu.js';
import { gameStart } from './js/game-start.js';
import { mainPage } from './js/main-page.js';
import { Cards } from './js/cards-init.js';
import { cardsList } from './js/cards-list.js';
import { statsList } from './js/stats-list.js';
import { reverseMode } from './js/reverse-mode.js';
import { trainMode } from './js/train-mode.js';
import { playModeOn , playChoiceSound , gameFinal } from './js/play-mode.js';
import { initStats, gameStats, sortStats } from './js/stats.js';

const mainContainer = document.querySelector('.container');
const pageTitle = document.querySelector('.page-title');
const playBtn = document.getElementById('doggo');
const playBtnOn = document.querySelector('.play-btn');
const pointsLimit = 8;
const storageName = 'englishForKids';
const randomIndex = [0, 1, 2, 3, 4, 5, 6, 7]
const indexArray = [];
const soundsArray = [];
let playMode = false;
let playModeSound = false;
let points = 0;
let currentWord = 0;
let mistakes = 0;
let hashItem;
let correctChoice;
let indexOfTheme;
let themeArray;

const hashUpdate = () => hashItem = location.hash.slice(1);

const statsListStorage = () => {
  localStorage.setItem(storageName, JSON.stringify(statsList))
}

const cardListView = () => {
  hashUpdate();
  if ( (hashItem === 'main-page' || hashItem === '') || hashItem === 'stats') {
    if ( document.querySelector('.points') ) {
      document.querySelector('.points').remove();
    };
    if ( hashItem === 'main-page' || hashItem === '' ) {
      mainPage();
    };
    if ( hashItem === 'stats' ) {
      initStats(statsList, storageName);
      sortStats(storageName, statsList);
    }
  } else {
    const wordsList = new Cards(hashItem, cardsList);
    setTimeout(() => {
      wordsList.init();
    }, 500)
  }

  let currentLink = document.querySelector('.current__link');
  if ( currentLink ) {
    currentLink.classList.remove('current__link');
    const menuLinkList = document.querySelectorAll('.menu__link');
    const arrMenu = document.querySelectorAll('.menu__link');
    const arrMenuContent = [];
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

const playSound = (hashItem, soundUrl) => {
  hashItem = hashUpdate();
  soundUrl = soundsArray[currentWord];
  const playSoundOn = new Audio;

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
  if (!localStorage.getItem(storageName)) {
    console.log('no local. lets init');
    statsListStorage();
  }
  menuFunc();
  gameStart();
  cardListView();
})

window.addEventListener('hashchange', () => {
  const currList = document.querySelector('.card__list');
  const currStats = document.querySelector('.stats__wrapper');
  if (currList) {
    currList.classList.add('item__off');
  };
  if (currStats) {
    currStats.classList.add('item__off');
  };
  if (playBtnOn.classList.contains('repeat__on')) {
    playBtnOn.classList.remove('repeat__on');
  };
  
  playModeSound = false;
  mistakes = 0;
  hashUpdate();

  setTimeout(() => {
    if (currList) {
      currList.remove();
    };
    if (currStats) {
      currStats.remove();
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
  const currentCard = event.target.closest('.card__item').querySelector('.item__value--text').textContent;
  const choiceItem = event.target.closest('.card__item');

  if ( !playMode ) {
    reverseMode(event, cardsList, hashItem);
    trainMode(event, cardsList, hashItem)
  } else if ( playModeSound && currentCard === indexArray[currentWord] && !choiceItem.classList.contains('correct__item') ) {
      correctChoice = true;
      points += 1;
      currentWord += 1;
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
        mistakes += 1;
        playChoiceSound(correctChoice);
      }
    }

    const randomWordForTrue = indexArray[currentWord - 1];
    const randomWordForFalse = indexArray[currentWord];
    gameStats(playMode, statsList, storageName, randomWordForTrue, randomWordForFalse);
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
      i += 1;
    })
    playModeSound = true;
  }
  playSound();
})
