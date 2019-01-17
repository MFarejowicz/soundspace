const socket = io();

function fadeOutAndRemove(el, speed) {
  const seconds = speed / 1000;
  el.style.transition = `opacity ${seconds}s ease`;
  setTimeout(() => el.style.opacity = 0, 100);
  setTimeout(() => el.parentNode.removeChild(el), speed);
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spawnStar() {
  let top = document.getElementById('top');
  let width = top.offsetWidth-50;
  let height = top.offsetHeight-50;

  let star = document.createElement('img');
  let x = getRandom(0, width);
  let y = getRandom(0, height);
  let num = getRandomInt(1, 3)
  star.setAttribute('src', `/static/img/star${num}.png`);
  star.setAttribute('class', 'star');
  star.style.top = `${y}px`;
  star.style.left = `${x}px`;

  top.appendChild(star);
  fadeOutAndRemove(star, 2000);
}

function spawnPlanet() {
  let top = document.getElementById('top');
  let width = top.offsetWidth-50;
  let height = top.offsetHeight-50;

  let star = document.createElement('img');
  let x = getRandom(0, width);
  let y = getRandom(0, height);
  let num = getRandomInt(1, 5)
  star.setAttribute('src', `/static/img/planet${num}.png`);
  star.setAttribute('class', 'star');
  star.style.top = `${y}px`;
  star.style.left = `${x}px`;

  top.appendChild(star);
  fadeOutAndRemove(star, 10000);
}

function spawnSun() {
  let top = document.getElementById('top');
  let width = top.offsetWidth-100;
  let height = top.offsetHeight-100;

  let star = document.createElement('img');
  let x = getRandom(0, width);
  let y = getRandom(0, height);
  star.setAttribute('src', `/static/img/sun.png`);
  star.setAttribute('class', 'star');
  star.style.top = `${y}px`;
  star.style.left = `${x}px`;

  top.appendChild(star);
  fadeOutAndRemove(star, 20000);
}

function spawnRandom() {
  let rand = Math.random()
  if (rand < 0.98) {
    spawnStar()
  } else if (rand < 0.995) {
    spawnPlanet()
  } else {
    spawnSun()
  }
}

function joinPopup() {
  const joinPopup = document.getElementById('join-popup');
  joinPopup.classList.toggle('show');
  joinPopup.classList.toggle('hide');
}

window.onload = () => {
  let prompt = true;
  document.onkeypress = (e) => {
    const joinInput = document.getElementById('join-input');
    if (!(joinInput === document.activeElement)) {
      switch (e.keyCode) {
        case 113:
          socket.emit('play sound', 'h1');
          break;
        case 119:
          socket.emit('play sound', 'h2');
          break;
        case 101:
          socket.emit('play sound', 'h3');
          break;
        case 114:
          socket.emit('play sound', 'h4');
          break;
        case 122:
          socket.emit('play sound', 'C4');
          break;
        case 120:
          socket.emit('play sound', 'E4');
          break;
        case 99:
          socket.emit('play sound', 'G4');
          break;
        case 118:
          socket.emit('play sound', 'B4');
          break;
        default:
          console.log(e.keyCode);
      }
    } else {
      if (e.keyCode === 13) {
        window.location.href = `${window.location.origin}/${joinInput.value}`;
      }
    }

    if (prompt) {
      fadeOutAndRemove(document.getElementById('prompt'), 2000);
      prompt = false;
    }
  }
}

function generateSpaceId() {
  let firstPart = (Math.random() * 46656) | 0;
  let secondPart = (Math.random() * 46656) | 0;
  firstPart = ('00' + firstPart.toString(36)).slice(-2);
  secondPart = ('00' + secondPart.toString(36)).slice(-2);
  return firstPart + secondPart;
};

function createSpace() {
  const spaceId = generateSpaceId();
  window.location.href = `${window.location.origin}/${spaceId}`;
}

socket.on('connect', () => {
  const spacecode = window.location.pathname.slice(1);
  if (spacecode.length === 4) {
    socket.emit('join room', spacecode);
  } else if (spacecode.length === 0) {
    socket.emit('join room', 'default');
  }
});

socket.on('play sound', (sound) => {
  console.log('received sound ' + sound);
  playSound(sound);
  spawnRandom();
  // spawnStar();
});
