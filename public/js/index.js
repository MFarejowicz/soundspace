window.onload = () => {
  document.onkeypress = (e) => {
    switch (e.keyCode) {
      case 113:
        playSound('h1');
        break;
      case 119:
        playSound('h2');
        break;
      case 101:
        playSound('h3');
        break;
      case 114:
        playSound('h4');
        break;
      default:
        console.log(e.keyCode);
    }
  }
}
