var context = new AudioContext();

var sounds = {
  h1: {
    url: "/static/audio/h1.mp3"
  },
  h2: {
    url: "/static/audio/h2.mp3"
  },
  h3: {
    url: "/static/audio/h3.mp3"
  },
  h4: {
    url: "/static/audio/h4.mp3"
  },
  C4: {
    url: "/static/audio/C4.mp3"
  },
  E4: {
    url: "/static/audio/E4.mp3"
  },
  G4: {
    url: "/static/audio/G4.mp3"
  },
  B4: {
    url: "/static/audio/B4.mp3"
  },
  neosweep: {
    url: "/static/audio/neo-sweep.wav"
  },
  pew: {
    url: "/static/audio/pew.wav"
  },
  bass: {
    url: "/static/audio/bass.wav"
  },
  chipkick: {
    url: "/static/audio/chipkick.wav"
  },
  piano5: {
    url: "/static/audio/piano5.mp3"
  },
  xylochord: {
    url: "/static/audio/xylochord.wav"
  },
  jazzy1: {
    url: "/static/audio/jazzy1.mp3"
  },
  warm1: {
    url: "/static/audio/warm1.mp3"
  },
  pluckFs5: {
    url: "/static/audio/pluckFs5.mp3"
  },
  pluckGs5: {
    url: "/static/audio/pluckGs5.mp3"
  },
  pluckAs5: {
    url: "/static/audio/pluckAs5.mp3"
  },
};

for (let key in sounds) {
  loadSound(key);
}

function loadSound(name){
  let url = sounds[name].url;

  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    context.decodeAudioData(request.response, function(newBuffer) {
      sounds[name].buffer = newBuffer;
    });
  }

  request.send();
}

function playSound(name){
  let buffer = sounds[name].buffer;

  if (buffer) {
    let source = context.createBufferSource(); // creates a sound source
    source.buffer = buffer;                    // tell the source which sound to play
    source.connect(context.destination);       // connect the source to the context's destination (the speakers)
    source.start(0);
  }
}