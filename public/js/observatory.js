let songTimeouts = [];
let playTimeout;
let mostRecent;

function back(){
  if (history.length === 1) {
    window.location = "/";
  } else {
    history.back();
  }
}

function toHome() {
  let slide = document.getElementById('hidden-home');
  let top = document.getElementById('obs-top');
  let bot = document.getElementById('songs-container');
  slide.classList.toggle('slideRight');
  top.classList.toggle('slideRight');
  bot.classList.toggle('slideRight');
  setTimeout(() => {
    back();
  }, 950);
}

function startPlayBack(notes, id) {
  if (mostRecent) {
    stopPlayBack(mostRecent.notes, mostRecent.id);
  }

  for (let note of notes) {
    songTimeouts.push(
      setTimeout(() => {
        playSound(note.sound);
      }, note.time)
    );
  }

  const constellation = document.getElementById(id);
  constellation.onclick = () => {
    stopPlayBack(notes, id);
  }

  const conImage = document.getElementById(`${id}-image`);
  conImage.style.animation = 'twinkle 2s ease-in-out infinite';

  const playText = document.getElementById(`${id}-click`);
  playText.innerText = 'click to stop!';

  const last = notes[notes.length - 1];
  playTimeout = setTimeout(() => {
    constellation.onclick = () => {
      startPlayBack(notes, id);
    }
    conImage.style.animation = '';
    playText.innerText = 'click to play!';
  }, last.time);

  mostRecent = { notes, id };
}

function stopPlayBack(notes, id) {
  for (let sTimeout of songTimeouts) {
    clearTimeout(sTimeout);
  }

  const constellation = document.getElementById(id);
  constellation.onclick = () => {
    startPlayBack(notes, id);
  }
  const conImage = document.getElementById(`${id}-image`);
  conImage.style.animation = '';
  const playText = document.getElementById(`${id}-click`);
  playText.innerText = 'click to play!';

  clearTimeout(playTimeout);
}

function songDOMObject(song) {
  const constellations = ['leo', 'aquila', 'aries', 'canismajor', 'cassiopeia', 'andromeda', 'taurus',
    'ursamajor', 'virgo', 'scorpius', 'sagittarius', 'pisces', 'orion', 'libra', 'gemini', 'aquarius',
    'cancer', 'capricornus'];
  const randomConstellation = constellations[Math.floor(Math.random() * constellations.length)];

  const conRotate = Math.floor(Math.random() * 360);
  const conHueRotate = Math.floor(Math.random() * 360);

  const constellation = document.createElement('div');
  constellation.setAttribute('id', song._id);
  constellation.className = 'constellation hvr-grow';

  const conImage = document.createElement('img');
  conImage.setAttribute('id', `${song._id}-image`)
  conImage.src = `/static/img/${randomConstellation}_constellation.png`;
  conImage.style.transform = `rotate(${conRotate}deg) scale(0.8)`;
  conImage.style.filter = `hue-rotate(${conHueRotate}deg)`;
  conImage.style.opacity = .7;

  const conPopup = document.createElement('div');
  conPopup.className = 'constellation-text';

  const conName = document.createElement('div');
  conName.innerText = `song: ${song.name}`;

  const conAuthor = document.createElement('div');
  conAuthor.className = 'constellation-author';
  conAuthor.innerText = `author: ${song.ownerName}`;

  const conPlay = document.createElement('div');
  conPlay.setAttribute('id', `${song._id}-click`);
  conPlay.innerText = 'click to play!';

  conPopup.appendChild(conName);
  conPopup.appendChild(conAuthor);
  conPopup.appendChild(conPlay);

  constellation.appendChild(conPopup);
  constellation.appendChild(conImage);

  constellation.onclick = () => {
    startPlayBack(song.notes, song._id);
  }

  return constellation;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderSongs() {
  const songsDiv = document.getElementById('songs');

  axios.get('/api/getsongs')
  .then((res) => {
    const songs = shuffleArray(res.data);
    for (const song of songs) {
      // console.log(song);
      songsDiv.appendChild(songDOMObject(song));
    }
  })
  .catch((err) => {
    console.log(err);
  })
}

window.onload = () => {
  renderSongs();
}
