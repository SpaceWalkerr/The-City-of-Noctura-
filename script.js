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

const dots = document.querySelectorAll('.dot');
const scenes = document.querySelectorAll('.scene');

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const targetId = dot.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Highlight active dot on scroll
window.addEventListener('scroll', () => {
  scenes.forEach((scene, index) => {
    const rect = scene.getBoundingClientRect();
    const dot = dots[index];
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
});

let synth = window.speechSynthesis;
let voices = [];

function populateVoiceList() {
  voices = synth.getVoices();
  const voiceSelect = document.getElementById("voiceSelect");

  // Clear previous options
  voiceSelect.innerHTML = '';

  voices.forEach((voice, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

// Load voices when ready
populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}




let utterance;
let isSpeaking = false;

function startNarration() {
  if (synth.speaking) synth.cancel();

  let text = '';
  document.querySelectorAll('.scene h2, .scene p').forEach(el => {
    text += el.innerText + ' ';
  });

  utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.lang = 'en-US';

  // Use selected voice
  const selectedVoiceIndex = document.getElementById("voiceSelect").value;
  utterance.voice = voices[selectedVoiceIndex];

  synth.speak(utterance);
}

 
