// eslint-disable-next-line import/prefer-default-export
export const initStats = (statsList, storageName) => {
  if (localStorage.getItem(storageName)) {
    let storageValue = localStorage.getItem(storageName);
    statsList = JSON.parse(storageValue);
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
        item.classList.add('word');
        break;
      case 2:
        item.textContent = statsList[index - 1].translation;
        item.classList.add('translation');
        break;
      case 3:
        item.textContent = statsList[index - 1].category;
        item.classList.add('category');
        break;
      case 4:
        item.textContent = statsList[index - 1].train;
        item.classList.add('train__count');
        item.classList.add('stats__count');
        break;
      case 5:
        item.textContent = statsList[index - 1].correct;
        item.classList.add('correct__count');
        item.classList.add('stats__count');
        break;
      case 6:
        item.textContent = statsList[index - 1].mistakes;
        item.classList.add('fail__count');
        item.classList.add('stats__count');
        break;
      case 7:
        item.textContent = statsList[index - 1].percentage;
        item.classList.add('percentage__count');
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
    tableRow.className = 'table__row';
    statsTable.append(tableRow);

    for (let j = 0; j < totalCells; j += 1) {
      let tableCell;
      if (i === 0) {
        tableCell = document.createElement('th');
        tableCell.classList.add('table__head');
      } else {
        tableCell = document.createElement('td')
      };
      tableCell.classList.add('table__cell');
      if (i > 0 && j === 0) {
        tableCell.classList.add('numb');
      }
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
      item.textContent = 0;
    });
    localStorage.removeItem(storageName);
  });

  const repeatTopBtn = document.querySelector('.stats-btn__top');
  repeatTopBtn.addEventListener('click', () => {
    const repeatStorage = 'repeatStorage';
    if (localStorage.getItem(storageName)) {
      let storageValue = localStorage.getItem(storageName);
      statsList = JSON.parse(storageValue);
    };
    const currList = statsList;
    currList.forEach(item => {
      if ( parseInt(item.mistakes) > 0 || (parseInt(item.correct) > 0 && parseInt(item.percentage) === 100) ) {
        item.percentage = 100 - parseInt(item.percentage);
      }
    })
    currList.sort((a, b) => a.percentage < b.percentage ? 1 : -1);
    console.log('!!!', currList)
    let repeatList = [];
    let repeatListLength = 8;
    for (let i = 0; i < repeatListLength; i += 1) {
      if (parseInt(currList[i].mistakes) > 0 ) {
        repeatList.push(currList[i])
      }
    };
    localStorage.setItem(repeatStorage, JSON.stringify(repeatList))
    location.hash = 'repeat';
  })
}

