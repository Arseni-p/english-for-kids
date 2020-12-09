export const trainMode = (event, cardsList, hashItem) => {
  const cardItem = event.target.closest('.card__item');
  let cardName;
  if (cardItem && cardItem.querySelector('.item__value--text')) {
    cardName = cardItem.querySelector('.item__value--text').textContent;
  }
  const indexOfItem = cardsList[0].indexOf(hashItem) + 1;
  const itemArray = cardsList[indexOfItem];
  let soundUrl;
  
  itemArray.forEach(item => {
    if ( cardName === item.word ) {
      soundUrl = item.sound;
    }
  })

  const soundPlay = () => {
    const wordSound = new Audio;

    if ( wordSound.canPlayType('audio/mpeg') === 'probably' ) {
      wordSound.src = `../assets/sound/${hashItem}/${soundUrl}`
    }

    function wordSoundPlay() {
      wordSound.currentTime = 0;
      wordSound.play();
    }

    wordSoundPlay();
  }

  if ( cardItem && soundUrl ) {
    soundPlay();
  }
}