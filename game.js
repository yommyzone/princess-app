(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const STORE = "sunny-steps-v1";

  const COLORS = [
    { id: "red", name: "red", hex: "#ff6b6b" },
    { id: "blue", name: "blue", hex: "#4dabf7" },
    { id: "yellow", name: "yellow", hex: "#f4b942" },
    { id: "green", name: "green", hex: "#51cf66" },
    { id: "orange", name: "orange", hex: "#ff922b" },
    { id: "purple", name: "purple", hex: "#b197fc" },
    { id: "pink", name: "pink", hex: "#ff8cc8" },
    { id: "brown", name: "brown", hex: "#c08552" }
  ];

  const SHAPES = ["circle", "square", "triangle", "star", "heart", "diamond"];

  const ANIMALS = [
    { id: "cat", name: "cat", sound: "meow" },
    { id: "dog", name: "dog", sound: "woof" },
    { id: "bird", name: "bird", sound: "tweet" },
    { id: "fish", name: "fish", sound: "blub" },
    { id: "frog", name: "frog", sound: "ribbit" },
    { id: "bee", name: "bee", sound: "buzz" },
    { id: "owl", name: "owl", sound: "hoo" },
    { id: "fox", name: "fox", sound: "yip" },
    { id: "cow", name: "cow", sound: "moo" },
    { id: "pig", name: "pig", sound: "oink" },
    { id: "duck", name: "duck", sound: "quack" },
    { id: "sheep", name: "sheep", sound: "baa" },
    { id: "lion", name: "lion", sound: "roar" },
    { id: "mouse", name: "mouse", sound: "squeak" },
    { id: "horse", name: "horse", sound: "neigh" },
    { id: "chick", name: "chick", sound: "cheep" }
  ];

  const WORDS = {
    easy: ["CAT", "SUN", "HAT", "DOG", "BEE", "BUS", "MOM", "DAD", "RED", "CUP", "MAP", "PEN", "BAT", "BUG", "FAN", "LOG", "PIG", "HEN", "NET", "MUG", "CAR", "BOX", "EGG", "ANT", "OWL", "FOX", "TOY", "BED", "JAM", "ZIP"],
    medium: ["FROG", "STAR", "FISH", "TREE", "BOOK", "RAIN", "PLAY", "JUMP", "CAKE", "BIRD", "SHIP", "MOON", "LEAF", "DUCK", "FARM", "WIND", "SONG", "MILK", "ROAD", "PARK", "HAND", "BALL", "KITE", "CORN", "LAMP", "DRUM", "COAT", "BEAR", "NEST", "GOLD", "SNOW", "WAVE", "SEED", "GATE", "ROCK"],
    hard: ["APPLE", "TIGER", "SMILE", "CLOUD", "PLANT", "CHAIR", "SNAKE", "BREAD", "HORSE", "LIGHT", "TRAIN", "RIVER", "PLANE", "QUEEN", "GREEN", "CLOCK", "BRUSH", "GRAPE", "SHEEP", "BEACH", "STORM", "CANDY", "PIZZA", "MUSIC", "WATER", "HAPPY", "SLEEP", "DREAM", "STONE", "FLUTE", "ORANGE", "PURPLE", "BUTTON", "PENCIL", "ROCKET", "GARDEN", "PLANET", "TURTLE", "FLOWER", "WINDOW"]
  };

  const STICKERS = [
    { id: "sun", label: "Sunny" },
    { id: "star", label: "Star" },
    { id: "heart", label: "Heart" },
    { id: "cat", label: "Cat" },
    { id: "frog", label: "Frog" },
    { id: "bee", label: "Bee" },
    { id: "fish", label: "Fish" },
    { id: "owl", label: "Owl" }
  ];

  const TOPICS = {
    easy: [
      { id: "letters", name: "Letters", hint: "Find the letter", art: "Aa" },
      { id: "count", name: "Counting", hint: "How many?", art: "123" },
      { id: "colors", name: "Colors", hint: "Name the color", art: " pal" },
      { id: "shapes", name: "Shapes", hint: "Spot the shape", art: "shp" },
      { id: "animals", name: "Animals", hint: "Who is this?", art: "cat" },
      { id: "lettertrace", name: "Alphabet Trace", hint: "Trace A, B, C in order", art: "trA" },
      { id: "numbertrace", name: "Number Trace", hint: "Trace 0, 1, 2 in order", art: "tr1" },
      { id: "know", name: "Know the World", hint: "Easy general knowledge", art: "gk" }
    ],
    medium: [
      { id: "words", name: "Word Builder", hint: "Fill the missing letter", art: "ABC" },
      { id: "add", name: "Adding", hint: "Put numbers together", art: "1+2" },
      { id: "patterns", name: "Patterns", hint: "What comes next?", art: "pat" },
      { id: "numbers", name: "Number Sense", hint: "Bigger, smaller, skip", art: "10" },
      { id: "spell", name: "Spelling", hint: "Build the word", art: "CAT" },
      { id: "know", name: "Know the World", hint: "Facts for growing minds", art: "gk" }
    ],
    hard: [
      { id: "times", name: "Multiplication Table", hint: "Fill the times table", art: "3x4" },
      { id: "subtract", name: "Take Away", hint: "Find the difference", art: "9-4" },
      { id: "spell", name: "Spelling Bee", hint: "Build longer words", art: "SUN" },
      { id: "puzzle", name: "Number Puzzles", hint: "Reason it out", art: "?" },
      { id: "vocab", name: "Word Smarts", hint: "Opposites and groups", art: "abc" },
      { id: "know", name: "Know the World", hint: "Science, Earth, and more", art: "gk" }
    ]
  };

  const MODE_META = {
    easy: { title: "Easy", age: "Ages 3 to 5", rounds: 30 },
    medium: { title: "Medium", age: "Ages 6 to 7", rounds: 30 },
    hard: { title: "Hard", age: "Ages 8 to 10", rounds: 40 }
  };

  const NOTE = { C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392, A4: 440, B4: 493.88, C5: 523.25, G3: 196, REST: 0 };
  const TWINKLE = [
    ["C4", 1], ["C4", 1], ["G4", 1], ["G4", 1], ["A4", 1], ["A4", 1], ["G4", 2],
    ["F4", 1], ["F4", 1], ["E4", 1], ["E4", 1], ["D4", 1], ["D4", 1], ["C4", 2],
    ["G4", 1], ["G4", 1], ["F4", 1], ["F4", 1], ["E4", 1], ["E4", 1], ["D4", 2],
    ["G4", 1], ["G4", 1], ["F4", 1], ["F4", 1], ["E4", 1], ["E4", 1], ["D4", 2],
    ["C4", 1], ["C4", 1], ["G4", 1], ["G4", 1], ["A4", 1], ["A4", 1], ["G4", 2],
    ["F4", 1], ["F4", 1], ["E4", 1], ["E4", 1], ["D4", 1], ["D4", 1], ["C4", 2]
  ];

  let store = load();
  let audioCtx = null;
  let mode = null;
  let topic = null;
  let round = null;
  let music = { playing: false, timer: null, idx: 0, gain: null };

  function load() {
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { sound: true, stickers: [], stars: 0 };
  }

  function save() {
    localStorage.setItem(STORE, JSON.stringify(store));
  }

  function rand(n) {
    return Math.floor(Math.random() * n);
  }

  function pick(list) {
    return list[rand(list.length)];
  }

  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = rand(i + 1);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function uniqueChoices(correct, pool, n) {
    const rest = shuffle(pool.filter((x) => x !== correct));
    return shuffle([correct, ...rest.slice(0, n - 1)]);
  }

  function svgShape(kind, fill) {
    const c = fill || "#f4b942";
    if (kind === "circle") return `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="22" fill="${c}"/></svg>`;
    if (kind === "square") return `<svg viewBox="0 0 64 64"><rect x="12" y="12" width="40" height="40" rx="6" fill="${c}"/></svg>`;
    if (kind === "triangle") return `<svg viewBox="0 0 64 64"><polygon points="32,10 54,52 10,52" fill="${c}"/></svg>`;
    if (kind === "star") return `<svg viewBox="0 0 64 64"><polygon points="32,8 39,26 58,26 42,38 48,56 32,45 16,56 22,38 6,26 25,26" fill="${c}"/></svg>`;
    if (kind === "heart") return `<svg viewBox="0 0 64 64"><path d="M32 54 C12 38 8 24 20 16 c7-5 12-2 12 4 0-6 5-9 12-4 12 8 8 22-12 38z" fill="${c}"/></svg>`;
    if (kind === "diamond") return `<svg viewBox="0 0 64 64"><polygon points="32,8 56,32 32,56 8,32" fill="${c}"/></svg>`;
    return "";
  }

  function svgAnimal(id) {
    const art = {
      cat: `<circle cx="32" cy="38" r="18" fill="#f4b942"/><polygon points="16,28 20,10 28,26" fill="#f4b942"/><polygon points="48,28 44,10 36,26" fill="#f4b942"/><circle cx="26" cy="36" r="2.4" fill="#3a2a1a"/><circle cx="38" cy="36" r="2.4" fill="#3a2a1a"/><ellipse cx="32" cy="44" rx="3" ry="2" fill="#ff7b6b"/>`,
      dog: `<ellipse cx="32" cy="38" rx="18" ry="16" fill="#c08552"/><ellipse cx="16" cy="30" rx="7" ry="10" fill="#a0673b"/><ellipse cx="48" cy="30" rx="7" ry="10" fill="#a0673b"/><circle cx="26" cy="36" r="2.4" fill="#3a2a1a"/><circle cx="38" cy="36" r="2.4" fill="#3a2a1a"/><ellipse cx="32" cy="44" rx="4" ry="2.4" fill="#3a2a1a"/>`,
      bird: `<ellipse cx="34" cy="36" rx="16" ry="13" fill="#4dabf7"/><circle cx="22" cy="28" r="9" fill="#4dabf7"/><circle cx="20" cy="26" r="2" fill="#3a2a1a"/><polygon points="10,28 2,30 10,34" fill="#f4b942"/><ellipse cx="42" cy="40" rx="10" ry="6" fill="#74c0fc"/>`,
      fish: `<ellipse cx="34" cy="32" rx="18" ry="12" fill="#4dabf7"/><polygon points="16,32 4,20 4,44" fill="#74c0fc"/><circle cx="44" cy="30" r="2.4" fill="#3a2a1a"/><path d="M28 32 h10" stroke="#3a2a1a55" stroke-width="2"/>`,
      frog: `<circle cx="32" cy="38" r="18" fill="#51cf66"/><circle cx="22" cy="22" r="8" fill="#51cf66"/><circle cx="42" cy="22" r="8" fill="#51cf66"/><circle cx="22" cy="22" r="3.4" fill="#fff"/><circle cx="42" cy="22" r="3.4" fill="#fff"/><circle cx="22" cy="22" r="1.8" fill="#3a2a1a"/><circle cx="42" cy="22" r="1.8" fill="#3a2a1a"/>`,
      bee: `<ellipse cx="32" cy="36" rx="16" ry="12" fill="#f4b942"/><rect x="22" y="26" width="6" height="20" fill="#3a2a1a"/><rect x="36" y="26" width="6" height="20" fill="#3a2a1a"/><ellipse cx="22" cy="22" rx="8" ry="6" fill="#d0ebff"/><ellipse cx="42" cy="22" rx="8" ry="6" fill="#d0ebff"/>`,
      owl: `<ellipse cx="32" cy="36" rx="18" ry="20" fill="#b89be8"/><circle cx="24" cy="32" r="7" fill="#fff"/><circle cx="40" cy="32" r="7" fill="#fff"/><circle cx="24" cy="32" r="3" fill="#3a2a1a"/><circle cx="40" cy="32" r="3" fill="#3a2a1a"/><polygon points="32,38 28,46 36,46" fill="#f4b942"/>`,
      fox: `<circle cx="32" cy="38" r="18" fill="#ff922b"/><polygon points="14,30 20,10 28,28" fill="#ff922b"/><polygon points="50,30 44,10 36,28" fill="#ff922b"/><ellipse cx="32" cy="46" rx="10" ry="8" fill="#fff7ea"/><circle cx="26" cy="34" r="2.2" fill="#3a2a1a"/><circle cx="38" cy="34" r="2.2" fill="#3a2a1a"/>`,
      cow: `<ellipse cx="34" cy="40" rx="20" ry="14" fill="#fff"/><circle cx="18" cy="28" r="10" fill="#fff"/><rect x="22" y="18" width="6" height="12" fill="#c08552"/><rect x="8" y="18" width="6" height="12" fill="#c08552"/><ellipse cx="28" cy="42" rx="6" ry="5" fill="#3a2a1a"/><ellipse cx="44" cy="36" rx="5" ry="4" fill="#3a2a1a"/><circle cx="14" cy="26" r="2" fill="#3a2a1a"/>`,
      pig: `<ellipse cx="34" cy="38" rx="18" ry="14" fill="#ffb3c1"/><ellipse cx="18" cy="36" rx="8" ry="7" fill="#ffb3c1"/><circle cx="18" cy="36" r="4" fill="#ff8fab"/><circle cx="14" cy="34" r="1.4" fill="#3a2a1a"/><circle cx="22" cy="34" r="1.4" fill="#3a2a1a"/><ellipse cx="12" cy="24" rx="4" ry="6" fill="#ff8fab"/><ellipse cx="24" cy="24" rx="4" ry="6" fill="#ff8fab"/>`,
      duck: `<ellipse cx="36" cy="40" rx="16" ry="12" fill="#f4b942"/><circle cx="22" cy="30" r="10" fill="#f4b942"/><polygon points="12,30 2,32 12,36" fill="#ff922b"/><circle cx="20" cy="28" r="1.8" fill="#3a2a1a"/><ellipse cx="42" cy="48" rx="10" ry="4" fill="#ff922b"/>`,
      sheep: `<ellipse cx="34" cy="40" rx="18" ry="14" fill="#fff"/><circle cx="18" cy="34" r="9" fill="#d4a574"/><circle cx="16" cy="32" r="1.8" fill="#3a2a1a"/><circle cx="22" cy="32" r="1.8" fill="#3a2a1a"/><circle cx="26" cy="24" r="6" fill="#fff"/><circle cx="40" cy="24" r="7" fill="#fff"/><circle cx="48" cy="36" r="6" fill="#fff"/>`,
      lion: `<circle cx="32" cy="36" r="16" fill="#f4b942"/><circle cx="32" cy="36" r="22" fill="none" stroke="#ff922b" stroke-width="8"/><circle cx="26" cy="34" r="2.2" fill="#3a2a1a"/><circle cx="38" cy="34" r="2.2" fill="#3a2a1a"/><ellipse cx="32" cy="42" rx="4" ry="3" fill="#c08552"/>`,
      mouse: `<ellipse cx="34" cy="40" rx="16" ry="12" fill="#cfcfcf"/><circle cx="18" cy="28" r="8" fill="#cfcfcf"/><circle cx="12" cy="18" r="6" fill="#e9e9e9"/><circle cx="24" cy="16" r="6" fill="#e9e9e9"/><circle cx="16" cy="26" r="1.6" fill="#3a2a1a"/><ellipse cx="12" cy="32" rx="4" ry="2" fill="#ffb3c1"/>`,
      horse: `<ellipse cx="36" cy="40" rx="18" ry="12" fill="#c08552"/><ellipse cx="18" cy="30" rx="10" ry="8" fill="#c08552"/><rect x="12" y="14" width="6" height="16" fill="#a0673b"/><circle cx="14" cy="28" r="1.8" fill="#3a2a1a"/><polygon points="54,36 62,28 62,44" fill="#a0673b"/>`,
      chick: `<circle cx="32" cy="38" r="16" fill="#ffe066"/><circle cx="44" cy="24" r="8" fill="#ffe066"/><polygon points="52,24 60,26 52,30" fill="#ff922b"/><circle cx="46" cy="22" r="1.6" fill="#3a2a1a"/><ellipse cx="22" cy="44" rx="7" ry="4" fill="#f4b942"/>`
    };
    return `<svg viewBox="0 0 64 64">${art[id] || ""}</svg>`;
  }

  function svgSticker(id) {
    if (id === "sun") return `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="14" fill="#f4b942"/><g stroke="#f4b942" stroke-width="4" stroke-linecap="round"><line x1="32" y1="6" x2="32" y2="14"/><line x1="32" y1="50" x2="32" y2="58"/><line x1="6" y1="32" x2="14" y2="32"/><line x1="50" y1="32" x2="58" y2="32"/><line x1="12" y1="12" x2="18" y2="18"/><line x1="46" y1="46" x2="52" y2="52"/><line x1="52" y1="12" x2="46" y2="18"/><line x1="18" y1="46" x2="12" y2="52"/></g></svg>`;
    if (["star", "heart"].includes(id)) return svgShape(id, id === "star" ? "#f4b942" : "#ff7b6b");
    return svgAnimal(id);
  }

  function topicArt(id) {
    if (id === "letters") return `<div class="topic-art" style="background:#ffe7a3"><svg viewBox="0 0 64 64"><text x="8" y="46" font-size="36" font-weight="800" fill="#e09a18">A</text></svg></div>`;
    if (id === "count" || id === "numbers") return `<div class="topic-art" style="background:#c8f0d4"><svg viewBox="0 0 64 64"><text x="10" y="46" font-size="32" font-weight="800" fill="#2f8a55">12</text></svg></div>`;
    if (id === "colors") return `<div class="topic-art" style="background:#ffd0c8"><svg viewBox="0 0 64 64"><circle cx="22" cy="28" r="12" fill="#ff6b6b"/><circle cx="40" cy="28" r="12" fill="#4dabf7"/><circle cx="32" cy="42" r="12" fill="#f4b942"/></svg></div>`;
    if (id === "shapes") return `<div class="topic-art" style="background:#d7f0fb">${svgShape("star", "#4dabf7")}</div>`;
    if (id === "animals") return `<div class="topic-art" style="background:#ffe7a3">${svgAnimal("cat")}</div>`;
    if (id === "words" || id === "spell" || id === "vocab") return `<div class="topic-art" style="background:#e5dbff"><svg viewBox="0 0 64 64"><text x="6" y="44" font-size="22" font-weight="800" fill="#7048e8">ABC</text></svg></div>`;
    if (id === "add" || id === "times" || id === "subtract" || id === "puzzle") return `<div class="topic-art" style="background:#c8f0d4"><svg viewBox="0 0 64 64"><text x="8" y="44" font-size="26" font-weight="800" fill="#2f8a55">1+2</text></svg></div>`;
    if (id === "patterns") return `<div class="topic-art" style="background:#fff0d4">${svgShape("circle", "#ff922b")}</div>`;
    if (id === "lettertrace") return `<div class="topic-art" style="background:#ffe7a3"><svg viewBox="0 0 64 64"><text x="10" y="46" font-size="34" font-weight="800" fill="none" stroke="#e09a18" stroke-width="3">A</text></svg></div>`;
    if (id === "numbertrace") return `<div class="topic-art" style="background:#c8f0d4"><svg viewBox="0 0 64 64"><text x="14" y="46" font-size="34" font-weight="800" fill="none" stroke="#2f8a55" stroke-width="3">5</text></svg></div>`;
    if (id === "know") return `<div class="topic-art" style="background:#d7f0fb"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="16" fill="#4dabf7"/><ellipse cx="32" cy="32" rx="7" ry="16" fill="none" stroke="#fff" stroke-width="3"/><path d="M16 32h32M18 24h28M18 40h28" fill="none" stroke="#fff" stroke-width="2"/></svg></div>`;
    return `<div class="topic-art" style="background:#ffe7a3"></div>`;
  }

  function ensureAudio() {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      if (!audioCtx) audioCtx = new Ctx();
      if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
      return audioCtx;
    } catch (e) {
      return null;
    }
  }

  function beep(freq, dur, type, vol) {
    if (!store.sound) return;
    try {
      const ctx = ensureAudio();
      if (!ctx) return;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type || "sine";
      o.frequency.value = freq;
      g.gain.value = vol || 0.07;
      g.gain.setValueAtTime(vol || 0.07, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + dur);
    } catch (e) {}
  }

  function sfx(kind) {
    if (kind === "tap") beep(520, 0.07, "triangle", 0.04);
    if (kind === "good") {
      beep(523, 0.1, "sine", 0.07);
      setTimeout(() => beep(784, 0.16, "sine", 0.07), 90);
    }
    if (kind === "bad") beep(196, 0.16, "square", 0.035);
    if (kind === "win") [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => beep(f, 0.16, "sine", 0.07), i * 100));
  }

  function stopMusic() {
    music.playing = false;
    music.next = 0;
    if (music.timer) {
      clearTimeout(music.timer);
      music.timer = null;
    }
    if (music.gain && audioCtx) {
      try { music.gain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.08); } catch (e) {}
    }
  }

  function scheduleTune() {
    if (!store.sound || !music.playing) return;
    const ctx = ensureAudio();
    if (!ctx || ctx.state !== "running") {
      music.timer = setTimeout(scheduleTune, 180);
      return;
    }
    if (!music.gain) {
      music.gain = ctx.createGain();
      music.gain.gain.value = 0.12;
      music.gain.connect(ctx.destination);
    } else {
      music.gain.gain.setTargetAtTime(0.12, ctx.currentTime, 0.05);
    }
    const beat = 0.38;
    let t = Math.max(ctx.currentTime + 0.04, music.next || ctx.currentTime + 0.04);
    const horizon = ctx.currentTime + 1.6;
    while (t < horizon) {
      const [name, len] = TWINKLE[music.idx % TWINKLE.length];
      const freq = NOTE[name] || 0;
      const dur = len * beat;
      if (freq) {
        try {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = "triangle";
          o.frequency.setValueAtTime(freq, t);
          g.gain.setValueAtTime(0.0001, t);
          g.gain.linearRampToValueAtTime(0.16, t + 0.03);
          g.gain.linearRampToValueAtTime(0.0001, t + dur * 0.92);
          o.connect(g);
          g.connect(music.gain);
          o.start(t);
          o.stop(t + dur);
        } catch (e) {}
      }
      music.idx = (music.idx + 1) % TWINKLE.length;
      t += dur;
    }
    music.next = t;
    music.timer = setTimeout(scheduleTune, 700);
  }

  function startMusic() {
    if (!store.sound) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const kick = () => {
      music.playing = true;
      if (!music.timer) scheduleTune();
    };
    if (ctx.state === "suspended") {
      ctx.resume().then(kick).catch(kick);
      return;
    }
    kick();
  }

  function speak(text) {
    if (!store.sound || !window.speechSynthesis || !text) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.92;
      u.pitch = 1.15;
      const voices = window.speechSynthesis.getVoices() || [];
      const kid = voices.find((v) => /child|kid|female|samantha|google us/i.test(v.name || ""));
      if (kid) u.voice = kid;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  function show(id, title, sub) {
    $$(".screen").forEach((el) => el.classList.toggle("hidden", el.id !== id));
    $("#backBtn").classList.toggle("hidden", id === "home");
    $("#pageTitle").textContent = title;
    $("#pageSub").textContent = sub || "";
  }

  function goHome() {
    mode = null;
    topic = null;
    round = null;
    hideSheets();
    show("home", "Sunny Steps", "Play. Learn. Grow.");
  }

  function hideSheets() {
    $("#stickers").classList.add("hidden");
    $("#result").classList.add("hidden");
  }

  function openTopics(nextMode) {
    if (!MODE_META[nextMode]) return;
    mode = nextMode;
    const meta = MODE_META[mode];
    show("topics", meta.title, meta.age);
    $("#topicLabel").textContent = "What shall we learn?";
    const grid = $("#topicGrid");
    grid.innerHTML = "";
    TOPICS[mode].forEach((t) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "topic";
      btn.innerHTML = `${topicArt(t.id)}<span class="topic-name">${t.name}</span><span class="topic-hint">${t.hint}</span>`;
      btn.addEventListener("click", () => {
        sfx("tap");
        startTopic(t);
      });
      grid.appendChild(btn);
    });
  }

  window.pickMode = function pickMode(nextMode) {
    sfx("tap");
    startMusic();
    openTopics(nextMode);
  };

  function startTopic(t) {
    topic = t;
    startMusic();
    const want = MODE_META[mode].rounds;
    const qs = makeQuestions(mode, t.id, want);
    round = { i: 0, total: qs.length, score: 0, qs };
    show("play", t.name, MODE_META[mode].title);
    renderQuestion();
  }

  function qKey(q) {
    return [q.answer, q.text, q.type || "", (q.letters || []).join(""), q.trace || ""].join("|");
  }

  function makeQuestions(m, topicId, n) {
    const makers = {
      letters: qLetters,
      count: qCount,
      colors: qColors,
      shapes: qShapes,
      animals: qAnimals,
      words: qWords,
      add: qAdd,
      patterns: qPatterns,
      numbers: qNumbers,
      spell: qSpell,
      times: qTimes,
      subtract: qSubtract,
      puzzle: qPuzzle,
      vocab: qVocab,
      lettertrace: qLetterTrace,
      numbertrace: qNumberTrace,
      know: qKnow
    };
    const fn = makers[topicId] || qLetters;
    const out = [];
    const seen = new Set();
    let guard = 0;
    while (out.length < n && guard < n * 20) {
      const q = fn(m, out);
      guard += 1;
      if (!q) continue;
      const key = qKey(q);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(q);
    }
    return out.slice(0, n);
  }

  function taken(out) {
    return new Set(out.map((q) => qKey(q)));
  }

  function pickFresh(out, makeQ, tries) {
    const used = taken(out);
    for (let i = 0; i < (tries || 40); i++) {
      const q = makeQ();
      if (q && !used.has(qKey(q))) return q;
    }
    return makeQ();
  }

  function qLetters(m, out) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    return pickFresh(out, () => {
      const letter = pick(alphabet);
      const asLower = out.filter((q) => q.answer === letter && q.text.indexOf("Which") === 0).length > 0;
      if (!asLower && rand(2) === 1) {
        return {
          text: "Which one is " + letter + "?",
          speak: "Which one is the letter " + letter,
          visual: `<div class="big-letter">${letter.toLowerCase()}</div>`,
          choices: uniqueChoices(letter, alphabet, 4).map((c) => ({ value: c, html: c })),
          answer: letter
        };
      }
      return {
        text: "Find the letter " + letter,
        speak: "Find the letter " + letter,
        visual: `<div class="big-letter">${letter}</div>`,
        choices: uniqueChoices(letter, alphabet, 4).map((c) => ({ value: c, html: c })),
        answer: letter
      };
    });
  }

  function qCount(m, out) {
    return pickFresh(out, () => {
      const n = 1 + rand(8);
      const animal = pick(ANIMALS);
      const items = Array.from({ length: n }, () => `<span class="item">${svgAnimal(animal.id)}</span>`).join("");
      const pool = [1, 2, 3, 4, 5, 6, 7, 8].map(String);
      return {
        text: "How many " + animal.name + (n === 1 ? "s" : "s") + "?",
        speak: "How many " + animal.name + "s do you see?",
        visual: items,
        choices: uniqueChoices(String(n), pool, 4).map((c) => ({ value: c, html: c })),
        answer: String(n),
        trace: animal.id + ":" + n
      };
    });
  }

  function qColors(m, out) {
    return pickFresh(out, () => {
      const c = pick(COLORS);
      const shape = pick(SHAPES);
      const opts = uniqueChoices(c.id, COLORS.map((x) => x.id), 4);
      return {
        text: "Tap the " + c.name + " one",
        speak: "Tap the " + c.name + " one",
        visual: "",
        choices: opts.map((id) => {
          const x = COLORS.find((k) => k.id === id);
          return { value: x.id, html: `${svgShape(shape, x.hex)}<span class="cap">${x.name}</span>` };
        }),
        answer: c.id,
        trace: c.id + ":" + shape
      };
    });
  }

  function qShapes(m, out) {
    return pickFresh(out, () => {
      const s = pick(SHAPES);
      const color = pick(COLORS);
      return {
        text: "Which shape is this?",
        speak: "Which shape is this?",
        visual: svgShape(s, color.hex),
        choices: uniqueChoices(s, SHAPES, 4).map((x) => ({ value: x, html: x })),
        answer: s,
        trace: s + ":" + color.id
      };
    });
  }

  function qAnimals(m, out) {
    return pickFresh(out, () => {
      const a = pick(ANIMALS);
      const ids = uniqueChoices(a.id, ANIMALS.map((x) => x.id), 4);
      if (rand(2) === 0) {
        return {
          text: "Who is this friend?",
          speak: "Who is this friend?",
          visual: svgAnimal(a.id),
          choices: ids.map((id) => ({ value: id, html: ANIMALS.find((x) => x.id === id).name })),
          answer: a.id,
          trace: "see:" + a.id
        };
      }
      return {
        text: "Who says " + a.sound + "?",
        speak: "Who says " + a.sound + "?",
        visual: "",
        choices: ids.map((id) => {
          const x = ANIMALS.find((k) => k.id === id);
          return { value: x.id, html: `${svgAnimal(x.id)}<span class="cap">${x.name}</span>` };
        }),
        answer: a.id,
        trace: "say:" + a.id
      };
    });
  }

  function qWords(m, out) {
    const list = WORDS[m] || WORDS.medium;
    return pickFresh(out, () => {
      const word = pick(list);
      let hide = 1 + rand(Math.max(1, word.length - 1));
      const shown = word.split("").map((ch, i) => `<span class="word-slot">${i === hide ? "?" : ch}</span>`).join("");
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      const correct = word[hide];
      return {
        text: "Fill the missing letter",
        speak: "Fill the missing letter in the word",
        visual: shown,
        choices: uniqueChoices(correct, alphabet, 4).map((c) => ({ value: c, html: c })),
        answer: correct,
        trace: word + ":" + hide
      };
    });
  }

  function qAdd(m, out) {
    const max = m === "hard" ? 12 : 10;
    return pickFresh(out, () => {
      const a = 1 + rand(max);
      const b = 1 + rand(max);
      const ans = a + b;
      const pool = [];
      for (let i = Math.max(1, ans - 5); i <= ans + 5; i++) pool.push(String(i));
      return {
        text: a + " + " + b + " = ?",
        speak: a + " plus " + b + " equals what?",
        visual: `<div class="big-letter">${a} + ${b}</div>`,
        choices: uniqueChoices(String(ans), pool, 4).map((c) => ({ value: c, html: c })),
        answer: String(ans),
        trace: a + "+" + b
      };
    });
  }

  function qPatterns(m, out) {
    return pickFresh(out, () => {
      const a = pick(SHAPES);
      let b = pick(SHAPES);
      if (a === b) b = SHAPES[(SHAPES.indexOf(a) + 1) % SHAPES.length];
      const seq = [a, b, a, b, a];
      const next = b;
      const visual = seq.map((s) => `<span class="item">${svgShape(s, pick(COLORS).hex)}</span>`).join("") + `<span class="item" style="opacity:.35">${svgShape("circle", "#ccc")}</span>`;
      return {
        text: "What comes next?",
        speak: "What comes next in the pattern?",
        visual,
        choices: uniqueChoices(next, SHAPES, 4).map((s) => ({ value: s, html: svgShape(s, "#f4b942") })),
        answer: next,
        trace: a + "-" + b
      };
    });
  }

  function qNumbers(m, out) {
    return pickFresh(out, () => {
      const kind = rand(3);
      if (kind === 0) {
        const a = 1 + rand(20);
        let b = 1 + rand(20);
        if (a === b) b = a + 1 + rand(5);
        const big = Math.max(a, b);
        return {
          text: "Which number is bigger?",
          speak: "Which number is bigger, " + a + " or " + b + "?",
          visual: "",
          choices: shuffle([a, b]).map((n) => ({ value: String(n), html: String(n) })),
          answer: String(big),
          stack: true,
          trace: "big:" + a + ":" + b
        };
      }
      if (kind === 1) {
        const start = 1 + rand(25);
        return {
          text: "What comes after " + start + "?",
          speak: "What comes after " + start + "?",
          visual: `<div class="big-letter">${start} , ?</div>`,
          choices: uniqueChoices(String(start + 1), [String(start - 1), String(start + 1), String(start + 2), String(start)].filter((x) => Number(x) >= 0), 4).map((c) => ({ value: c, html: c })),
          answer: String(start + 1),
          trace: "after:" + start
        };
      }
      const n = 1 + rand(12);
      return {
        text: "Count by 2. What is next after " + n * 2 + "?",
        speak: "Count by two. What is next after " + n * 2 + "?",
        visual: `<div class="big-letter">${n * 2} , ?</div>`,
        choices: uniqueChoices(String(n * 2 + 2), [String(n * 2 + 1), String(n * 2 + 2), String(n * 2 + 3), String(n * 2)].map(String), 4).map((c) => ({ value: c, html: c })),
        answer: String(n * 2 + 2),
        trace: "skip:" + n
      };
    });
  }

  function qSpell(m, out) {
    const list = WORDS[m] || WORDS.medium;
    return pickFresh(out, () => {
      const word = pick(list);
      return {
        type: "build",
        text: "Build the word",
        speak: "Build the word " + word.split("").join(" "),
        visual: `<div class="big-letter">${word.length} letters</div><p class="cap" style="margin:0;color:#7a6550">Tap letters in order</p>`,
        letters: shuffle(word.split("")),
        answer: word
      };
    });
  }

  function qTimes(m, out) {
    const pairs = [];
    for (let a = 1; a <= 12; a++) {
      for (let b = 1; b <= 12; b++) pairs.push([a, b]);
    }
    return pickFresh(out, () => {
      const [a, b] = pick(pairs);
      const ans = a * b;
      const pool = [ans, ans + a, Math.max(1, ans - a), a + b, ans + b, Math.abs(ans - b), a * (b + 1)].filter((n) => n > 0).map(String);
      return {
        text: a + " × " + b + " = ?",
        speak: a + " times " + b + " equals what?",
        visual: `<div class="big-letter">${a} × ${b}</div>`,
        choices: uniqueChoices(String(ans), pool, 4).map((c) => ({ value: c, html: c })),
        answer: String(ans),
        trace: a + "x" + b
      };
    });
  }

  function qSubtract(m, out) {
    return pickFresh(out, () => {
      const a = 5 + rand(20);
      const b = 1 + rand(Math.min(12, a));
      const ans = a - b;
      const pool = [ans, ans + 1, ans + 2, Math.max(0, ans - 1), a + b, b].map(String);
      return {
        text: a + " − " + b + " = ?",
        speak: a + " minus " + b + " equals what?",
        visual: `<div class="big-letter">${a} − ${b}</div>`,
        choices: uniqueChoices(String(ans), pool, 4).map((c) => ({ value: c, html: c })),
        answer: String(ans),
        trace: a + "-" + b
      };
    });
  }

  function qPuzzle(m, out) {
    return pickFresh(out, () => {
      const kind = rand(8);
      if (kind === 0) {
        const n = 2 + rand(20);
        return {
          text: "I am even. I am " + n + " + " + n + ". Who am I?",
          speak: "I am even. I am " + n + " plus " + n + ". Who am I?",
          visual: "",
          choices: uniqueChoices(String(n * 2), [String(n * 2), String(n), String(n * 2 + 1), String(n + 2)], 4).map((c) => ({ value: c, html: c })),
          answer: String(n * 2),
          stack: true,
          trace: "double:" + n
        };
      }
      if (kind === 1) {
        const a = 2 + rand(20);
        return {
          text: "Half of " + a * 2 + " is?",
          speak: "What is half of " + a * 2 + "?",
          visual: `<div class="big-letter">${a * 2} ÷ 2</div>`,
          choices: uniqueChoices(String(a), [String(a), String(a + 1), String(a * 2), String(Math.max(1, a - 1))], 4).map((c) => ({ value: c, html: c })),
          answer: String(a),
          trace: "half:" + a
        };
      }
      if (kind === 2) {
        const start = 1 + rand(8);
        const step = [2, 3, 4, 5, 10][rand(5)];
        const seq = [start, start + step, start + step * 2, start + step * 3];
        const next = start + step * 4;
        return {
          text: "What number comes next?",
          speak: seq.join(", ") + ", what is next?",
          visual: `<div class="big-letter">${seq.join("  ")}</div>`,
          choices: uniqueChoices(String(next), [String(next), String(next + 1), String(next + step), String(seq[3] + 1)], 4).map((c) => ({ value: c, html: c })),
          answer: String(next),
          trace: "seq:" + start + ":" + step
        };
      }
      if (kind === 3) {
        const n = 3 + rand(12);
        return {
          text: "How many sides does a shape have if it is a regular " + n + "-gon?",
          speak: "How many sides does a " + n + " sided shape have?",
          visual: "",
          choices: uniqueChoices(String(n), [String(n), String(n + 1), String(n - 1), String(n + 2)], 4).map((c) => ({ value: c, html: c })),
          answer: String(n),
          stack: true,
          trace: "gon:" + n
        };
      }
      if (kind === 4) {
        const tens = (2 + rand(8)) * 10;
        const ones = 1 + rand(9);
        const n = tens + ones;
        return {
          text: "What is the tens digit in " + n + "?",
          speak: "What is the tens digit in " + n + "?",
          visual: `<div class="big-letter">${n}</div>`,
          choices: uniqueChoices(String(tens / 10), [String(tens / 10), String(ones), String((tens / 10) + 1), "0"], 4).map((c) => ({ value: c, html: c })),
          answer: String(tens / 10),
          trace: "tens:" + n
        };
      }
      if (kind === 5) {
        const a = 4 + rand(12);
        const b = 3 + rand(9);
        const missing = a * 2 + b;
        return {
          text: "Find the missing number: " + a + " + " + a + " + " + b + " = ?",
          speak: a + " plus " + a + " plus " + b + " equals what?",
          visual: `<div class="big-letter">${a} + ${a} + ${b}</div>`,
          choices: uniqueChoices(String(missing), [String(missing), String(a + b), String(a * 2), String(missing + 1)], 4).map((c) => ({ value: c, html: c })),
          answer: String(missing),
          trace: "sum3:" + a + ":" + b
        };
      }
      if (kind === 6) {
        const n = (3 + rand(9)) * 2;
        return {
          text: n + " is even. What is the next odd number after " + n + "?",
          speak: "What is the next odd number after " + n + "?",
          visual: "",
          choices: uniqueChoices(String(n + 1), [String(n + 1), String(n + 2), String(n - 1), String(n + 3)], 4).map((c) => ({ value: c, html: c })),
          answer: String(n + 1),
          stack: true,
          trace: "odd:" + n
        };
      }
      const rows = 2 + rand(4);
      const cols = 2 + rand(4);
      return {
        text: "A grid has " + rows + " rows and " + cols + " columns. How many squares?",
        speak: "A grid has " + rows + " rows and " + cols + " columns. How many squares?",
        visual: "",
        choices: uniqueChoices(String(rows * cols), [String(rows * cols), String(rows + cols), String(rows * cols + rows), String(Math.abs(rows * cols - cols))], 4).map((c) => ({ value: c, html: c })),
        answer: String(rows * cols),
        stack: true,
        trace: "grid:" + rows + "x" + cols
      };
    });
  }

  function qVocab(m, out) {
    const pairs = [
      ["hot", "cold"], ["big", "small"], ["up", "down"], ["in", "out"],
      ["day", "night"], ["happy", "sad"], ["fast", "slow"], ["open", "closed"],
      ["wet", "dry"], ["old", "new"], ["left", "right"], ["full", "empty"],
      ["soft", "hard"], ["loud", "quiet"], ["near", "far"], ["light", "dark"],
      ["yes", "no"], ["start", "stop"], ["high", "low"], ["clean", "dirty"]
    ];
    const groups = [
      { q: "Which one is a fruit?", ok: "apple", no: ["chair", "shoe", "cloud"] },
      { q: "Which one is an animal?", ok: "tiger", no: ["table", "book", "rain"] },
      { q: "Which one can fly?", ok: "bird", no: ["frog", "fish", "house"] },
      { q: "Which one is a color?", ok: "green", no: ["spoon", "door", "song"] },
      { q: "Which one do we read?", ok: "book", no: ["sock", "lake", "drum"] },
      { q: "Which one is a vegetable?", ok: "carrot", no: ["pencil", "pillow", "kite"] },
      { q: "Which one lives in water?", ok: "fish", no: ["cat", "bee", "owl"] },
      { q: "Which one is a vehicle?", ok: "train", no: ["apple", "shirt", "tree"] },
      { q: "Which one is the weather?", ok: "rain", no: ["plate", "sock", "desk"] },
      { q: "Which one do we wear?", ok: "coat", no: ["lamp", "river", "bread"] },
      { q: "Which one is a drink?", ok: "milk", no: ["rock", "chair", "shoe"] },
      { q: "Which one is a planet?", ok: "Earth", no: ["fork", "sock", "drum"] },
      { q: "Which one is a job?", ok: "teacher", no: ["window", "grape", "cloud"] },
      { q: "Which one is a tool?", ok: "hammer", no: ["flower", "pillow", "song"] },
      { q: "Which one is a season?", ok: "summer", no: ["pencil", "tiger", "clock"] }
    ];
    return pickFresh(out, () => {
      if (rand(2) === 0) {
        const p = pick(pairs);
        const other = pick(pairs.filter((x) => x[0] !== p[0]));
        return {
          text: "Opposite of " + p[0] + "?",
          speak: "What is the opposite of " + p[0] + "?",
          visual: "",
          choices: shuffle([p[1], p[0], other[0], other[1]]).map((c) => ({ value: c, html: c })),
          answer: p[1],
          stack: true,
          trace: "opp:" + p[0]
        };
      }
      const g = pick(groups);
      return {
        text: g.q,
        speak: g.q,
        visual: "",
        choices: shuffle([g.ok, ...g.no]).map((c) => ({ value: c, html: c })),
        answer: g.ok,
        stack: true,
        trace: "grp:" + g.ok
      };
    });
  }

  function qLetterTrace(m, out) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const next = alphabet[out.length] || alphabet[out.length % 26];
    return {
      type: "trace",
      text: "Trace the letter " + next,
      speak: "Trace the letter " + next,
      visual: "",
      answer: next,
      trace: "L" + next
    };
  }

  function qNumberTrace(m, out) {
    const n = out.length;
    return {
      type: "trace",
      text: "Trace the number " + n,
      speak: "Trace the number " + n,
      visual: "",
      answer: String(n),
      trace: "N" + n
    };
  }

  function qKnow(m, out) {
    const easy = [
      { q: "What do we drink when we are thirsty?", ok: "water", no: ["sand", "socks", "smoke"] },
      { q: "What shines in the day sky?", ok: "the sun", no: ["a shoe", "a book", "a frog"] },
      { q: "How many eyes does a person have?", ok: "2", no: ["1", "4", "8"] },
      { q: "What do we use to write on paper?", ok: "a pencil", no: ["a spoon", "a sock", "a cloud"] },
      { q: "Which animal says moo?", ok: "cow", no: ["cat", "bird", "fish"] },
      { q: "What do we wear on our feet?", ok: "shoes", no: ["hats", "gloves", "belts"] },
      { q: "What color is grass?", ok: "green", no: ["purple", "orange", "pink"] },
      { q: "What do bees make?", ok: "honey", no: ["bread", "milk", "snow"] },
      { q: "Where do fish live?", ok: "in water", no: ["in trees", "in shoes", "in clouds"] },
      { q: "What do we sleep on?", ok: "a bed", no: ["a stove", "a kite", "a drum"] },
      { q: "How many wheels does a bicycle have?", ok: "2", no: ["1", "3", "8"] },
      { q: "What falls from the sky when it rains?", ok: "water", no: ["rocks", "toys", "bread"] },
      { q: "Which meal do we eat in the morning?", ok: "breakfast", no: ["homework", "soccer", "bedtime"] },
      { q: "What do we use to cut paper?", ok: "scissors", no: ["a pillow", "a banana", "a sock"] },
      { q: "A stop sign is usually what color?", ok: "red", no: ["blue", "yellow", "green"] },
      { q: "What do we brush every day?", ok: "teeth", no: ["the moon", "the road", "a cloud"] },
      { q: "Which one is a fruit?", ok: "banana", no: ["chair", "shirt", "hammer"] },
      { q: "Birds have what to fly?", ok: "wings", no: ["wheels", "fins", "horns"] },
      { q: "What do we need to see in the dark?", ok: "light", no: ["salt", "a song", "a sock"] },
      { q: "Ice is made of frozen what?", ok: "water", no: ["sand", "wood", "paper"] },
      { q: "Who helps you when you are sick?", ok: "a doctor", no: ["a kite", "a cloud", "a spoon"] },
      { q: "What do plants need to grow?", ok: "sun and water", no: ["socks", "noise", "rocks only"] },
      { q: "Which animal is the biggest?", ok: "elephant", no: ["ant", "mouse", "bee"] },
      { q: "What do we put on bread?", ok: "butter", no: ["shoes", "soap", "sand"] },
      { q: "Night time is when we see the?", ok: "moon", no: ["oven", "school bell", "toothbrush"] },
      { q: "A baby cat is called a?", ok: "kitten", no: ["puppy", "cub only", "chick"] },
      { q: "What do we use our ears for?", ok: "hearing", no: ["tasting", "jumping", "drawing"] },
      { q: "Fire is what?", ok: "hot", no: ["cold", "wet", "soft"] },
      { q: "Libraries are full of?", ok: "books", no: ["boats", "clouds", "trucks"] },
      { q: "We wave a flag on?", ok: "a pole", no: ["a soup", "a shoe", "a pillow"] }
    ];
    const medium = [
      { q: "How many days are in a week?", ok: "7", no: ["5", "10", "12"] },
      { q: "How many months are in a year?", ok: "12", no: ["10", "7", "24"] },
      { q: "What planet do we live on?", ok: "Earth", no: ["Mars", "Jupiter", "the Moon"] },
      { q: "Water boils and turns into?", ok: "steam", no: ["ice", "sand", "oil"] },
      { q: "A tadpole grows into a?", ok: "frog", no: ["bird", "cat", "fish forever"] },
      { q: "Which direction does the sun rise?", ok: "east", no: ["west", "north", "south"] },
      { q: "What do we call frozen rain?", ok: "snow or hail", no: ["fog only", "wind", "smoke"] },
      { q: "Humans breathe in?", ok: "oxygen", no: ["rocks", "light only", "music"] },
      { q: "A map helps us find?", ok: "places", no: ["flavors", "dreams", "songs"] },
      { q: "Which animal is a mammal?", ok: "whale", no: ["shark", "goldfish", "ant"] },
      { q: "The heart pumps?", ok: "blood", no: ["air only", "water", "sand"] },
      { q: "A triangle has how many corners?", ok: "3", no: ["2", "4", "5"] },
      { q: "Which is a continent?", ok: "Africa", no: ["Paris", "the Nile", "Mount Everest"] },
      { q: "Plants make food using?", ok: "sunlight", no: ["thunder", "plastic", "cookies"] },
      { q: "The opposite of desert is a place with lots of?", ok: "rain or water", no: ["silence", "numbers", "shoes"] },
      { q: "A calendar shows?", ok: "days and months", no: ["recipes", "songs", "colors only"] },
      { q: "Bees help flowers by spreading?", ok: "pollen", no: ["paint", "salt", "mud only"] },
      { q: "Which one is a tool?", ok: "hammer", no: ["cloud", "song", "rainbow"] },
      { q: "Your skeleton is made of?", ok: "bones", no: ["feathers", "leaves", "glass"] },
      { q: "A compass points to?", ok: "north", no: ["the kitchen", "yesterday", "yellow"] },
      { q: "Recycling helps the?", ok: "Earth", no: ["moon dust", "video game", "pillow"] },
      { q: "Night and day happen because Earth?", ok: "spins", no: ["melts", "sings", "sleeps"] },
      { q: "A square has sides that are?", ok: "equal", no: ["round", "invisible", "wet"] },
      { q: "Which sense uses the tongue?", ok: "taste", no: ["hearing", "sight", "balance"] },
      { q: "Clouds are made of tiny?", ok: "water drops", no: ["cotton candy", "feathers", "rocks"] },
      { q: "A veterinarian helps?", ok: "animals", no: ["cars only", "clouds", "numbers"] },
      { q: "The largest ocean is the?", ok: "Pacific", no: ["bathtub", "pond", "puddle"] },
      { q: "Shadows appear when light is?", ok: "blocked", no: ["eaten", "painted", "forgotten"] },
      { q: "A thermometer measures?", ok: "temperature", no: ["songs", "height of jokes", "color of socks"] },
      { q: "Which food is a grain?", ok: "rice", no: ["apple juice only", "a rock", "a sock"] }
    ];
    const hard = [
      { q: "How many continents are there?", ok: "7", no: ["5", "6", "9"] },
      { q: "What gas do plants take in?", ok: "carbon dioxide", no: ["helium balloons only", "pure gold", "mustard"] },
      { q: "The Moon orbits the?", ok: "Earth", no: ["Sun only", "Mars", "a comet"] },
      { q: "Water freezes at how many degrees Celsius?", ok: "0", no: ["100", "32", "10"] },
      { q: "Which organ helps you think?", ok: "brain", no: ["elbow", "heel", "ear lobe only"] },
      { q: "Magnets attract?", ok: "iron", no: ["wood", "plastic", "cotton"] },
      { q: "A year is about how many days?", ok: "365", no: ["100", "12", "52"] },
      { q: "Photosynthesis happens mainly in the?", ok: "leaves", no: ["roots only", "flowers only", "soil rocks"] },
      { q: "The equator is an imaginary line around the?", ok: "Earth", no: ["Moon only", "a book", "a house"] },
      { q: "Sound travels as a?", ok: "wave", no: ["color", "smell", "shadow"] },
      { q: "Which planet is known as the Red Planet?", ok: "Mars", no: ["Venus", "Saturn", "Neptune"] },
      { q: "A fossil is usually found in?", ok: "rock", no: ["fresh soup", "a cloud", "a balloon"] },
      { q: "Gravity pulls objects?", ok: "down toward Earth", no: ["into songs", "sideways forever", "into colors"] },
      { q: "The largest animal on Earth is the?", ok: "blue whale", no: ["house cat", "sparrow", "ant"] },
      { q: "H2O is the science name for?", ok: "water", no: ["air", "gold", "wood"] },
      { q: "A century is how many years?", ok: "100", no: ["10", "50", "1000"] },
      { q: "Which layer of Earth do we live on?", ok: "crust", no: ["core", "outer space", "the ocean floor only"] },
      { q: "Bees, ants, and beetles are all?", ok: "insects", no: ["mammals", "fish", "birds"] },
      { q: "The instrument that shows direction is a?", ok: "compass", no: ["fork", "ruler only", "drum"] },
      { q: "Evaporation turns water into?", ok: "vapor", no: ["stone", "metal", "wood"] },
      { q: "Your lungs help you?", ok: "breathe", no: ["digest socks", "grow feathers", "see colors"] },
      { q: "A habitat is a place where an animal?", ok: "lives", no: ["goes shopping", "does homework", "watches TV"] },
      { q: "Which energy comes from the sun?", ok: "solar", no: ["pencil energy", "sock energy", "joke energy"] },
      { q: "The boiling point of water in Celsius is?", ok: "100", no: ["0", "50", "212"] },
      { q: "An author writes?", ok: "books or stories", no: ["only clouds", "only shoes", "only rain"] },
      { q: "A democracy is a way people?", ok: "choose leaders", no: ["bake cakes only", "fly kites only", "sleep"] },
      { q: "Camouflage helps an animal?", ok: "hide", no: ["sing opera", "do math", "drive"] },
      { q: "The North Pole is covered mostly by?", ok: "ice", no: ["desert sand", "jungle", "hot lava"] },
      { q: "A prism can split light into a?", ok: "rainbow", no: ["sandwich", "shadow only", "drumbeat"] },
      { q: "Which blood cells help fight germs?", ok: "white blood cells", no: ["toenails", "hair only", "eyelashes"] },
      { q: "A drought is a long time with too little?", ok: "rain", no: ["homework", "music", "socks"] },
      { q: "The skeleton protects organs and gives the body?", ok: "shape and support", no: ["flavor", "melody", "color only"] },
      { q: "Rotation of Earth causes?", ok: "day and night", no: ["pizza", "weeks of rain always", "the alphabet"] },
      { q: "A producer in a food chain is usually a?", ok: "plant", no: ["lion", "hawk", "shark"] },
      { q: "Friction makes moving things?", ok: "slow down", no: ["turn into gold", "disappear", "sing"] },
      { q: "The capital of a country is often its?", ok: "main government city", no: ["smallest pebble", "oldest tree only", "favorite snack"] },
      { q: "Renewable energy can come from?", ok: "wind or sun", no: ["used tissues", "broken crayons", "yesterday"] },
      { q: "An omnivore eats?", ok: "plants and animals", no: ["only metal", "only air", "only rocks"] },
      { q: "A timeline shows events in?", ok: "order", no: ["random colors", "secret codes only", "reverse gravity"] },
      { q: "The atmosphere is a layer of?", ok: "air around Earth", no: ["cheese", "blankets", "paint"] }
    ];
    const bank = m === "hard" ? hard : m === "medium" ? medium : easy;
    return pickFresh(out, () => {
      const g = pick(bank);
      return {
        text: g.q,
        speak: g.q,
        visual: "",
        choices: shuffle([g.ok, ...g.no]).map((c) => ({ value: c, html: c })),
        answer: g.ok,
        stack: true,
        trace: "know:" + g.ok + ":" + g.q
      };
    });
  }

  function renderQuestion() {
    const q = round.qs[round.i];
    if (!q) {
      endRound();
      return;
    }
    $("#qCount").textContent = (round.i + 1) + " / " + round.total;
    $("#progFill").style.width = (round.i / round.total) * 100 + "%";
    $("#qText").textContent = q.text;
    $("#qVisual").innerHTML = q.visual || "";
    $("#feedback").textContent = "";
    $("#feedback").className = "feedback";
    const box = $("#choices");
    box.innerHTML = "";
    box.className = "choices";
    if (q.stack) box.classList.add("stack");
    if (q.type === "trace") {
      box.className = "choices stack";
      setupTrace(q, box);
      speak(q.speak);
      return;
    }
    if (q.type === "build") {
      box.classList.add("build");
      round.built = "";
      q.letters.forEach((ch, idx) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "letter";
        b.textContent = ch;
        b.dataset.idx = String(idx);
        b.addEventListener("click", () => tapLetter(b, ch, q));
        box.appendChild(b);
      });
      speak(q.speak);
      return;
    }
    (q.choices || []).forEach((c) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "choice";
      b.innerHTML = c.html;
      b.addEventListener("click", () => pickChoice(b, c.value, q));
      box.appendChild(b);
    });
    speak(q.speak);
  }

  function setupTrace(q, box) {
    const wrap = document.createElement("div");
    wrap.className = "trace-wrap";
    wrap.innerHTML = `<canvas id="traceCanvas" width="320" height="320" aria-label="Trace ${q.answer}"></canvas>
      <div class="trace-actions">
        <button type="button" class="btn" id="traceClear">Clear</button>
        <button type="button" class="btn primary" id="traceDone">I did it</button>
      </div>`;
    box.appendChild(wrap);
    const canvas = $("#traceCanvas");
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = Math.min(320, Math.floor(box.clientWidth || 280));
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    round.trace = { drawing: false, ink: 0, size };
    drawGuide(ctx, q.answer, size);
    const pos = (e) => {
      const r = canvas.getBoundingClientRect();
      const t = e.touches ? e.touches[0] : e;
      return { x: t.clientX - r.left, y: t.clientY - r.top };
    };
    const start = (e) => {
      e.preventDefault();
      round.trace.drawing = true;
      const p = pos(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      round.trace.last = p;
    };
    const move = (e) => {
      if (!round.trace.drawing) return;
      e.preventDefault();
      const p = pos(e);
      ctx.strokeStyle = "#e09a18";
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(round.trace.last.x, round.trace.last.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      const dx = p.x - round.trace.last.x;
      const dy = p.y - round.trace.last.y;
      round.trace.ink += Math.sqrt(dx * dx + dy * dy);
      round.trace.last = p;
    };
    const end = () => { round.trace.drawing = false; };
    canvas.addEventListener("pointerdown", start);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointerleave", end);
    canvas.addEventListener("touchstart", start, { passive: false });
    canvas.addEventListener("touchmove", move, { passive: false });
    canvas.addEventListener("touchend", end);
    $("#traceClear").addEventListener("click", () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);
      round.trace.ink = 0;
      drawGuide(ctx, q.answer, size);
    });
    $("#traceDone").addEventListener("click", () => {
      if (round.trace.ink < size * 0.55) {
        sfx("bad");
        $("#feedback").textContent = "Keep tracing the shape.";
        $("#feedback").className = "feedback bad";
        return;
      }
      finishCorrect();
    });
  }

  function drawGuide(ctx, glyph, size) {
    ctx.save();
    ctx.fillStyle = "#fffdf8";
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = "#f0d9b4";
    ctx.setLineDash([6, 6]);
    ctx.strokeRect(10, 10, size - 20, size - 20);
    ctx.setLineDash([]);
    ctx.fillStyle = "#f4b94233";
    ctx.strokeStyle = "#e09a18aa";
    ctx.lineWidth = 4;
    ctx.font = "bold " + Math.floor(size * 0.62) + "px Avenir Next, Trebuchet MS, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(glyph, size / 2, size / 2 + 6);
    ctx.strokeText(glyph, size / 2, size / 2 + 6);
    ctx.restore();
  }

  function tapLetter(btn, ch, q) {
    if (btn.disabled) return;
    const need = q.answer[round.built.length];
    if (ch !== need) {
      sfx("bad");
      btn.classList.add("bad");
      $("#feedback").textContent = "Try the next letter.";
      $("#feedback").className = "feedback bad";
      setTimeout(() => btn.classList.remove("bad"), 280);
      return;
    }
    sfx("tap");
    btn.disabled = true;
    btn.style.opacity = "0.35";
    round.built += ch;
    $("#qVisual").innerHTML = `<div class="big-letter">${round.built}</div>`;
    if (round.built === q.answer) {
      finishCorrect();
    }
  }

  function pickChoice(btn, value, q) {
    if (!round || round.lock) return;
    if (value === q.answer) {
      btn.classList.add("good");
      finishCorrect();
      return;
    }
    sfx("bad");
    btn.classList.add("bad");
    $("#feedback").textContent = "Almost! Try another.";
    $("#feedback").className = "feedback bad";
    setTimeout(() => btn.classList.remove("bad"), 320);
  }

  function finishCorrect() {
    round.lock = true;
    round.score += 1;
    sfx("good");
    $("#feedback").textContent = pick(["Yes!", "Great job!", "You got it!", "Super!"]);
    $("#feedback").className = "feedback good";
    $$("#choices button").forEach((b) => { b.disabled = true; });
    setTimeout(nextQ, 720);
  }

  function nextQ() {
    round.lock = false;
    round.i += 1;
    if (round.i >= round.total) {
      endRound();
      return;
    }
    renderQuestion();
  }

  function renderStars() {
    const n = Number(store.stars) || 0;
    const el = $("#starCount");
    if (el) el.textContent = String(n);
  }

  function endRound() {
    sfx("win");
    startMusic();
    $("#progFill").style.width = "100%";
    const earned = 1;
    store.stars = (Number(store.stars) || 0) + earned;
    const unlocked = unlockSticker();
    save();
    renderStars();
    $("#resultTitle").textContent = round.score === round.total ? "You earned a star!" : "Star unlocked!";
    $("#resultMsg").textContent = "You got " + round.score + " of " + round.total + " right.";
    $("#resultStars").innerHTML = `<i></i>`;
    const bank = $("#starBank");
    if (bank) bank.textContent = "Star bank: " + store.stars + " collected";
    const ns = $("#newSticker");
    if (unlocked) {
      ns.classList.remove("hidden");
      ns.innerHTML = svgSticker(unlocked.id);
      ns.setAttribute("title", "New sticker: " + unlocked.label);
    } else {
      ns.classList.add("hidden");
    }
    $("#result").classList.remove("hidden");
  }

  function unlockSticker() {
    const have = new Set(store.stickers);
    const next = STICKERS.find((s) => !have.has(s.id));
    if (!next) return null;
    store.stickers.push(next.id);
    return next;
  }

  function renderStickers() {
    const grid = $("#stickerGrid");
    grid.innerHTML = "";
    STICKERS.forEach((s) => {
      const on = store.stickers.includes(s.id);
      const el = document.createElement("div");
      el.className = "sticker" + (on ? " on" : "");
      el.innerHTML = on ? svgSticker(s.id) : "?";
      el.title = on ? s.label : "Locked";
      grid.appendChild(el);
    });
  }

  function setSoundUi() {
    $("#icoOn").classList.toggle("hidden", !store.sound);
    $("#icoOff").classList.toggle("hidden", store.sound);
    $("#soundBtn").setAttribute("aria-pressed", store.sound ? "true" : "false");
  }

  function onTap(el, fn) {
    if (!el) return;
    el.addEventListener("click", (e) => {
      e.preventDefault();
      fn(e);
    });
  }

  onTap($("#soundBtn"), () => {
    store.sound = !store.sound;
    save();
    setSoundUi();
    if (store.sound) {
      sfx("tap");
      startMusic();
    } else {
      stopMusic();
      if (window.speechSynthesis) {
        try { window.speechSynthesis.cancel(); } catch (e) {}
      }
    }
  });

  onTap($("#backBtn"), () => {
    sfx("tap");
    hideSheets();
    const play = document.getElementById("play");
    if (play && !play.classList.contains("hidden") && mode) {
      openTopics(mode);
      return;
    }
    goHome();
  });

  onTap($("#stickerBtn"), () => {
    sfx("tap");
    renderStickers();
    $("#stickers").classList.remove("hidden");
  });

  onTap($("#closeStickers"), () => $("#stickers").classList.add("hidden"));
  onTap($("#againBtn"), () => {
    hideSheets();
    if (topic) startTopic(topic);
  });
  onTap($("#topicsBtn"), () => {
    hideSheets();
    if (mode) openTopics(mode);
    else goHome();
  });
  onTap($("#speakBtn"), () => {
    if (round && round.qs[round.i]) speak(round.qs[round.i].speak);
  });

  document.addEventListener("pointerdown", () => {
    if (store.sound) startMusic();
  });

  try { setSoundUi(); renderStars(); } catch (e) {}

  if (window.speechSynthesis) {
    try { window.speechSynthesis.getVoices(); } catch (e) {}
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
})();
