let songTimeouts = [];
let playTimeout;
let mostRecent;
let lastClicked;

function back() {
  if (history.length === 1) {
    window.location = "/";
  } else {
    history.back();
  }
}

function toHome() {
  let slide = document.getElementById("hidden-home");
  let top = document.getElementById("obs-top");
  let bot = document.getElementById("songs-container");
  slide.classList.toggle("slideRight");
  top.classList.toggle("slideRight");
  bot.classList.toggle("slideRight");
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

  const conImage = document.getElementById(`${id}-image`);
  conImage.style.animation = "twinkle 2s ease-in-out infinite";
  conImage.onclick = () => {
    stopPlayBack(notes, id);
  };

  const playText = document.getElementById(`${id}-click`);
  playText.innerText = "click to stop!";

  const last = notes[notes.length - 1];
  playTimeout = setTimeout(() => {
    conImage.onclick = () => {
      startPlayBack(notes, id);
    };
    conImage.style.animation = "";
    playText.innerText = "click to play!";
  }, last.time);

  mostRecent = { notes, id };
}

function stopPlayBack(notes, id) {
  for (let sTimeout of songTimeouts) {
    clearTimeout(sTimeout);
  }

  const conImage = document.getElementById(`${id}-image`);
  conImage.onclick = () => {
    startPlayBack(notes, id);
  };
  conImage.style.animation = "";

  const playText = document.getElementById(`${id}-click`);
  playText.innerText = "click to play!";

  clearTimeout(playTimeout);
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fadeOutAndRemove(el, removeAfter, removeSpeed) {
  const seconds = removeSpeed / 1000;
  el.style.transition = `opacity ${seconds}s ease`;
  setTimeout(() => (el.style.opacity = 0), removeAfter);
  setTimeout(() => el.parentNode.removeChild(el), removeAfter + removeSpeed);
}

function appendSpawn() {
  let top = document.getElementById("obs-top");
  let spawn = document.createElement("img");

  spawn.setAttribute("src", `/static/img/star${getRandomInt(1, 3)}.png`);
  spawn.setAttribute("class", "obs-spawn");

  // Please don't ask
  let height =
    parseFloat(
      window
        .getComputedStyle(document.getElementById("songs-container"))
        .getPropertyValue("height")
    ) + 70;
  let marg =
    parseFloat(
      window
        .getComputedStyle(document.getElementById("songs-container"))
        .getPropertyValue("margin-top")
    ) * 2;

  spawn.style.top = `${getRandomInt(0, height + marg)}px`;
  spawn.style.left = `${getRandomInt(0, 97)}vw`;
  spawn.style.filter = `hue-rotate(${getRandomInt(0, 360)}deg)`;
  spawn.style.transform = `scale(${getRandom(0.6, 1)})`;
  spawn.style.zIndex = -1;

  top.appendChild(spawn);
  fadeOutAndRemove(spawn, 15000, 10000);
}

function songDOMObject(song, userId) {
  const constellations = [
    "leo",
    "aquila",
    "aries",
    "canismajor",
    "cassiopeia",
    "andromeda",
    "taurus",
    "ursamajor",
    "virgo",
    "scorpius",
    "sagittarius",
    "pisces",
    "orion",
    "libra",
    "gemini",
    "aquarius",
    "cancer",
    "capricornus"
  ];
  const randomConstellation =
    constellations[Math.floor(Math.random() * constellations.length)];

  const conRotate = Math.floor(Math.random() * 360);
  const conHueRotate = Math.floor(Math.random() * 360);

  const constellation = document.createElement("div");
  constellation.setAttribute("id", song._id);
  constellation.className = "constellation hvr-grow";

  const conImage = document.createElement("img");
  conImage.setAttribute("id", `${song._id}-image`);
  conImage.src = `/static/img/${randomConstellation}_constellation.png`;
  conImage.style.transform = `rotate(${conRotate}deg) scale(0.8)`;
  conImage.style.filter = `hue-rotate(${conHueRotate}deg)`;
  conImage.style.opacity = 0.7;
  conImage.style.cursor = "pointer";
  conImage.onclick = () => {
    startPlayBack(song.notes, song._id);
  };

  const conPopup = document.createElement("div");
  conPopup.className = "constellation-text";

  const conName = document.createElement("div");
  conName.innerText = `song: ${song.name}`;

  const conAuthor = document.createElement("div");
  conAuthor.className = "constellation-middle";
  conAuthor.innerText = `author: ${song.ownerName}`;

  const conPlay = document.createElement("div");
  conPlay.setAttribute("id", `${song._id}-click`);
  conPlay.className = "constellation-middle";
  conPlay.innerText = "click to play!";

  conPopup.appendChild(conName);
  conPopup.appendChild(conAuthor);
  conPopup.appendChild(conPlay);

  if (userId && userId === song.ownerId) {
    const conDelete = document.createElement("div");
    conDelete.className = "constellation-delete";

    const conDeleteText = document.createElement("span");
    conDeleteText.innerText = "delete:";
    conDeleteText.className = "constellation-delete-text";
    const conDeleteImg = document.createElement("img");
    conDeleteImg.setAttribute("src", "/static/img/delete_white.png");
    conDeleteImg.className = "constellation-delete-img";
    conDeleteImg.onmouseover = () => {
      conDeleteImg.setAttribute("src", "/static/img/delete_red.png");
    };
    conDeleteImg.onmouseout = () => {
      conDeleteImg.setAttribute("src", "/static/img/delete_white.png");
    };
    conDeleteImg.onclick = () => {
      stopPlayBack(song.notes, song._id);
      lastClicked = song;
      const modal = document.getElementById("modal");
      modal.style.display = "block";
    };

    conDelete.appendChild(conDeleteText);
    conDelete.appendChild(conDeleteImg);

    conPopup.appendChild(conDelete);
  }

  constellation.appendChild(conPopup);
  constellation.appendChild(conImage);

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
  const songsDiv = document.getElementById("songs");

  Promise.all([axios.get("/api/getsongs"), axios.get("/api/userinfo")])
    .then(res => {
      const songs = shuffleArray(res[0].data);
      const userInfo = res[1].data;
      const userId = userInfo.github_id;
      for (const song of songs) {
        songsDiv.appendChild(songDOMObject(song, userId));
      }
    })
    .catch(err => {
      console.log(err);
    });
}

window.onload = () => {
  renderSongs();
  setInterval(() => {
    appendSpawn();
  }, 750);

  const modal = document.getElementById("modal");
  window.onclick = event => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  document.getElementById("delete-yes").onclick = () => {
    axios
      .post("/api/deletesong", { song: lastClicked })
      .then(res => {
        location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  };

  document.getElementById("delete-no").onclick = () => {
    modal.style.display = "none";
  };
};
