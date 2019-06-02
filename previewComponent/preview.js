function init() {
  function handlerClickFPS(e) {
    const saveFrame = document.querySelectorAll('.preview-frame');
    const screenPreview = document.querySelector('.preview-animation');
    screenPreview.style.backgroundColor = 'white';
    screenPreview.style.backgroundColor = 'white';

    const fps = parseInt(e.target.textContent, 10);

    const countFrame = saveFrame.length;
    let i = 0;

    const step = function a() {
      if (i < countFrame) {
        screenPreview.innerHTML = saveFrame[i].innerHTML;
        i += 1;
      }
    };
    setInterval(step, 1000 / fps);
  }

  function handlerFullScreen(element) {
    element.target.parentNode.webkitRequestFullscreen();
  }

  const countFPS = document.querySelectorAll('.fps');
  countFPS.forEach(element => element.addEventListener('click', handlerClickFPS));

  const screenPreview = document.querySelector('.preview-animation');
  screenPreview.addEventListener('dblclick', handlerFullScreen);
}

init();
