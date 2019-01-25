function playSong(notes) {
  for (let note of notes) {
    setTimeout(() => {
      playSound(note.sound);
    }, note.time);
  }
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
  constellation.className = 'constellation';

  const conImage = document.createElement('img');
  conImage.src = `/static/img/${randomConstellation}_constellation.png`;
  conImage.style.transform = `rotate(${conRotate}deg) scale(0.8)`;
  conImage.style.filter = `hue-rotate(${conHueRotate}deg)`;

  const conPopup = document.createElement('div');
  conPopup.className = 'constellation-text';

  const conInfo = document.createElement('div');
  conInfo.innerHTML = `${song.name}<br>${song.ownerName}`

  const play = document.createElement('div');
  play.innerText = 'play';
  play.onclick = () => {
    playSong(song.notes);
  }

  conPopup.appendChild(conInfo);
  conPopup.appendChild(play);

  constellation.appendChild(conPopup);
  constellation.appendChild(conImage);

  return constellation;
}

function renderSongs() {
  const songsDiv = document.getElementById('songs');

  axios.get('/api/getsongs')
  .then((res) => {
    const songs = res.data;
    for (const song of songs) {
      console.log(song);
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
