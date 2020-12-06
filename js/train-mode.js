'use strict'

export let trainMode = (event, cardsList, hashItem) => {
  let cardItem = event.target.closest('.card__item');
  let cardName = cardItem.querySelector('.item__value--text').textContent;
  let indexOfItem = cardsList[0].indexOf(hashItem) + 1;
  let itemArray = cardsList[indexOfItem];
  let soundUrl;
  
  itemArray.forEach(item => {
    if ( cardName === item.word ) {
      soundUrl = item.sound;
    }
  })

  let soundPlay = () => {
    let wordSound = new Audio;

    if ( wordSound.canPlayType('audio/mpeg') === 'probably' ) {
      wordSound.src = `../assets/sound/${hashItem}/${soundUrl}`
    }

    function wordSoundPlay() {
      wordSound.currentTime = 0;
      wordSound.play();
    }

    wordSoundPlay();
  }

  if ( cardItem ) {
    soundPlay();
  }
}