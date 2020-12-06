'use strict'

export let playModeOn = (correctChoice) => {
  const playBtn = document.querySelector('.play-btn');
  if (!playBtn.classList.contains('repeat__on')) {
    playBtn.classList.add('repeat__on');
  }
}

export let playChoiceSound = (correctChoice) => {
  const pointsArea = document.querySelector('.points__wrapper');
  
  function createStar() {
    let star = document.createElement('span');
    star.className = 'star';
    pointsArea.append(star);

    if ( !correctChoice ) {
      star.classList.add('star__error')
    }
  }

  let playError = new Audio;
  if ( playError.canPlayType('audio/mpeg') === 'probably' ) {
    playError.src = '../assets/sound/game/error.mp3'
  }
  function playErrorOn() {
    playError.currentTime = 0;
    playError.play();
  }

  let playCorrect = new Audio;
  if ( playCorrect.canPlayType('audio/mpeg') === 'probably' ) {
    playCorrect.src = '../assets/sound/game/correct.mp3'
  }
  function playCorrectOn() {
    playCorrect.currentTime = 0;
    playCorrect.play();
  }

  let correctItem = event.target.closest('.card__item');

  if ( correctChoice ) {
    playCorrectOn();
    correctItem.classList.add('correct__item');
    correctItem.setAttribute('disabled', 'disabled');
  } else {
    playErrorOn();
  };

  createStar();
}

export let gameFinal = (mistakes) => {
  const finalMessage = document.querySelector('.final-message');
  const mistakesCount = document.querySelector('.mistakes__count');
  const plural = document.querySelector('.plural');
  if ( mistakes === 1 ) {
    plural.textContent = '';
  } else {
    plural.textContent = 's';
  };

  mistakesCount.textContent = mistakes;
  finalMessage.classList.add('final-message__on');
  let finalSound = new Audio ;

  if ( mistakes > 0 ) {
    finalMessage.classList.add('failure');
    finalSound.src = '../assets/sound/game/final-failure.mp3';
  } else {
    finalMessage.classList.add('success');
    finalSound.src = '../assets/sound/game/final-success.mp3'
  }
  function finalSoundOn() {
    finalSound.currentTime = 0;
    finalSound.play()
  }

  finalSoundOn();
  
  setTimeout(()=> {
    finalMessage.classList.add('final-message__off');
  }, 7000);

  setTimeout(()=> {
    finalMessage.classList.remove('final-message__off');
    finalMessage.classList.remove('failure');
    finalMessage.classList.remove('success');
    finalMessage.classList.remove('final-message__on');
  }, 11000)
}

