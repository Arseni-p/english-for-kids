// eslint-disable-next-line import/prefer-default-export
export const initStats = (statsList, storageName) => {

  if (localStorage.getItem(storageName)) {
    let storageValue = localStorage.getItem(storageName);
    statsList = JSON.parse(storageValue);
    console.log(statsList)
  }
  
  const buttonsNumber = 2;
  const buttonClasses = [
    {
      'class': 'stats-btn__top',
      'text': 'repeat top',
    },
    {
      'class': 'stats-btn__reset',
      'text': 'reset',
    },
  ];
  const cellNames = ['#', 'Word', 'Translation', 'Category', 'Train', 'Correct', 'Mistakes', '%'];
  const totalRows = 65;
  const totalCells = 8;
  const mainContainer = document.querySelector('.container');
  const pageTitle = document.querySelector('.page-title');
  const playMode = document.getElementById('doggo');
  const playBtnOn = document.querySelector('.play-btn__on');
  
  pageTitle.textContent = 'Stats';
  playMode.setAttribute('disabled', 'disabled');
  playMode.checked = false;

  if ( playBtnOn ) {
    playBtnOn.classList.remove('play-btn__on');
  }

  function initText(index, num, item) {
    switch(num) {
      case 1:
        item.textContent = statsList[index - 1].word;
        break;
      case 2:
        item.textContent = statsList[index - 1].translation;
        break;
      case 3:
        item.textContent = statsList[index - 1].category;
        break;
      case 4:
        item.textContent = statsList[index - 1].train;
        item.classList.add('stats__count');
        break;
      case 5:
        item.textContent = statsList[index - 1].correct;
        item.classList.add('stats__count');
        break;
      case 6:
        item.textContent = statsList[index - 1].mistakes;
        item.classList.add('stats__count');
        break;
      case 7:
        item.textContent = statsList[index - 1].percentage;
        item.classList.add('stats__count--percentage');
        break;
    }
  }

  const statsWrapper = document.createElement('div');
  statsWrapper.className = 'stats__wrapper';
  mainContainer.append(statsWrapper);

  const btnWrapper = document.createElement('div');
  btnWrapper.className = 'stats-btn__wrapper';
  statsWrapper.append(btnWrapper);

  for (let i = 0; i < buttonsNumber; i += 1) {
    const btnStats = document.createElement('button');
    btnStats.className = buttonClasses[i].class;
    btnStats.classList.add('stats-btn')
    btnStats.textContent = buttonClasses[i].text;
    btnStats.setAttribute('type', 'button');
    btnWrapper.append(btnStats)
  }

  const statsTable = document.createElement('table');
  statsTable.className = 'stats__table';
  statsWrapper.append(statsTable);

  for (let i = 0; i < totalRows; i += 1) {
    const tableRow = document.createElement('tr');
    tableRow.classList = 'table__row';
    statsTable.append(tableRow);

    for (let j = 0; j < totalCells; j += 1) {
      let tableCell;
      if (i === 0) {
        tableCell = document.createElement('th');
      } else {
        tableCell = document.createElement('td')
      };
      tableCell.classList = 'table__cell';
      tableRow.append(tableCell);

      if (i === 0) {
        tableCell.textContent = cellNames[j];
      }

      if ( i > 0 && j === 0) {
        tableCell.textContent = i;
      }
      if ( i > 0 && j > 0 ) {
        initText(i, j, tableCell);
      }
    }
  }
  
  const btnReset = document.querySelector('.stats-btn__reset');
  btnReset.addEventListener('click', () => {
    const statsCount = document.querySelectorAll('.stats__count');
    const statsCountPercentage = document.querySelectorAll('.stats__count--percentage');
    statsCount.forEach(item => {
      item.textContent = 0;
    });
    statsCountPercentage.forEach(item => {
      item.textContent = '0'+'.'+'00';
    });
    localStorage.removeItem(storageName);
  })
}

export const gameStats = (playMode, statsList, storageName, randomWordForTrue, randomWordForFalse) => {
  const currentWordValue = event.target.closest('.card__item').querySelector('.item__value--text').textContent;

  if (localStorage.getItem(storageName)) {
    let storageValue = localStorage.getItem(storageName);
    statsList = JSON.parse(storageValue);
  }

  function percentageUpdate(item, correct, mistakes) {
    let num = (correct / (correct + mistakes)) * 100;
    item.percentage =  num.toFixed(2);//Math.floor(num * 100) / 100;
  }

  
  statsList.forEach(item => {
    if ('word' in item) {
      if ( !playMode && currentWordValue === item.word ) {
        item.train = +item.train + 1;
      };
      if ( playMode && document.querySelector('.repeat__on') ) {
        if ( currentWordValue === item.word && currentWordValue === randomWordForTrue ) {
          item.correct = +item.correct + 1;
          percentageUpdate(item, +item.correct, +item.mistakes);
        };
        if ( randomWordForFalse === item.word && currentWordValue !== randomWordForTrue ) {
          item.mistakes = +item.mistakes + 1;
          percentageUpdate(item, +item.correct, +item.mistakes);
          
        }
      }
    }
  })

  localStorage.setItem(storageName, JSON.stringify(statsList))
}