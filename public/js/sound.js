var context = new AudioContext();

var sounds = {
  pew: {
    url: "/static/audio/pew.wav"
  },
  FsM7: {
    url: "/static/audio/FsM7.mp3"
  },
  CsM7: {
    url: "/static/audio/CsM7.mp3"
  },
  GsM7: {
    url: "/static/audio/GsM7.mp3"
  },
  drumkick: {
    url: "/static/audio/drumkick.wav"
  },
  M1: {
    url: "/static/audio/M1.mp3"
  },
  M2: {
    url: "/static/audio/M2.mp3"
  },
  M3: {
    url: "/static/audio/M3.mp3"
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