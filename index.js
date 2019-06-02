let fillingEnabled = false;
let defineColorEnabled = false;

function fill(e) {
  const currentColorElement = document.querySelector('.currentColor').firstElementChild;
  const color = window.getComputedStyle(currentColorElement).backgroundColor;

  if (e.target.parentElement.className === 'canvas') {
    e.target.style.backgroundColor = `${color}`;
  }
}

function filling() {
  const canvas = document.querySelector('.canvas');
  if (fillingEnabled) {
    canvas.removeEventListener('click', fill);
    fillingEnabled = false;
  } else {
    canvas.addEventListener('click', fill);
    fillingEnabled = true;
  }
}

function transform() {
  const canvas = document.querySelector('.canvas');
  canvas.addEventListener('click', e => e.target.classList.toggle('circle'));
}
function setColor(e) {
  const currentColorElement = document.querySelector('.currentColor').firstElementChild;
  const prevColorElement = document.querySelector('.previousColor').firstElementChild;
  const color = window.getComputedStyle(currentColorElement).backgroundColor;

  if (e.target.parentElement.className === 'canvas' || (e.target.parentElement.parentElement.className === 'pallete')) {
    const chooseColor = window.getComputedStyle(e.target).backgroundColor;
    prevColorElement.style.backgroundColor = `${color}`;
    currentColorElement.style.backgroundColor = chooseColor;
  }
}

function defineColor() {
  if (defineColorEnabled) {
    document.removeEventListener('click', setColor);
    defineColorEnabled = false;
  } else {
    document.addEventListener('click', setColor);
    defineColorEnabled = true;
  }
}

function move() {
  return 1;
}


function keyEvents(key) {
  if (key.code === 'ArrowDown') {
    filling();
  }
  if (key.code === 'Shift') {
    defineColor();
  }
  if (key.code === 'ArrowLeft') {
    // eslint-disable-next-line no-undef
    move();
  }
  if (key.code === 'ArrowUp') {
    transform();
  }
}

window.onload = function load() {
  const btnFilling = document.querySelector('.bucket');
  const btnTransform = document.querySelector('.transform');
  const btnChooseColor = document.querySelector('.chooseColor');
  const btnMove = document.querySelector('.chooseColor');
  document.querySelector('.menuTools').addEventListener('click', e => e.target.classList.toggle('activeButton'));

  btnFilling.addEventListener('click', filling);
  btnTransform.addEventListener('click', transform);
  btnChooseColor.addEventListener('click', defineColor);
  // eslint-disable-next-line no-undef
  btnMove.addEventListener('mousedown', move);

  document.addEventListener('keydown', keyEvents);
};
