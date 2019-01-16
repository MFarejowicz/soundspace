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

function spawnStar() {
  let top = document.getElementById('top');
  let width = top.offsetWidth-50;
  let height = top.offsetHeight-50;

  let star = document.createElement('img');
  let x = getRandom(0, width);
  let y = getRandom(0, height);
  star.setAttribute('src', '/static/img/star.png');
  star.setAttribute('class', 'star');
  star.style.top = `${y}px`;
  star.style.left = `${x}px`;

  top.appendChild(star);
  fadeOutAndRemove(star, 2000);
}

window.onload = () => {
  let prompt = true;
  document.onkeypress = (e) => {
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
      default:
        console.log(e.keyCode);
    }

    if (prompt) {
      fadeOutAndRemove(document.getElementById('prompt'), 2000);
      prompt = false;
    }
  }
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
  spawnStar();
});