export const gameStats = (playMode, statsList, storageName, randomWordForTrue, randomWordForFalse) => {
  let currentWordValue;
  const currentWordValueItem = event.target.closest('.card__item');
  if (currentWordValueItem && currentWordValueItem.querySelector('.item__value--text')) {
    currentWordValue = currentWordValueItem.querySelector('.item__value--text').textContent;
  } 

  if (localStorage.getItem(storageName)) {
    let storageValue = localStorage.getItem(storageName);
    statsList = JSON.parse(storageValue);
  }

  function percentageUpdate(item, correct, mistakes) {
    let num = (correct / (correct + mistakes)) * 100;
    item.percentage =  Math.round(num);
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

export const sortStats = (storageName, statsList, topRange) => {
  const tableHead = document.querySelectorAll('.table__head');
  const btnPercentage = tableHead[tableHead.length - 1];
  const btnMistakes = tableHead[tableHead.length - 2];
  const btnCorrect = tableHead[tableHead.length - 3];
  const btnTrain = tableHead[tableHead.length - 4];
  const btnNumb = tableHead[tableHead.length - 8];
  const btnWord = tableHead[tableHead.length - 7];
  const btnTranslation = tableHead[tableHead.length - 6];
  const btnCategory = tableHead[tableHead.length - 5];

  function storageUpdate() {
    let storageValue = localStorage.getItem(storageName);
    statsList = JSON.parse(storageValue);
  };

  function sortCells() {
    const wordCells = document.querySelectorAll('.word');
    const translationCells = document.querySelectorAll('.translation');
    const categoryCells = document.querySelectorAll('.category');
    const trainCells = document.querySelectorAll('.train__count');
    const correctCells = document.querySelectorAll('.correct__count');
    const mistakesCells = document.querySelectorAll('.fail__count');
    const percentageCells = document.querySelectorAll('.percentage__count');

    for (let i = 0; i < statsList.length; i += 1) {
      wordCells[i].textContent = statsList[i].word;
      translationCells[i].textContent = statsList[i].translation;
      categoryCells[i].textContent = statsList[i].category;
      trainCells[i].textContent = statsList[i].train;
      correctCells[i].textContent = statsList[i].correct;
      mistakesCells[i].textContent = statsList[i].mistakes;
      percentageCells[i].textContent = statsList[i].percentage;
    }
  }

  btnPercentage.addEventListener('click', () => {
    if ( localStorage.getItem(storageName) ) {
      storageUpdate();
      if (!topRange) {
        statsList.sort((a, b) => a.percentage < b.percentage ? 1 : -1);
        topRange = true;
      } else {
        statsList.sort((a, b) => a.percentage > b.percentage ? 1 : -1);
        topRange = false;
      }
      const percentageCells = document.querySelectorAll('.percentage__count');
      sortCells()
    }
  });

  btnMistakes.addEventListener('click', () => {
    if ( localStorage.getItem(storageName) ) {
      storageUpdate();
      if (!topRange) {
        statsList.sort((a, b) => a.mistakes < b.mistakes ? 1 : -1);
        topRange = true;
      } else {
        statsList.sort((a, b) => a.mistakes > b.mistakes ? 1 : -1);
        topRange = false;
      }
      sortCells();
    }
  });

  btnCorrect.addEventListener('click', () => {
    if ( localStorage.getItem(storageName) ) {
      storageUpdate();
      if (!topRange) {
        statsList.sort((a, b) => a.correct < b.correct ? 1 : -1);
        topRange = true;
      } else {
        statsList.sort((a, b) => a.correct > b.correct ? 1 : -1);
        topRange = false;
      }
      sortCells();
    }
  });

  btnTrain.addEventListener('click', () => {
    if ( localStorage.getItem(storageName) ) {
      storageUpdate();
      if (!topRange) {
        statsList.sort((a, b) => a.train < b.train ? 1 : -1);
        topRange = true;
      } else {
        statsList.sort((a, b) => a.train > b.train ? 1 : -1);
        topRange = false;
      }
      sortCells();
    }
  });

  btnNumb.addEventListener('click', () => {
    const numbersNodeList = document.querySelectorAll('.numb');
    const numbersList = [];
    numbersNodeList.forEach(item => {
      numbersList.push(item.textContent);
    });
    if ( localStorage.getItem(storageName) ) {
      storageUpdate();
      if (!topRange) {
        statsList.sort((a, b) => statsList.indexOf(a) < statsList.indexOf(b) ? 1 : -1);
        numbersList.sort((a, b) => +a < +b ? 1 : -1);
        topRange = true;
      } else {
        statsList.sort((a, b) => statsList.indexOf(a) > statsList.indexOf(b) ? 1 : -1);
        numbersList.sort((a, b) => +a > +b ? 1 : -1);
        topRange = false;
      }
      sortCells();
      let currIndex = 0;
      numbersNodeList.forEach(item => {
        item.textContent = numbersList[currIndex];
        currIndex += 1;
      })
    }
  });
  btnWord.addEventListener('click', () => {
    if ( localStorage.getItem(storageName) ) {
      storageUpdate();
      if (!topRange) {
        statsList.sort((a, b) => a.word < b.word ? 1 : -1);
        topRange = true;
      } else {
        statsList.sort((a, b) => a.word > b.word ? 1 : -1);
        topRange = false;
      }
      sortCells();
    }
  });
  btnTranslation.addEventListener('click', () => {
    if ( localStorage.getItem(storageName) ) {
      storageUpdate();
      if (!topRange) {
        statsList.sort((a, b) => a.translation < b.translation ? 1 : -1);
        topRange = true;
      } else {
        statsList.sort((a, b) => a.translation > b.translation ? 1 : -1);
        topRange = false;
      }
      sortCells();
    }
  });
  btnCategory.addEventListener('click', () => {
    if ( localStorage.getItem(storageName) ) {
      storageUpdate();
      if (!topRange) {
        statsList.sort((a, b) => a.category < b.category ? 1 : -1);
        topRange = true;
      } else {
        statsList.sort((a, b) => a.category > b.category ? 1 : -1);
        topRange = false;
      }
      sortCells();
    }
  });
}