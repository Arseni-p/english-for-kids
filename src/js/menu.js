export const menuFunc = () => {
  const menuBtn = document.querySelector('.menu-btn');
  const menuBtnText = document.querySelector('.menu-btn__text');
  const topLine = document.querySelector('.btn__top-line');
  const bottomLine = document.querySelector('.btn__btm-line');
  const menuList = document.querySelector('.menu__list');
  
  function menuOff() {
    if (menuBtn.classList.contains('menu-off')) {
      menuBtn.classList.remove('menu-off');
      menuBtn.classList.add('menu-btn--off');
      topLine.classList.add('top-line--off');
      bottomLine.classList.add('btm-line--off');
      menuList.classList.add('menu__list--on');
      
      setTimeout(() => menuBtnText.textContent = 'Close', 500)

    } else {
      menuBtn.classList.remove('menu-btn--off');
      topLine.classList.remove('top-line--off');
      bottomLine.classList.remove('btm-line--off');
      menuList.classList.remove('menu__list--on');

      menuBtn.classList.add('menu-off');
      menuBtn.classList.add('menu-btn--on');
      menuBtn.setAttribute('disabled', 'disabled');

      topLine.classList.add('top-line--on');
      bottomLine.classList.add('btm-line--on');
      menuList.classList.add('menu__list--off');

      setTimeout(() => menuBtnText.textContent = 'Open', 500)

      setTimeout(() => {
        menuBtn.removeAttribute('disabled');
        menuBtn.classList.remove('menu-btn--on');
        topLine.classList.remove('top-line--on');
        bottomLine.classList.remove('btm-line--on');
        menuList.classList.remove('menu__list--off');
      }, 1500)
    }
  };
  
  menuBtn.addEventListener('click', () => {
    menuOff();
  });

  window.addEventListener('click', (event) => {
    if ( event.target.classList.contains('menu__link') || !menuBtn.classList.contains('menu-off') && event.pageX > menuList.offsetWidth ) {
      menuOff();
    }
  })
}



