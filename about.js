// Counters
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  const target = +counter.dataset.target;
  const increment = target / 100;

  const updateCounter = () => {
    const current = +counter.innerText;
    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});

// Typing Effect
new Typed('#typed-heading', {
  strings: ['Welcome to Xopomind', 'Learn. Play. Grow.', 'Education Made Fun!'],
  typeSpeed: 30,
  backSpeed: 30,
  loop: true,
});

// Progress Bar
window.onscroll = () => {
  const progressBar = document.getElementById('progress-bar');
  const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollTop = document.documentElement.scrollTop;
  const progress = (scrollTop / scrollTotal) * 100;
  progressBar.style.width = `${progress}%`;
};

// Lottie Animations
const icons = [
  { id: 'icon1', path: 'icon1.json' },
  { id: 'icon2', path: 'icon2.json' },
  { id: 'icon3', path: 'icon3.json' },
];

icons.forEach(icon => {
  lottie.loadAnimation({
    container: document.getElementById(icon.id),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: icon.path,
  });
});
