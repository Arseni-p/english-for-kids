export const gameStart = () => {
  const switcherElement = document.querySelector('input[type=checkbox]');
  const playMode = document.querySelector('.play-mode');
  const trainMode = document.querySelector('.train-mode');

  switcherElement.addEventListener('change', () => {
    const cardList = document.querySelectorAll('.card__item');
    const playBtn = document.querySelector('.play-btn');
    const correctItems = document.querySelectorAll('.correct__item');
    const starsList = document.querySelector('.points__wrapper');

    if ( starsList && starsList.querySelector('.star') ) {
      starsList.innerHTML = '';
    }

    if ( correctItems ) {
      correctItems.forEach(item => {
        item.classList.remove('correct__item');
      });
    }

    if (trainMode.classList.contains('active-mode')) {
      trainMode.classList.remove('active-mode');
      playMode.classList.add('active-mode');
      playBtn.classList.add('play-btn__on');

      for (let i = 0; i < cardList.length; i++) {
        cardList[i].classList.add('playmode')
      }
    } else {
      playMode.classList.remove('active-mode');
      playBtn.classList.remove('play-btn__on');
      playBtn.classList.remove('repeat__on');
      playBtn.classList.add('play-btn__off');
      trainMode.classList.add('active-mode');
      cardList.forEach(item => {
        item.classList.remove('playmode')
      })
      
      setTimeout(() => {
        playBtn.classList.remove('play-btn__off')
      }, 250)
    }
  });
}

