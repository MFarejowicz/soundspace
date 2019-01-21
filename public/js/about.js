function slideDown() {
  let slide = document.getElementById('hidden-home');
  let top = document.getElementById('about-top');
  let bot = document.getElementById('about-bot');
  slide.classList.toggle('slideDown');
  top.classList.toggle('slideDown');
  bot.classList.toggle('slideDown');
  setTimeout(() => {
    window.location.href = '/';
  }, 1000);
}
