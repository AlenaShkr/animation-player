const arrayStateCanvas = [];
function init() {
  let countFrame = 1;

  function cleanCanvas() {
    const canvas = document.querySelector('.canvas');
    const countChildren = canvas.childElementCount;
    for (let i = 0; i < countChildren; i += 1) {
      canvas.children[i].style.background = 'lightgray';
      canvas.children[i].className = '';
    }
  }

  function saveStateCanvas() {
    const canvas = document.querySelector('.canvas');
    const viewCanvas = canvas.cloneNode(true);
    arrayStateCanvas.push(viewCanvas.innerHTML);
  }

  function changeOnNonActiveState(element) {
    const frame = element;
    frame.className = 'frame';
    frame.querySelector('.delete-frame').style.visibility = 'visible';
    frame.querySelector('.duplicate-frame').style.visibility = 'visible';
    frame.querySelector('.replace-frame').style.visibility = 'visible';
  }

  function handlerAddFrame() {
    const frame = document.querySelector('.frame-current');
    const newFrame = frame.cloneNode(true);

    changeOnNonActiveState(frame);

    frame.querySelector('.preview-frame').innerHTML = arrayStateCanvas[countFrame - 1];
    frame.querySelector('.preview-frame').style.backgroundColor = 'white';

    const btnAddFrame = document.querySelector('.btn-addframe');

    countFrame += 1;
    const numberFrame = newFrame.querySelector('.number-frame');
    numberFrame.innerHTML = countFrame;

    const framePanel = document.querySelector('.frame-panel');
    framePanel.appendChild(newFrame);
    framePanel.appendChild(btnAddFrame);
  }

  function handlerBtnDelete(e) {
    const removedFrame = e.target.parentNode.parentNode.parentNode;

    const position = removedFrame.querySelector('.number-frame').textContent - 1;
    arrayStateCanvas.splice(position, 1);

    countFrame -= 1;
    removedFrame.remove();
    const numberFrame = document.querySelectorAll('.number-frame');
    for (let i = 0; i < countFrame; i += 1) {
      numberFrame[i].textContent = i + 1;
    }
  }

  function handlerBtnDuplicate(e) {
    const copyingFrame = e.target.parentNode.parentNode.parentNode;
    const position = copyingFrame.querySelector('.number-frame').textContent - 1;
    arrayStateCanvas.splice(position + 1, 0, arrayStateCanvas[position]);

    handlerAddFrame();

    const arrayFrame = document.querySelectorAll('.preview-frame');
    const arrayFrameLen = arrayFrame.length;
    for (let i = 0; i < arrayFrameLen - 1; i += 1) {
      arrayFrame[i].innerHTML = arrayStateCanvas[i];
    }
  }

  const activeFrame = document.querySelector('.frame');
  activeFrame.className = 'frame-current';

  const btnAddFrame = document.querySelector('.btn-addframe');

  btnAddFrame.addEventListener('click', (e) => {
    saveStateCanvas();

    cleanCanvas();
    handlerAddFrame(e);

    const btnDeleteFrame = document.querySelectorAll('.delete-frame');
    btnDeleteFrame.forEach(element => element.addEventListener('click', handlerBtnDelete));

    const btnDuplicateFrame = document.querySelectorAll('.duplicate-frame');
    btnDuplicateFrame.forEach(element => element.addEventListener('click', handlerBtnDuplicate));
  });
}

init();
