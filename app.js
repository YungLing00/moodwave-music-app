const moods = {
  calm: {
    title: "Still Water", subtitle: "A soft space for slowing down",
    colors: ["#a9dbd8", "#6a75bd"], notes: [146.83, 196, 220, 293.66], tempo: 4200,
    particle: "rgba(150,220,220,"
  },
  focus: {
    title: "Golden Hour", subtitle: "A warm rhythm for deep focus",
    colors: ["#f1c67c", "#b46867"], notes: [164.81, 220, 261.63, 329.63], tempo: 2600,
    particle: "rgba(241,198,124,"
  },
  energy: {
    title: "Inner Spark", subtitle: "A vivid pulse to move with",
    colors: ["#ff907b", "#bf3c76"], notes: [196, 246.94, 293.66, 392], tempo: 950,
    particle: "rgba(255,121,111,"
  },
  dream: {
    title: "Lunar Drift", subtitle: "A weightless place beyond time",
    colors: ["#cab7ff", "#6a75d9"], notes: [130.81, 174.61, 220, 261.63], tempo: 5200,
    particle: "rgba(194,174,255,"
  }
};

let currentMood = "calm";
let audioCtx, master, padGain, filter, lfo, timer, startedAt = 0, elapsed = 0;
let isPlaying = false;
let variation = 0;
let breathing = true;

const body = document.body;
const playBtn = document.getElementById("playBtn");
const soundStatus = document.getElementById("soundStatus");
const progress = document.getElementById("progress");
const waveform = document.getElementById("waveform");
const toast = document.getElementById("toast");

for (let i = 0; i < 52; i++) {
  const bar = document.createElement("span");
  bar.style.setProperty("--height", 18 + Math.random() * 75 + "%");
  bar.style.setProperty("--duration", .45 + Math.random() * 1.2 + "s");
  bar.style.setProperty("--delay", -Math.random() * 1.5 + "s");
  waveform.appendChild(bar);
}

function initAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  master = audioCtx.createGain();
  master.gain.value = 0;
  filter = audioCtx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 850;
  filter.Q.value = .7;
  padGain = audioCtx.createGain();
  padGain.gain.value = .18;

  const compressor = audioCtx.createDynamicsCompressor();
  padGain.connect(filter).connect(compressor).connect(master).connect(audioCtx.destination);

  lfo = audioCtx.createOscillator();
  const lfoGain = audioCtx.createGain();
  lfo.frequency.value = .08;
  lfoGain.gain.value = 260;
  lfo.connect(lfoGain).connect(filter.frequency);
  lfo.start();
}

function playTone(freq, duration = 5) {
  if (!audioCtx || !isPlaying) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const pan = audioCtx.createStereoPanner();
  osc.type = currentMood === "energy" ? "triangle" : "sine";
  osc.frequency.setValueAtTime(freq / 2, now);
  osc.frequency.exponentialRampToValueAtTime(freq, now + .08);
  pan.pan.value = Math.random() * 1.2 - .6;
  gain.gain.setValueAtTime(.0001, now);
  gain.gain.exponentialRampToValueAtTime(currentMood === "energy" ? .12 : .075, now + .8);
  gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
  osc.connect(gain).connect(pan).connect(padGain);
  osc.start(now); osc.stop(now + duration + .1);
}

function scheduleSoundscape() {
  clearInterval(timer);
  const mood = moods[currentMood];
  playTone(mood.notes[Math.floor(Math.random() * mood.notes.length)], mood.tempo / 550);
  timer = setInterval(() => {
    const note = mood.notes[(Math.floor(Math.random() * mood.notes.length) + variation) % mood.notes.length];
    playTone(note * (Math.random() > .78 ? 2 : 1), mood.tempo / 600);
  }, mood.tempo);
}

async function togglePlay(force) {
  initAudio();
  const shouldPlay = typeof force === "boolean" ? force : !isPlaying;
  if (shouldPlay) {
    await audioCtx.resume();
    isPlaying = true;
    startedAt = performance.now() - elapsed * 1000;
    master.gain.cancelScheduledValues(audioCtx.currentTime);
    master.gain.linearRampToValueAtTime(.7, audioCtx.currentTime + 1.5);
    scheduleSoundscape();
  } else {
    isPlaying = false;
    elapsed = (performance.now() - startedAt) / 1000;
    master.gain.cancelScheduledValues(audioCtx.currentTime);
    master.gain.linearRampToValueAtTime(0, audioCtx.currentTime + .5);
    clearInterval(timer);
  }
  body.classList.toggle("playing", isPlaying);
  document.getElementById("statusText").textContent = isPlaying ? "Sound on" : "Sound off";
  playBtn.setAttribute("aria-label", isPlaying ? "暫停" : "播放");
}

