function playSong(notes) {
  for (let note of notes) {
    setTimeout(() => {
      playSound(note.sound);
    }, note.time);
  }
}

function songDOMObject(song) {
  const card = document.createElement('div');
  card.setAttribute('id', song._id);


  const nameSpan = document.createElement('span');
  nameSpan.innerText = song.name;
  card.appendChild(nameSpan);

  const ownerSpan = document.createElement('span');
  ownerSpan.innerText = song.ownerName;
  card.appendChild(ownerSpan);

  const playSpan = document.createElement('span');
  playSpan.innerText = 'play';
  playSpan.onclick = () => {
    playSong(song.notes);
  }
  card.appendChild(playSpan);

  return card;
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
