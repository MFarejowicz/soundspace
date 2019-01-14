const socket = io();

function removeFadeOut(el, speed) {
  const seconds = speed / 1000;
  el.style.transition = `opacity ${seconds}s ease`;
  setTimeout(() => el.style.opacity = 0, 0);
  setTimeout(() => el.parentNode.removeChild(el), speed);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function spawnStar() {
  let top = document.getElementById('top');
  let width = top.offsetWidth-50;
  let height = top.offsetHeight-50;

  let star = document.createElement('img');
  let x = getRandomArbitrary(0, width);
  let y = getRandomArbitrary(0, height);
  star.setAttribute('src', '/static/img/star.png');
  star.setAttribute('class', 'star');
  star.style.top = `${y}px`;
  star.style.left = `${x}px`;

  top.appendChild(star);
  removeFadeOut(star, 2000);
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
      removeFadeOut(document.getElementById('prompt'), 1500);
      prompt = false;
    }

    spawnStar();
  }
}

socket.on('play sound', sound => {
  console.log('received sound ' + sound);
  playSound(sound);
})
