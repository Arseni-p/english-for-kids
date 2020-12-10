// eslint-disable-next-line import/prefer-default-export
export const initRepeat = () => {
  const trainModeText = document.querySelector('.train-mode');
  const playModeText = document.querySelector('.play-mode');
  const repeatStorage = 'repeatStorage';
  const currStorage =  localStorage.getItem(repeatStorage)
  const repeatList = JSON.parse(currStorage);
  const pageTitle = document.querySelector('.page-title');
  const message = {
    'nomistakes': '0 mistakes! not bad my friend!!!',
    'mistakes':'repeat',
  };

  if (playModeText.classList.contains('active-mode')) {
    playModeText.classList.remove('active-mode');
    trainModeText.classList.add('active-mode');
  };
  if ( repeatList.length === 0 && !repeatList[0] ) {
    return pageTitle.textContent = message.nomistakes;
  } else {
    pageTitle.textContent = message.mistakes;
  }
  const mainContainer = document.querySelector('.container');
  const switcher = document.getElementById('doggo');
  switcher.checked = false;
  switcher.removeAttribute('disabled');

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

  for (let i = 0; i < repeatList.length; i += 1) {
    const cardItem = document.createElement('li');
    cardItem.className = 'card__item';
    cardItem.classList.add('repeat__item')
    mainMenuList.append(cardItem);

    const cardItemImg = document.createElement('div');
    cardItemImg.className = 'item__image';
    cardItemImg.style.backgroundImage = `url('../assets/img/${repeatList[i].category.toLowerCase()}/${repeatList[i].category.toLowerCase()}-${repeatList[i].word}.png')`;
    cardItemImg.classList.add('item__image--word')
    cardItem.append(cardItemImg);

    const cardItemTitle = document.createElement('p');
    cardItemTitle.className = 'item__value';
    cardItemImg.append(cardItemTitle);

    const cardItemTitleText = document.createElement('span');
    cardItemTitleText.className = 'item__value--text';
    cardItemTitle.append(cardItemTitleText);
    cardItemTitleText.textContent = `${repeatList[i].word}`;

    const cardItemReverse = document.createElement('span');
    cardItemReverse.className = 'item__reverse-btn';
    cardItemTitle.append(cardItemReverse);
  }
  let trainMode = true;

  const soundPlay = (category, word) => {
    const wordSound = new Audio;

    if ( wordSound.canPlayType('audio/mpeg') === 'probably' ) {
      wordSound.src = `../assets/sound/${category.toLowerCase()}/${category.toLowerCase()}-${word}.mp3`
    }

    function wordSoundPlay() {
      wordSound.currentTime = 0;
      wordSound.play();
    }
    wordSoundPlay();
  }

  mainMenuList.addEventListener('click', (event) => {
    const cardItem = event.target.closest('.card__item');
    let cardName;
    if ( trainMode ) {
      if (cardItem) {
        cardName = cardItem.querySelector('.item__value--text').textContent;
      }
      repeatList.forEach(item => {
        if (cardName === item.word) {
          soundPlay(item.category, cardName);
        };
      });
    };
  });
/*
  const reversBtnList = document.querySelectorAll('.item__reverse-btn');
  const repeatWordList = document.querySelectorAll('.item__value--text');
  const reversBtnArray = [];
  repeatWordList.forEach(item => {
    reversBtnArray.push(item.textContent);
  })
  console.log(repeatWordList, reversBtnArray);
  repeatWordList.forEach(item => {
    item.addEventListener('click', (event) => {
      console.log(event.target, item.textContent)

  })
});*/
}
