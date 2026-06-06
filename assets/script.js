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

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  parallaxItems.forEach(item => {
    const speed = Number(item.dataset.parallax || 0);
    item.style.transform = `translate3d(0, ${y * speed}px, 0)`;
  });
}, { passive: true });
