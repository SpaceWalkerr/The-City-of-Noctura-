// Fade-in on scroll using Intersection Observer
const storyBlocks = document.querySelectorAll('.story-block');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

storyBlocks.forEach(block => {
  block.classList.add('hidden');
  observer.observe(block);
});

// Optional: Smooth scroll to top button
const topBtn = document.createElement('button');
topBtn.innerText = '↑ Back to Top';
topBtn.className = 'top-btn';
topBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
document.body.appendChild(topBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    topBtn.style.display = 'block';
  } else {
    topBtn.style.display = 'none';
  }
});
