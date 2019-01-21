const socket = io();

function slideUp() {
  let slide = document.getElementById('hidden-about');
  let top = document.getElementById('top');
  let bot = document.getElementById('bot');
  slide.classList.toggle('slideUp');
  top.classList.toggle('slideUp');
  bot.classList.toggle('slideUp');
  setTimeout(() => {
    window.location.href = '/about';
  }, 1000);
}

function slideLeft() {
  let slide = document.getElementById('hidden-leave');
  let top = document.getElementById('top');
  let bot = document.getElementById('bot');
  slide.classList.toggle('slideLeft');
  top.classList.toggle('slideLeft');
  bot.classList.toggle('slideLeft');
  setTimeout(() => {
    window.location.href = '/';
  }, 1000);
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function joinPopup() {
  const joinPopup = document.getElementById('join-popup');
  joinPopup.classList.toggle('show');
  joinPopup.classList.toggle('hide');

  const joinInput = document.getElementById('join-input');
  if (joinPopup.classList.contains('show')) {
    joinInput.focus();
  }
}

function fadeOutAndRemove(el, removeAfter, removeSpeed) {
  const seconds = removeSpeed / 1000;
  el.style.transition = `opacity ${seconds}s ease`;
  setTimeout(() => el.style.opacity = 0, removeAfter);
  setTimeout(() => el.parentNode.removeChild(el), removeAfter+removeSpeed);
}

function appendSpawn(spawnInfo, hue) {
  let top = document.getElementById('top');
  let spawn = document.createElement('img');

  if (spawnInfo.type === 'meteor') {
    // Needed because a meteor is a gif, not a png.
    // Date needed at end to get fresh gif instead of existing one.
    spawn.setAttribute('src', `/static/img/${spawnInfo.type}${spawnInfo.num}.gif?x=${Date.now()}`);
  } else {
    spawn.setAttribute('src', `/static/img/${spawnInfo.type}${spawnInfo.num}.png`);
  }
  spawn.setAttribute('class', 'spawn');
  spawn.style.top = `${spawnInfo.y}%`;
  spawn.style.left = `${spawnInfo.x}%`;
  spawn.style.filter = `hue-rotate(${hue}deg)`;
  spawn.style.transform = `scale(${spawnInfo.scale}, ${spawnInfo.scale})`;

  top.appendChild(spawn);
  fadeOutAndRemove(spawn, spawnInfo.upTime, spawnInfo.fadeTime);
}

function chooseSpawn() {
  let rand = Math.random();
  let type, upTime, fadeTime, num, x, y, scale;

  if (rand < 0.98) {
    type = 'star';
    upTime = 5000;
    fadeTime = 5000;
    num = getRandomInt(1, 3);
    x = getRandom(0, 90);
    y = getRandom(0, 90);
    scale = getRandom(.6, 1);
  } else if (rand < 0.990) {
    type = 'planet';
    upTime = 10000;
    fadeTime = 5000;
    num = getRandomInt(1, 5);
    x = getRandom(0, 80);
    y = getRandom(0, 80);
    scale = getRandom(.8, 1.1);
  } else if (rand < 0.995) {
    type = 'sun';
    upTime = 20000;
    fadeTime = 8000;
    num = 1;
    x = getRandom(0, 70);
    y = getRandom(0, 70);
    scale = getRandom(.8, 1.2);
  } else if (rand < 0.998) {
    type = 'meteor';
    upTime = 1800;
    fadeTime = 0;
    num = 1;
    x = getRandom(0, 70);
    y = getRandom(0, 50);
    scale = getRandom(1, 2);
  } else {
    type = 'galaxy';
    upTime = 20000;
    fadeTime = 10000;
    num = 1;
    x = getRandom(0, 60);
    y = getRandom(0, 70);
    scale = getRandom(.8, 1.1);
  }

  return { type, upTime, fadeTime, num, x, y, scale }
}

window.onload = () => {
  let timeout;
  let prompt = true;
  let hue = getRandomInt(0, 360);

  let myShip = document.getElementById('my-ship');
  if (myShip) {
    myShip.setAttribute('src', `/static/img/ship${getRandomInt(1, 3)}.gif`);

    axios.get('/api/userinfo')
    .then((res) => {
      let myShipText = document.getElementById('ship-text');
      myShipText.innerText = `${res.data.name}\n\nTaps: ${res.data.taps}`
    })
    .catch((err) => {
      console.log(err);
    });
  }

  let bot = document.getElementById('bot');
  let topBar = document.getElementById('top-bar');
  document.onmousemove = () => {
    if (!prompt) {
      bot.style.transition = "opacity 1s ease";
      bot.style.opacity = 1;
      topBar.style.transition = "opacity 1s ease";
      topBar.style.opacity = 1;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        bot.style.transition = "opacity 4s ease";
        bot.style.opacity = 0
        topBar.style.transition = "opacity 4s ease";
        topBar.style.opacity = 0
      }, 5000);
    }
  }

  document.onkeypress = (e) => {
    const joinInput = document.getElementById('join-input');
    if (!(joinInput === document.activeElement)) { //May want to investigate this, seems to stop sounds sometimes
      const spawnInfo = chooseSpawn();

      switch (e.keyCode) {
        case 113:
          socket.emit('play sound', 'h1', spawnInfo, hue);
          break;
        case 119:
          socket.emit('play sound', 'h2', spawnInfo, hue);
          break;
        case 101:
          socket.emit('play sound', 'h3', spawnInfo, hue);
          break;
        case 114:
          socket.emit('play sound', 'h4', spawnInfo, hue);
          break;
        case 122:
          socket.emit('play sound', 'C4', spawnInfo, hue);
          break;
        case 120:
          socket.emit('play sound', 'E4', spawnInfo, hue);
          break;
        case 99:
          socket.emit('play sound', 'G4', spawnInfo, hue);
          break;
        case 118:
          socket.emit('play sound', 'B4', spawnInfo, hue);
          break;
        case 108:
          socket.emit('play sound', 'neosweep', spawnInfo, hue);
          break;
        case 97:
          socket.emit('play sound', 'pew', spawnInfo, hue);
          break;
        case 112:
          socket.emit('play sound', 'bass', spawnInfo, hue);
          break;
        case 111:
          socket.emit('play sound', 'chipkick', spawnInfo, hue);
          break;
        case 109:
          socket.emit('play sound', 'piano5', spawnInfo, hue);
          break;
        case 110:
          socket.emit('play sound', 'xylochord', spawnInfo, hue);
          break;
        case 115:
          socket.emit('play sound', 'jazzy1', spawnInfo, hue);
          break;
        case 107:
          socket.emit('play sound', 'warm1', spawnInfo, hue);
          break;
        case 102:
          socket.emit('play sound', 'pluckFs5', spawnInfo, hue);
          break;
        case 103:
          socket.emit('play sound', 'pluckGs5', spawnInfo, hue);
          break;
        case 104:
          socket.emit('play sound', 'pluckAs5', spawnInfo, hue);
          break;
        default:
          console.log(e.keyCode);
      }
    } else {
      if (e.keyCode === 13) {
        window.location.href = `${window.location.origin}/space/${joinInput.value}`;
      }
    }

    if (prompt) {
      fadeOutAndRemove(document.getElementById('prompt-text'), 10, 2000);
      setTimeout(() => {
        bot.style.opacity = 0;
        topBar.style.opacity = 0;
      }, 5000);
      prompt = false;
    }

    // Check if the user is logged in by looking for the log out element
    if (document.getElementById('logout')) {
      // Make post request to track taps
      axios.post('/api/tap')
      .then((res) => {
        let myShipText = document.getElementById('ship-text');
        myShipText.innerText = `${res.data.name}\n\nTaps: ${res.data.taps}`
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
}

socket.on('connect', () => {
  const spacecode = window.location.pathname.slice(7);

  if (spacecode.length === 4) {
    console.log(`Joining ${spacecode}`);
    socket.emit('join room', spacecode);
  } else if (spacecode.length === 0) {
    console.log(`Joining default`);
    socket.emit('join room', 'default');
  }

  if (document.getElementById('logout')) {
    // Make post request to track joins
    axios.post('/api/join')
    .catch((error) => {
      console.log(error);
    });
  }
});

socket.on('play sound', (sound, spawn, hue) => {
  console.log(`received sound ${sound}`);
  playSound(sound);
  appendSpawn(spawn, hue);
});
