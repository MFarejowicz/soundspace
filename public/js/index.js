var socket = io();

window.onload = () => {
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
  }
}

socket.on('play sound', sound => {
  console.log('recieved sound ' + sound);
  playSound(sound);
})