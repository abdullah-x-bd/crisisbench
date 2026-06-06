const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach(item => observer.observe(item));

const parallaxItems = document.querySelectorAll('[data-parallax]');
const root = document.documentElement;
let mouseX = 0;
let mouseY = 0;
let scrollYValue = window.scrollY;
let ticking = false;

const nodes = [
  { x: '12%', y: '24%', s: '6px', depth: 0.16 },
  { x: '28%', y: '68%', s: '4px', depth: 0.09 },
  { x: '46%', y: '18%', s: '5px', depth: 0.13 },
  { x: '64%', y: '58%', s: '7px', depth: 0.2 },
  { x: '82%', y: '30%', s: '5px', depth: 0.11 },
  { x: '90%', y: '76%', s: '4px', depth: 0.17 }
];

nodes.forEach(node => {
  const element = document.createElement('span');
  element.className = 'float-node';
  element.dataset.depth = String(node.depth);
  element.style.setProperty('--x', node.x);
  element.style.setProperty('--y', node.y);
  element.style.setProperty('--s', node.s);
  document.body.appendChild(element);
});

const floatingNodes = document.querySelectorAll('.float-node');

function updateBackground() {
  const scrollShift = scrollYValue * 0.08;
  root.style.setProperty('--bg-x', `${mouseX * 18}px`);
  root.style.setProperty('--bg-y', `${mouseY * 18 + scrollShift}px`);
  root.style.setProperty('--mx', `${50 + mouseX * 18}%`);
  root.style.setProperty('--my', `${20 + mouseY * 16}%`);

  parallaxItems.forEach(item => {
    const speed = Number(item.dataset.parallax || 0);
    const x = mouseX * 34 * speed;
    const y = scrollYValue * speed + mouseY * 34 * speed;
    item.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });

  floatingNodes.forEach(item => {
    const depth = Number(item.dataset.depth || 0.1);
    const x = mouseX * 90 * depth;
    const y = mouseY * 90 * depth + scrollYValue * depth;
    item.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });

  ticking = false;
}

function requestTick() {
  if (!ticking) {
    window.requestAnimationFrame(updateBackground);
    ticking = true;
  }
}

window.addEventListener('pointermove', event => {
  mouseX = event.clientX / window.innerWidth - 0.5;
  mouseY = event.clientY / window.innerHeight - 0.5;
  requestTick();
}, { passive: true });

window.addEventListener('scroll', () => {
  scrollYValue = window.scrollY;
  requestTick();
}, { passive: true });

requestTick();