function selectMood(name) {
  currentMood = name;
  body.dataset.mood = name;
  const mood = moods[name];
  document.getElementById("trackTitle").textContent = mood.title;
  document.getElementById("trackSubtitle").textContent = mood.subtitle;
  document.querySelectorAll(".mood-card").forEach(card => {
    const selected = card.dataset.mood === name;
    card.classList.toggle("active", selected);
    card.setAttribute("aria-checked", selected);
  });
  if (audioCtx) {
    filter.frequency.cancelScheduledValues(audioCtx.currentTime);
    filter.frequency.linearRampToValueAtTime(name === "energy" ? 1500 : name === "dream" ? 620 : 900, audioCtx.currentTime + 1);
    if (isPlaying) scheduleSoundscape();
  }
}

document.querySelectorAll(".mood-card").forEach(card => {
  card.addEventListener("click", () => selectMood(card.dataset.mood));
});
playBtn.addEventListener("click", () => togglePlay());
soundStatus.addEventListener("click", () => togglePlay());

document.getElementById("shuffleBtn").addEventListener("click", () => {
  variation = (variation + 1) % 4;
  if (isPlaying) {
    scheduleSoundscape();
    playTone(moods[currentMood].notes[variation] * 2, 3);
  }
  showToast("聲景已產生新的變化");
});
document.getElementById("resetBtn").addEventListener("click", () => {
  elapsed = 0; startedAt = performance.now(); progress.value = 0;
  if (isPlaying) scheduleSoundscape();
  showToast("已回到聲景起點");
});
progress.addEventListener("input", () => {
  elapsed = Number(progress.value) * 3.6;
  startedAt = performance.now() - elapsed * 1000;
  progress.style.setProperty("--progress", progress.value + "%");
});

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return m + ":" + s;
}
function updateClock() {
  if (isPlaying) elapsed = (performance.now() - startedAt) / 1000;
  const visual = (elapsed % 360) / 3.6;
  progress.value = visual;
  progress.style.setProperty("--progress", visual + "%");
  document.getElementById("currentTime").textContent = formatTime(elapsed);
  requestAnimationFrame(updateClock);
}
updateClock();

document.getElementById("breathToggle").addEventListener("click", () => {
  breathing = !breathing;
  document.querySelector(".breath-panel").classList.toggle("paused", !breathing);
  document.getElementById("breathToggle").textContent = breathing ? "暫停呼吸引導" : "繼續呼吸引導";
});

let breathPhase = true;
setInterval(() => {
  if (!breathing) return;
  breathPhase = !breathPhase;
  document.getElementById("breathText").textContent = breathPhase ? "吸氣" : "吐氣";
  document.getElementById("breathHint").textContent = breathPhase ? "跟著光圈，慢慢吸氣" : "放鬆身體，緩緩吐氣";
}, 4000);

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast.hideTimer);
  toast.hideTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

const canvas = document.getElementById("ambientCanvas");
const ctx = canvas.getContext("2d");
let particles = [];
function resize() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  particles = Array.from({length: Math.min(55, Math.floor(innerWidth / 22))}, () => ({
    x: Math.random()*innerWidth, y:Math.random()*innerHeight,
    r:Math.random()*1.4+.2, vx:(Math.random()-.5)*.16, vy:(Math.random()-.5)*.16,
    a:Math.random()*.22+.03
  }));
}
function draw() {
  ctx.clearRect(0,0,innerWidth,innerHeight);
  const g=ctx.createRadialGradient(innerWidth*.78,innerHeight*.24,0,innerWidth*.78,innerHeight*.24,innerWidth*.65);
  const c=moods[currentMood].colors;
  g.addColorStop(0,c[1]+"25");g.addColorStop(.45,c[0]+"0d");g.addColorStop(1,"transparent");
  ctx.fillStyle=g;ctx.fillRect(0,0,innerWidth,innerHeight);
  particles.forEach(p=>{
    p.x+=p.vx*(isPlaying?2:1);p.y+=p.vy*(isPlaying?2:1);
    if(p.x<0)p.x=innerWidth;if(p.x>innerWidth)p.x=0;if(p.y<0)p.y=innerHeight;if(p.y>innerHeight)p.y=0;
    ctx.beginPath();ctx.fillStyle=moods[currentMood].particle+p.a+")";ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
  });
  requestAnimationFrame(draw);
}
addEventListener("resize",resize);resize();draw();

const valenceSlider = document.getElementById("valence");
const arousalSlider = document.getElementById("arousal");
const valenceOut = document.getElementById("valenceOut");
const arousalOut = document.getElementById("arousalOut");

function updateCheckin() {
  valenceOut.value = valenceSlider.value;
  arousalOut.value = arousalSlider.value;
  valenceSlider.style.setProperty("--progress", ((valenceSlider.value - 1) / 8 * 100) + "%");
  arousalSlider.style.setProperty("--progress", ((arousalSlider.value - 1) / 8 * 100) + "%");
}
valenceSlider.addEventListener("input", updateCheckin);
arousalSlider.addEventListener("input", updateCheckin);
updateCheckin();
