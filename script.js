// ---------------------------------------------------------
// Add your works here. Put the image files in /images.
// ---------------------------------------------------------
const works = [
  {
    src: "images/arms-crossed.webp",
    title: "Last-minute outfit change",
    details: "Monotype in oil on Awagami Kitakata Select",
    measurements: "52 x 44 cm",
    year: "2026"
  },
  {
    src: "images/blue-hill.webp",
    title: "Blue hill",
    details: "Oil on gesso Board",
    measurements: "28 x 35.5 cm",
    year: "2026"
  },
  {
    src: "images/dog-bandana.webp",
    title: "Jacquard Path",
    details: "Oil on gesso Board",
    measurements: "28 x 35.5 cm",
    year: "2026"
  },
  {
    src: "images/green-background.webp",
    title: "Green Fence",
    details: "Oil on gesso Board",
    measurements: "28 x 35.5 cm",
    year: "2026"
  },
  {
    src: "images/yellow-red-lady.webp",
    title: "Trans-Siberian railway crossing",
    details: "Monotype in oil on Awagami Kitakata Select",
    measurements: "52 x 44 cm",
    year: "2026"
    // sample layout 
  },
  {
    src: "images/lamp-room.webp",
    title: "Morning in the foresteria",
    details: "Monotype in oil on Awagami Kitakata Select",
    measurements: "52 x 44 cm",
    year: "2026"
  },
  {
    src: "images/lady-dress.webp",
    title: "Lady Dress",
    details: "Oil on gesso Board",
    measurements: "28 x 35.5 cm",
    year: "2026"
  }
  
];

// ---------------------------------------------------------
const img      = document.getElementById("slide-img");
const counter  = document.getElementById("slide-counter");
const title    = document.getElementById("slide-title");
const details  = document.getElementById("slide-details");
const measurements  = document.getElementById("slide-measurements");
const year  = document.getElementById("slide-year");
const textBox  = document.querySelector(".overleaf-text");

let current = 0;

// Allow linking to a specific work, e.g. index.html#3
const fromHash = parseInt(location.hash.slice(1), 10);
if (fromHash >= 1 && fromHash <= works.length) current = fromHash - 1;

function pad(n) { return String(n).padStart(2, "0"); }

function show(index) {
  current = (index + works.length) % works.length;   // wrap around
  const work = works[current];

  img.classList.remove("visible");
  textBox.classList.add("fading");

  const loader = new Image();
  loader.onload = loader.onerror = () => {
    img.src = work.src;
    img.alt = work.title;

    counter.textContent = `${pad(current + 1)} / ${pad(works.length)}`;
    title.textContent   = work.title;
    details.textContent = work.details || "";
    measurements.textContent = work.measurements || "";
    year.textContent = work.year || "";

    img.classList.add("visible");
    textBox.classList.remove("fading");
    history.replaceState(null, "", `#${current + 1}`);
  };
  loader.src = work.src;

  // Preload neighbours so clicking feels instant
  [current + 1, current - 1].forEach(i => {
    new Image().src = works[(i + works.length) % works.length].src;
  });
}

const next = () => show(current + 1);
const prev = () => show(current - 1);

// Click halves of the image area
document.querySelector(".hit.next").addEventListener("click", next);
document.querySelector(".hit.prev").addEventListener("click", prev);

// Keyboard arrows
document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft")  prev();
});

// Swipe on touch screens
let touchX = null;
const stage = document.querySelector(".slideshow");
stage.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; }, { passive: true });
stage.addEventListener("touchend", e => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
  touchX = null;
});

show(current);
