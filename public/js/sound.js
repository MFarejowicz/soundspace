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
