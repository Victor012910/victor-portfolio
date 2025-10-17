// Theme toggle
const toggleBtn = document.getElementById("themeToggle");
toggleBtn.addEventListener("click", () => {
  const current = document.body.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  document.body.setAttribute("data-theme", next);
  toggleBtn.textContent = next === "light" ? "☀️" : "🌙";
});

// Tab switching with fade transition
const tabLinks = document.querySelectorAll(".tab-link, .btn[data-tab]");
const tabs = document.querySelectorAll(".tab-content");
tabLinks.forEach(link => {
  link.addEventListener("click", () => {
    const target = link.dataset.tab;
    if (!target) return;
    tabs.forEach(tab => tab.classList.remove("active"));
    tabLinks.forEach(btn => btn.classList.remove("active"));
    document.getElementById(target).classList.add("active");
    link.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// ---- Typewriter (fixed off-by-one + proper hold) ----
const roles = ["Security Engineer", "Software Developer", "Victor Hernandez"];
const el = document.getElementById("typewriter");

const TYPE_MS = 90;     // typing speed
const DELETE_MS = 55;   // deleting speed
const HOLD_MS = 1800;   // how long to hold the full text (1.8s)
const BETWEEN_MS = 400; // pause before typing the next word

let i = 0;              // which word
let char = 0;           // how many chars currently shown
let phase = "typing";   // typing | holding | deleting

function fullTextFor(index){
  const w = roles[index];
  const prefix = index === roles.length - 1 ? "I'm " : "I'm a ";
  return prefix + w;
}

function render(){
  const full = fullTextFor(i);
  el.textContent = full.slice(0, char);
}

function step(){
  const full = fullTextFor(i);

  if (phase === "typing") {
    if (char < full.length) {
      char += 1;
      render();
      setTimeout(step, TYPE_MS);
    } else {
      // ensure the COMPLETE string is visible before holding
      render();
      phase = "holding";
      setTimeout(step, HOLD_MS);
    }
  } else if (phase === "holding") {
    phase = "deleting";
    setTimeout(step, DELETE_MS);
  } else if (phase === "deleting") {
    if (char > 0) {
      char -= 1;
      render();
      setTimeout(step, DELETE_MS);
    } else {
      i = (i + 1) % roles.length;
      phase = "typing";
      setTimeout(step, BETWEEN_MS);
    }
  }
}

render();
step();
