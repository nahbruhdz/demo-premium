/* ============================================================
   CodePath — Logique de l'application (vanilla JS)
   Routing, état, localStorage, rendu, mini-éditeur live.
   ============================================================ */

/* ---------- État & persistance ---------- */
const STORE_KEY = "codepath_state_v1";

const defaultState = {
  onboarded: false,
  answers: {},               // réponses onboarding
  completedModules: [],      // ids de modules terminés
  completedExercises: [],    // ids d'exercices terminés
  lastModule: "m0",
  lastExercise: "e1",
  dailyGoalDone: false,
  dailyGoalDate: null,
  streak: 0,
  lastActiveDate: null
};

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return { ...defaultState };
    return { ...defaultState, ...JSON.parse(raw) };
  } catch (e) {
    return { ...defaultState };
  }
}

function save() {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

/* Met à jour la série (streak) à chaque activité */
function touchStreak() {
  const today = todayStr();
  if (state.lastActiveDate === today) return;
  const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  if (state.lastActiveDate === yesterday) state.streak += 1;
  else state.streak = 1;
  state.lastActiveDate = today;
  // reset daily goal on new day
  if (state.dailyGoalDate !== today) {
    state.dailyGoalDone = false;
    state.dailyGoalDate = today;
  }
  save();
}

/* ---------- Helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function moduleById(id) { return MODULES.find(m => m.id === id); }
function progressPercent() {
  return Math.round((state.completedModules.length / MODULES.length) * 100);
}
function levelLabel() {
  const p = progressPercent();
  if (p >= 100) return "Créateur de sites 🏆";
  if (p >= 80) return "Confirmé";
  if (p >= 50) return "Autonome";
  if (p >= 25) return "En route";
  if (p > 0) return "Débutant motivé";
  return "Premier pas";
}
function nextModule() {
  return MODULES.find(m => !state.completedModules.includes(m.id)) || MODULES[MODULES.length - 1];
}

/* ---------- Icônes SVG (lucide-like, propres) ---------- */
const ICONS = {
  rocket: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0 M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5',
  file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6',
  type: 'M4 7V4h16v3 M9 20h6 M12 4v16',
  palette: 'M12 22a10 10 0 1 1 0-20 10 10 0 0 1 10 10 4 4 0 0 1-4 4h-2a2 2 0 0 0-2 2 2 2 0 0 1-2 2z M7.5 10.5h.01 M12 7.5h.01 M16.5 10.5h.01',
  square: 'M3 3h18v18H3z',
  layout: 'M3 3h18v18H3z M3 9h18 M9 21V9',
  'file-stack': 'M16 2v5a2 2 0 0 0 2 2h5 M6 22H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2 M20 22H10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h6l6 6v10a2 2 0 0 1-2 2z',
  smartphone: 'M5 2h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M12 18h.01',
  zap: 'M13 2 3 14h9l-1 8 10-12h-9z',
  package: 'M16.5 9.4 7.5 4.21 M21 8v8a2 2 0 0 1-1 1.73l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 16V8a2 2 0 0 1 1-1.73l7-4a2 2 0 0 1 2 0l7 4A2 2 0 0 1 21 8z M3.27 6.96 12 12.01l8.73-5.05 M12 22.08V12',
  globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
  home: 'M3 9.5 12 3l9 6.5 M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10',
  map: 'M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z M9 4v14 M15 6v14',
  code: 'm16 18 6-6-6-6 M8 6l-6 6 6 6',
  wrench: 'M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6 2.7 2.7 6-6a4 4 0 0 0 5.4-5.4l-2.3 2.3-2.7-2.7z',
  'life-buoy': 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4.9 4.9l4.2 4.2 M14.9 14.9l4.2 4.2 M14.9 9.1l4.2-4.2 M4.9 19.1l4.2-4.2',
  sparkles: 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z M19 3v4 M21 5h-4 M5 17v2 M6 18H4',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  copy: 'M9 9h11a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1z M5 15H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1',
  save: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z M17 21v-8H7v8 M7 3v5h8',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.3-4.3',
  minus: 'M5 12h14',
  indent: 'M3 8l4 4-4 4 M11 12h10 M11 6h10 M11 18h10',
  ruler: 'M3 3h6v18H3z M9 7h3 M9 11h3 M9 15h3 M3 3l18 18',
  'git-branch': 'M6 3v12 M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M15 6a9 9 0 0 1-9 9',
  coffee: 'M17 8h1a4 4 0 1 1 0 8h-1 M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z M6 2v2 M10 2v2 M14 2v2',
  puzzle: 'M19.4 14a2 2 0 0 0-1.4.6l-.6.6a1.5 1.5 0 0 1-2.5-1.5V13a2 2 0 0 0-2-2H10a1.5 1.5 0 0 1-1.5-2.5l.6-.6A2 2 0 0 0 6 5H4a2 2 0 0 0-2 2v2a1.5 1.5 0 0 0 2.5 1.1',
  'book-open': 'M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z',
  image: 'M3 3h18v18H3z M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M21 15l-5-5L5 21',
  'upload-cloud': 'M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2 M12 12v9 M8 16l4-4 4 4',
  'id-card': 'M3 5h18v14H3z M8 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M5 17c.5-2 2-3 3-3s2.5 1 3 3 M14 9h5 M14 13h5',
  utensils: 'M3 2v7a3 3 0 0 0 6 0V2 M6 2v20 M18 2c-2 0-3 2-3 5s1 4 3 4v11',
  'list-todo': 'M3 5h2l1 1 2-2 M13 6h8 M3 12h2l1 1 2-2 M13 13h8 M3 19h2l1 1 2-2 M13 20h8',
  'cloud-sun': 'M12 2v2 M5.6 5.6l1.4 1.4 M2 12h2 M18.4 5.6 17 7 M12 6a5 5 0 0 1 4.6 3 M4 17a4 4 0 1 1 1-7.9 M6 17h11a3 3 0 0 0 0-6 4 4 0 0 0-7.6 0',
  check: 'M20 6 9 17l-5-5',
  flame: 'M12 22c4 0 7-3 7-7 0-3-2-5-3-7-1 1-2 2-3 2 0-3-1-5-3-7-1 3-5 5-5 10a7 7 0 0 0 7 9z',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2',
  target: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  play: 'M6 3l14 9-14 9z',
  plus: 'M12 5v14 M5 12h14',
  'refresh': 'M3 12a9 9 0 0 1 15-6.7L21 8 M21 3v5h-5 M21 12a9 9 0 0 1-15 6.7L3 16 M3 21v-5h5',
  'chevron-right': 'm9 6 6 6-6 6',
  x: 'M18 6 6 18 M6 6l12 12',
  award: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M8.2 13.9 7 22l5-3 5 3-1.2-8.1',
  lightbulb: 'M9 18h6 M10 22h4 M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z'
};
function icon(name, size = 20) {
  const d = ICONS[name] || ICONS.sparkles;
  const paths = d.split(/(?=M)/).filter(Boolean).map(p => `<path d="${p.trim()}"/>`).join("");
  return `<svg class="ic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg, kind = "ok") {
  let t = $("#toast");
  if (!t) { t = el("div", "toast"); t.id = "toast"; document.body.appendChild(t); }
  t.innerHTML = `${icon(kind === "ok" ? "check" : "sparkles", 18)}<span>${msg}</span>`;
  t.className = "toast show " + kind;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

/* ---------- Confetti léger (canvas-free) ---------- */
function celebrate() {
  const wrap = el("div", "confetti");
  const colors = ["#a855f7", "#c084fc", "#818cf8", "#f0abfc", "#67e8f9", "#ffffff"];
  for (let i = 0; i < 40; i++) {
    const p = el("i");
    p.style.left = Math.random() * 100 + "%";
    p.style.background = colors[i % colors.length];
    p.style.animationDelay = (Math.random() * 0.3) + "s";
    p.style.transform = `translateY(-10px) rotate(${Math.random() * 360}deg)`;
    wrap.appendChild(p);
  }
  document.body.appendChild(wrap);
  setTimeout(() => wrap.remove(), 2200);
}

/* ============================================================
   ROUTER
   ============================================================ */
const ROUTES = {
  dashboard: renderDashboard,
  parcours: renderParcours,
  atelier: renderAtelier,
  generateur: renderGenerateur,
  outils: renderOutils,
  aide: renderAide
};

function navigate(route, param) {
  location.hash = param ? `#${route}/${param}` : `#${route}`;
}

function handleRoute() {
  const raw = location.hash.replace(/^#/, "") || "dashboard";
  const [route, param] = raw.split("/");
  const fn = ROUTES[route] || renderDashboard;
  touchStreak();
  $$(".nav-item").forEach(n => n.classList.toggle("active", n.dataset.route === route));
  const main = $("#view");
  main.classList.remove("view-in");
  void main.offsetWidth;
  main.innerHTML = "";
  fn(main, param);
  main.classList.add("view-in");
  main.scrollTop = 0;
  window.scrollTo(0, 0);
  closeSidebar();
}
window.addEventListener("hashchange", handleRoute);

/* ============================================================
   VUE : DASHBOARD
   ============================================================ */
function renderDashboard(root) {
  const next = nextModule();
  const pct = progressPercent();
  const daily = state.dailyGoalDone;
  const name = state.answers.projectLabel || "";

  root.appendChild(sectionHeader(
    `Salut 👋`,
    `Voici ta prochaine action. Un pas à la fois, c'est comme ça qu'on avance.`
  ));

  // Hero focus card
  const hero = el("div", "card focus-card glass");
  hero.innerHTML = `
    <div class="focus-left">
      <span class="pill">${icon("target", 15)} Prochaine action</span>
      <h2>${esc(next.title)}</h2>
      <p class="muted">${esc(next.goal)}</p>
      <div class="focus-meta">
        <span>${icon("clock", 15)} ~${next.minutes} min</span>
        <span>${icon("map", 15)} Étape ${next.step} / 10</span>
      </div>
      <div class="focus-actions">
        <button class="btn btn-primary" id="continueBtn">${icon("play", 18)} Continuer</button>
        <button class="btn btn-ghost" id="createSiteBtn">${icon("sparkles", 18)} Créer mon premier site</button>
      </div>
    </div>
    <div class="focus-right">
      <div class="ring" style="--p:${pct}">
        <div class="ring-inner">
          <strong>${pct}%</strong>
          <span>terminé</span>
        </div>
      </div>
    </div>`;
  root.appendChild(hero);
  $("#continueBtn").onclick = () => navigate("parcours", next.id);
  $("#createSiteBtn").onclick = () => navigate("generateur");

  // Stats row
  const stats = el("div", "stat-grid");
  stats.appendChild(statCard("flame", state.streak, state.streak > 1 ? "jours de suite" : "jour actif", "streak"));
  stats.appendChild(statCard("award", levelLabel(), "ton niveau", "level"));
  stats.appendChild(statCard("check", `${state.completedModules.length}/${MODULES.length}`, "étapes finies", "mods"));
  stats.appendChild(statCard("zap", state.completedExercises.length, "exercices réussis", "ex"));
  root.appendChild(stats);

  // Daily goal
  const goal = el("div", "card daily glass");
  goal.innerHTML = `
    <div class="daily-icon ${daily ? "done" : ""}">${icon(daily ? "check" : "target", 22)}</div>
    <div class="daily-body">
      <strong>Objectif du jour</strong>
      <p class="muted">${daily ? "Fait ! Reviens demain pour garder ta série 🔥" : `Termine 1 action (${state.answers.time ? state.answers.time + " min" : "quelques minutes"} suffisent).`}</p>
    </div>
    <button class="btn ${daily ? "btn-ghost" : "btn-primary"}" id="goalBtn" ${daily ? "disabled" : ""}>${daily ? "Terminé" : "Marquer fait"}</button>`;
  root.appendChild(goal);
  if (!daily) $("#goalBtn").onclick = () => {
    state.dailyGoalDone = true; state.dailyGoalDate = todayStr(); save();
    toast("Objectif du jour atteint !"); celebrate(); handleRoute();
  };

  // Modules grid
  root.appendChild(el("h3", "block-title", `${icon("map", 18)} Ton parcours`));
  const grid = el("div", "module-grid");
  MODULES.forEach(m => grid.appendChild(moduleCard(m)));
  root.appendChild(grid);
}

function statCard(ic, value, label, kind) {
  const c = el("div", "card stat glass stat-" + kind);
  c.innerHTML = `<div class="stat-ic">${icon(ic, 20)}</div>
    <div><strong>${value}</strong><span class="muted">${label}</span></div>`;
  return c;
}

function moduleCard(m) {
  const done = state.completedModules.includes(m.id);
  const isNext = nextModule().id === m.id;
  const c = el("button", "card module-card glass" + (done ? " done" : "") + (isNext ? " next" : ""));
  c.innerHTML = `
    <div class="mc-top">
      <div class="mc-icon">${icon(m.icon, 22)}</div>
      <span class="mc-step">Étape ${m.step}</span>
      ${done ? `<span class="mc-badge">${icon("check", 14)}</span>` : (isNext ? `<span class="mc-badge next">${icon("play", 13)}</span>` : "")}
    </div>
    <h4>${esc(m.title)}</h4>
    <p class="muted">${esc(m.subtitle)}</p>
    <div class="mc-foot"><span>${icon("clock", 14)} ${m.minutes} min</span></div>`;
  c.onclick = () => navigate("parcours", m.id);
  return c;
}

/* ============================================================
   VUE : PARCOURS
   ============================================================ */
function renderParcours(root, param) {
  if (param && moduleById(param)) return renderModuleDetail(root, moduleById(param));

  root.appendChild(sectionHeader("Ton parcours", "De zéro jusqu'à ton premier site en ligne. Suis les étapes dans l'ordre."));

  // 7-day path
  const seven = el("div", "card glass seven");
  seven.innerHTML = `<div class="seven-head"><span class="pill">${icon("sparkles", 15)} Parcours conseillé</span><h3>7 jours pour créer mon premier site</h3></div>`;
  const days = el("div", "seven-grid");
  SEVEN_DAYS.forEach(d => {
    const allDone = d.modules.every(id => state.completedModules.includes(id));
    const dd = el("div", "day" + (allDone ? " done" : ""));
    dd.innerHTML = `<div class="day-n">${allDone ? icon("check", 16) : "J" + d.day}</div>
      <div><strong>${esc(d.title)}</strong><p class="muted">${esc(d.focus)}</p><span class="reward">${icon("award", 13)} ${esc(d.reward)}</span></div>`;
    dd.onclick = () => navigate("parcours", d.modules[0]);
    days.appendChild(dd);
  });
  seven.appendChild(days);
  root.appendChild(seven);

  // Timeline of modules
  root.appendChild(el("h3", "block-title", `${icon("map", 18)} Toutes les étapes`));
  const line = el("div", "timeline");
  MODULES.forEach(m => {
    const done = state.completedModules.includes(m.id);
    const isNext = nextModule().id === m.id;
    const node = el("button", "tl-item glass" + (done ? " done" : "") + (isNext ? " next" : ""));
    node.innerHTML = `
      <div class="tl-dot">${done ? icon("check", 16) : icon(m.icon, 18)}</div>
      <div class="tl-body">
        <div class="tl-head"><strong>${esc(m.title)}</strong><span class="tl-time">${m.minutes} min</span></div>
        <p class="muted">${esc(m.goal)}</p>
      </div>
      <span class="tl-go">${icon("chevron-right", 18)}</span>`;
    node.onclick = () => navigate("parcours", m.id);
    line.appendChild(node);
  });
  root.appendChild(line);
}

function renderModuleDetail(root, m) {
  const done = state.completedModules.includes(m.id);
  const idx = MODULES.indexOf(m);
  const prev = MODULES[idx - 1], nxt = MODULES[idx + 1];

  const back = el("button", "btn btn-ghost btn-back", `${icon("chevron-right", 16)} Retour au parcours`);
  back.querySelector("svg").style.transform = "rotate(180deg)";
  back.onclick = () => navigate("parcours");
  root.appendChild(back);

  const head = el("div", "card glass module-detail-head");
  head.innerHTML = `
    <div class="mdh-icon">${icon(m.icon, 26)}</div>
    <div>
      <span class="pill">Étape ${m.step} / 10 · ~${m.minutes} min</span>
      <h2>${esc(m.title)}</h2>
      <p class="muted">${esc(m.intro)}</p>
    </div>
    ${done ? `<span class="done-flag">${icon("check", 15)} Terminé</span>` : ""}`;
  root.appendChild(head);

  // Concept + goal
  const grid = el("div", "detail-grid");
  grid.appendChild(infoBlock("target", "Objectif", esc(m.goal)));
  grid.appendChild(infoBlock("lightbulb", `Le mot : « ${esc(m.concept.term)} »`, esc(m.concept.plain)));
  grid.appendChild(infoBlock("play", "L'action", esc(m.action)));
  grid.appendChild(infoBlock("check", "Résultat attendu", esc(m.expected)));
  root.appendChild(grid);

  // Exercise
  const exo = el("div", "card glass exo");
  exo.innerHTML = `<div class="exo-head">${icon("zap", 18)}<strong>Mini-exercice</strong></div><p>${esc(m.exercise)}</p>`;
  root.appendChild(exo);

  // Code example
  root.appendChild(codeBlock(m.example, m.lang, "Exemple de code"));

  // Tip
  const tip = el("div", "card glass tip-inline");
  tip.innerHTML = `${icon("lightbulb", 18)}<p><strong>Astuce :</strong> ${esc(m.tip)}</p>`;
  root.appendChild(tip);

  // Action buttons
  const actions = el("div", "detail-actions");
  const successBtn = el("button", "btn btn-primary", `${icon("check", 18)} ${done ? "Refaire l'étape" : "J'ai réussi"}`);
  successBtn.onclick = () => {
    if (!done) {
      state.completedModules.push(m.id);
      state.lastModule = m.id;
      state.completedExercises = [...new Set([...state.completedExercises])];
      save();
      celebrate();
      toast(nxt ? "Bravo ! Étape suivante débloquée." : "Incroyable, tu as fini le parcours ! 🏆");
    } else {
      state.completedModules = state.completedModules.filter(id => id !== m.id);
      save();
      toast("Étape remise à faire.");
    }
    handleRoute();
  };
  const helpBtn = el("button", "btn btn-ghost", `${icon("life-buoy", 18)} J'ai besoin d'aide`);
  helpBtn.onclick = () => openHelp(m);
  const tryBtn = el("button", "btn btn-ghost", `${icon("code", 18)} Essayer dans l'Atelier`);
  const relatedEx = EXERCISES.find(e => e.moduleId === m.id);
  tryBtn.onclick = () => navigate("atelier", relatedEx ? relatedEx.id : "");
  actions.append(successBtn, helpBtn, tryBtn);
  root.appendChild(actions);

  // Prev / next nav
  const nav = el("div", "step-nav");
  if (prev) { const b = el("button", "btn btn-ghost", `${icon("chevron-right", 16)} ${esc(prev.title)}`); b.querySelector("svg").style.transform = "rotate(180deg)"; b.onclick = () => navigate("parcours", prev.id); nav.appendChild(b); } else nav.appendChild(el("span"));
  if (nxt) { const b = el("button", "btn btn-primary", `${esc(nxt.title)} ${icon("chevron-right", 16)}`); b.onclick = () => navigate("parcours", nxt.id); nav.appendChild(b); }
  root.appendChild(nav);
}

function infoBlock(ic, title, body) {
  const b = el("div", "card glass info-block");
  b.innerHTML = `<div class="ib-ic">${icon(ic, 18)}</div><div><strong>${title}</strong><p class="muted">${body}</p></div>`;
  return b;
}

/* ---------- Bloc de code copiable ---------- */
function codeBlock(code, lang, label) {
  const b = el("div", "card glass code-block");
  b.innerHTML = `
    <div class="code-head"><span>${icon("code", 15)} ${label || (lang || "code")}</span>
      <button class="copy-btn">${icon("copy", 15)} Copier</button></div>
    <pre><code>${esc(code)}</code></pre>`;
  b.querySelector(".copy-btn").onclick = (e) => {
    navigator.clipboard.writeText(code).then(() => toast("Code copié !"));
    e.currentTarget.innerHTML = `${icon("check", 15)} Copié`;
    setTimeout(() => { const btn = b.querySelector(".copy-btn"); if (btn) btn.innerHTML = `${icon("copy", 15)} Copier`; }, 1800);
  };
  return b;
}

/* ============================================================
   VUE : ATELIER (mini-éditeur live)
   ============================================================ */
let editorState = { html: "", css: "", js: "", tab: "html", current: null };

function renderAtelier(root, param) {
  root.appendChild(sectionHeader("Atelier", "Code ici, vois le résultat en direct. Aucune installation. C'est ton bac à sable."));

  const layout = el("div", "atelier");

  // Left : exercise list
  const side = el("div", "atelier-side card glass");
  side.innerHTML = `<div class="side-head">${icon("list-todo", 16)} <strong>Défis (${EXERCISES.length})</strong></div>`;
  const list = el("div", "ex-list");
  EXERCISES.forEach(e => {
    const done = state.completedExercises.includes(e.id);
    const item = el("button", "ex-item" + (done ? " done" : ""));
    item.dataset.id = e.id;
    item.innerHTML = `<span class="ex-dot">${done ? icon("check", 13) : ""}</span>
      <span class="ex-txt"><strong>${esc(e.title)}</strong><small>${e.level}</small></span>`;
    item.onclick = () => loadExercise(e.id);
    list.appendChild(item);
  });
  side.appendChild(list);
  layout.appendChild(side);

  // Right : editor + preview
  const main = el("div", "atelier-main");
  main.innerHTML = `
    <div class="card glass brief-card" id="briefCard"></div>
    <div class="editor card glass">
      <div class="ed-tabs">
        <button class="ed-tab active" data-tab="html">HTML</button>
        <button class="ed-tab" data-tab="css">CSS</button>
        <button class="ed-tab" data-tab="js">JS</button>
        <div class="ed-actions">
          <button class="btn btn-ghost btn-sm" id="resetCode">${icon("refresh", 15)} Reset</button>
          <button class="btn btn-primary btn-sm" id="runCode">${icon("play", 15)} Lancer</button>
        </div>
      </div>
      <textarea id="codeArea" spellcheck="false"></textarea>
    </div>
    <div class="preview card glass">
      <div class="prev-head">${icon("eye", 15)} Aperçu en direct
        <div class="prev-tools">
          <button class="prev-size active" data-w="100%">${icon("globe", 14)}</button>
          <button class="prev-size" data-w="390px">${icon("smartphone", 14)}</button>
          <button class="btn btn-ghost btn-sm" id="markDone">${icon("check", 14)} Défi réussi</button>
        </div>
      </div>
      <div class="prev-frame-wrap"><iframe id="preview" title="Aperçu"></iframe></div>
    </div>`;
  layout.appendChild(main);
  root.appendChild(layout);

  // wire tabs
  $$(".ed-tab", main).forEach(t => t.onclick = () => switchTab(t.dataset.tab));
  $("#codeArea").addEventListener("input", (e) => {
    editorState[editorState.tab] = e.target.value;
    debouncedRun();
  });
  $("#runCode").onclick = runPreview;
  $("#resetCode").onclick = () => { if (editorState.current) loadExercise(editorState.current.id, true); };
  $("#markDone").onclick = markExerciseDone;
  $$(".prev-size", main).forEach(b => b.onclick = () => {
    $$(".prev-size", main).forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    $("#preview").style.width = b.dataset.w;
    $("#preview").style.margin = b.dataset.w === "100%" ? "0" : "0 auto";
  });

  const startId = param || state.lastExercise || EXERCISES[0].id;
  loadExercise(EXERCISES.find(e => e.id === startId) ? startId : EXERCISES[0].id);
}

function loadExercise(id, reset) {
  const e = EXERCISES.find(x => x.id === id);
  if (!e) return;
  editorState.current = e;
  editorState.html = e.starter.html || "";
  editorState.css = e.starter.css || "";
  editorState.js = e.starter.js || "";
  editorState.tab = "html";
  state.lastExercise = id; save();

  $$(".ex-item").forEach(n => n.classList.toggle("active", n.dataset.id === id));
  const m = moduleById(e.moduleId);
  $("#briefCard").innerHTML = `
    <div class="brief-top"><span class="pill">${e.level}${m ? " · " + esc(m.title) : ""}</span>
      <strong>${esc(e.title)}</strong></div>
    <p>${esc(e.brief)}</p>`;
  switchTab("html");
  runPreview();
  if (!reset) {
    const side = $(".atelier-main");
    if (side && window.innerWidth < 900) side.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function switchTab(tab) {
  editorState.tab = tab;
  $$(".ed-tab").forEach(t => t.classList.toggle("active", t.dataset.tab === tab));
  const area = $("#codeArea");
  if (area) {
    area.value = editorState[tab];
    area.placeholder = tab === "js" ? "// Ton JavaScript ici…" : (tab === "css" ? "/* Ton CSS ici… */" : "<!-- Ton HTML ici… -->");
  }
}

let runTimer;
function debouncedRun() { clearTimeout(runTimer); runTimer = setTimeout(runPreview, 350); }

function runPreview() {
  const frame = $("#preview");
  if (!frame) return;
  const doc = `<!doctype html><html><head><meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <style>${editorState.css}</style></head>
    <body>${editorState.html}
    <script>try{${editorState.js}}catch(err){document.body.insertAdjacentHTML('beforeend','<pre style=\\'color:#f87171;font:12px monospace;padding:8px\\'>'+err+'</pre>')}<\/script>
    </body></html>`;
  frame.srcdoc = doc;
}

function markExerciseDone() {
  const e = editorState.current;
  if (!e) return;
  if (!state.completedExercises.includes(e.id)) {
    state.completedExercises.push(e.id);
    save();
    celebrate();
    toast("Défi réussi ! Bien joué 💪");
  } else {
    toast("Déjà validé — continue sur le suivant !");
  }
  $$(".ex-item").forEach(n => {
    if (n.dataset.id === e.id) { n.classList.add("done"); n.querySelector(".ex-dot").innerHTML = icon("check", 13); }
  });
}

/* ============================================================
   VUE : GÉNÉRATEUR DE PROJET
   ============================================================ */
const genState = { type: "", audience: "", vibe: "", sections: [] };

function renderGenerateur(root) {
  root.appendChild(sectionHeader("Générateur de projet", "Réponds à 4 questions. Repars avec un plan clair et un prompt prêt à coller dans Claude Code."));

  const wrap = el("div", "gen-wrap");

  const form = el("div", "card glass gen-form");
  form.innerHTML = `
    <div class="gen-q">
      <label>1. Quel type de site ?</label>
      <div class="chip-row" data-group="type">
        ${["Carte de visite", "Landing page produit", "Portfolio", "Menu de restaurant", "Blog simple", "To-do list"].map(v => `<button class="chip" data-v="${v}">${v}</button>`).join("")}
      </div>
    </div>
    <div class="gen-q">
      <label>2. Pour qui ?</label>
      <input class="input" id="genAudience" placeholder="Ex : moi-même, un client, une association…">
    </div>
    <div class="gen-q">
      <label>3. Quelle ambiance visuelle ?</label>
      <div class="chip-row" data-group="vibe">
        ${["Sombre premium", "Clair minimaliste", "Coloré et fun", "Chaleureux", "Corporate sobre"].map(v => `<button class="chip" data-v="${v}">${v}</button>`).join("")}
      </div>
    </div>
    <div class="gen-q">
      <label>4. Quelles sections ? (plusieurs choix)</label>
      <div class="chip-row multi" data-group="sections">
        ${["Header / menu", "Hero", "À propos", "Galerie / grille", "Fonctionnalités", "Témoignages", "Tarifs", "Contact", "Footer"].map(v => `<button class="chip" data-v="${v}">${v}</button>`).join("")}
      </div>
    </div>
    <button class="btn btn-primary btn-block" id="genBtn">${icon("sparkles", 18)} Générer mon plan de projet</button>`;
  wrap.appendChild(form);

  const out = el("div", "gen-output");
  out.id = "genOutput";
  wrap.appendChild(out);
  root.appendChild(wrap);

  // wire chips
  $$(".chip-row", form).forEach(row => {
    const multi = row.classList.contains("multi");
    $$(".chip", row).forEach(chip => chip.onclick = () => {
      if (multi) {
        chip.classList.toggle("on");
        genState.sections = $$(".chip.on", row).map(c => c.dataset.v);
      } else {
        $$(".chip", row).forEach(c => c.classList.remove("on"));
        chip.classList.add("on");
        genState[row.dataset.group] = chip.dataset.v;
      }
    });
  });
  $("#genAudience").oninput = e => genState.audience = e.target.value;
  $("#genBtn").onclick = generatePlan;
}

function generatePlan() {
  genState.type = genState.type || "Landing page produit";
  genState.vibe = genState.vibe || "Sombre premium";
  const aud = genState.audience || "un public large";
  const sections = genState.sections.length ? genState.sections : ["Header / menu", "Hero", "Contact", "Footer"];

  const files = [
    { f: "index.html", d: "La page principale (structure + contenu)" },
    { f: "style.css", d: "Toutes les couleurs, tailles et mises en page" },
    ...(genState.type === "To-do list" || sections.includes("Fonctionnalités") ? [{ f: "script.js", d: "L'interactivité (clics, actions)" }] : []),
    { f: "assets/", d: "Dossier pour tes images et icônes" }
  ];

  const prompt = `Crée un site web local dans un seul dossier (HTML/CSS${genState.type === "To-do list" ? "/JavaScript" : ""} vanilla, sans framework) : un(e) ${genState.type.toLowerCase()} pour ${aud}. Ambiance visuelle : ${genState.vibe.toLowerCase()}. Sections à inclure, dans cet ordre : ${sections.join(", ")}. Le site doit être entièrement responsive (mobile, tablette, desktop), avec des animations sobres au survol, des coins arrondis et une bonne hiérarchie visuelle. Utilise du CSS moderne (flexbox/grid). Commente le code simplement pour un débutant complet. Donne-moi ensuite comment ouvrir le site en local.`;

  const out = $("#genOutput");
  out.innerHTML = "";
  out.appendChild(el("div", "gen-ready pill", `${icon("check", 15)} Ton plan est prêt`));

  // Cahier des charges
  const spec = el("div", "card glass");
  spec.innerHTML = `<h3>${icon("book-open", 18)} Mini cahier des charges</h3>
    <ul class="spec-list">
      <li><strong>Type :</strong> ${esc(genState.type)}</li>
      <li><strong>Pour :</strong> ${esc(aud)}</li>
      <li><strong>Ambiance :</strong> ${esc(genState.vibe)}</li>
      <li><strong>Sections :</strong> ${sections.map(esc).join(" · ")}</li>
    </ul>`;
  out.appendChild(spec);

  // Files
  const filesCard = el("div", "card glass");
  filesCard.innerHTML = `<h3>${icon("package", 18)} Structure des fichiers</h3>
    <div class="files">${files.map(x => `<div class="file-row"><code>${esc(x.f)}</code><span class="muted">${esc(x.d)}</span></div>`).join("")}</div>`;
  out.appendChild(filesCard);

  // Next steps
  const steps = el("div", "card glass");
  steps.innerHTML = `<h3>${icon("map", 18)} Prochaines étapes</h3>
    <ol class="steps-list">
      <li>Crée un dossier au nom de ton projet.</li>
      <li>Crée les fichiers listés ci-dessus.</li>
      <li>Commence par le <code>index.html</code> avec les sections dans l'ordre.</li>
      <li>Ajoute le style dans <code>style.css</code>, section par section.</li>
      <li>Teste sur mobile (F12 → mode téléphone).</li>
      <li>Publie sur Netlify Drop et partage ton lien.</li>
    </ol>`;
  out.appendChild(steps);

  // Prompt ready
  out.appendChild(codeBlock(prompt, "text", "Prompt prêt à coller dans Claude Code"));
  out.scrollIntoView({ behavior: "smooth", block: "start" });
  toast("Plan généré ✨");
}

/* ============================================================
   VUE : OUTILS
   ============================================================ */
function renderOutils(root) {
  root.appendChild(sectionHeader("Boîte à outils", "Les outils gratuits d'un développeur web. Chacun expliqué simplement : à quoi ça sert, et quoi faire."));
  const grid = el("div", "tool-grid");
  TOOLS.forEach(t => {
    const c = el("div", "card glass tool-card");
    c.innerHTML = `
      <div class="tool-ic">${icon(t.icon, 22)}</div>
      <h4>${esc(t.name)}</h4>
      <p class="muted">${esc(t.what)}</p>
      <div class="tool-meta">
        <div><span class="tag">Quand</span> ${esc(t.when)}</div>
        <div><span class="tag">À faire</span> ${esc(t.action)}</div>
      </div>
      <a class="btn btn-ghost btn-sm" href="${t.url}" target="_blank" rel="noopener">${icon("globe", 15)} Ouvrir</a>`;
    grid.appendChild(c);
  });
  root.appendChild(grid);
}

/* ============================================================
   VUE : AIDE
   ============================================================ */
function renderAide(root) {
  root.appendChild(sectionHeader("Aide", "Bloqué ? Respire. Tout le monde passe par là. Voici de quoi te débloquer vite."));

  // Quick help buttons
  const quick = el("div", "quick-help");
  const btns = [
    { ic: "lightbulb", t: "Explique-moi simplement", act: () => openSimpleHelp() },
    { ic: "code", t: "Montre-moi un exemple", act: () => navigate("atelier") },
    { ic: "zap", t: "Donne-moi un mini défi", act: () => randomChallenge() },
    { ic: "life-buoy", t: "Corrige mon erreur", act: () => scrollToId("mistakes") }
  ];
  btns.forEach(b => {
    const btn = el("button", "card glass quick-btn", `${icon(b.ic, 20)}<span>${b.t}</span>`);
    btn.onclick = b.act;
    quick.appendChild(btn);
  });
  root.appendChild(quick);

  // Common mistakes
  root.appendChild(el("h3", "block-title", `${icon("life-buoy", 18)} Erreurs fréquentes`));
  const mist = el("div", "acc-list"); mist.id = "mistakes";
  MISTAKES.forEach(m => mist.appendChild(accordion(m.title, `<p class="muted"><strong>Pourquoi :</strong> ${esc(m.cause)}</p><p class="fix"><strong>Solution :</strong> ${esc(m.fix)}</p>`)));
  root.appendChild(mist);

  // Tips
  root.appendChild(el("h3", "block-title", `${icon("lightbulb", 18)} Astuces concrètes`));
  const tips = el("div", "tips-grid");
  TIPS.forEach(t => {
    const c = el("div", "card glass tip-card");
    c.innerHTML = `<div class="tip-ic">${icon(t.icon, 18)}</div><div><strong>${esc(t.title)}</strong><p class="muted">${esc(t.text)}</p></div>`;
    tips.appendChild(c);
  });
  root.appendChild(tips);

  // Project ideas
  root.appendChild(el("h3", "block-title", `${icon("sparkles", 18)} Idées de premiers projets`));
  const ideas = el("div", "idea-grid");
  PROJECT_IDEAS.forEach(p => {
    const c = el("div", "card glass idea-card");
    c.innerHTML = `<div class="idea-ic">${icon(p.icon, 20)}</div><h4>${esc(p.title)}</h4><p class="muted">${esc(p.desc)}</p>
      <div class="idea-tags">${p.tags.map(t => `<span class="tag">${esc(t)}</span>`).join("")}<span class="idea-time">${icon("clock", 13)} ${p.time}</span></div>`;
    const b = el("button", "btn btn-ghost btn-sm btn-block", `${icon("sparkles", 14)} Générer ce projet`);
    b.onclick = () => navigate("generateur");
    c.appendChild(b);
    ideas.appendChild(c);
  });
  root.appendChild(ideas);

  // Prompts
  root.appendChild(el("h3", "block-title", `${icon("code", 18)} Prompts prêts pour Claude Code`));
  const pr = el("div", "prompt-list");
  PROMPTS.forEach(p => {
    const c = el("div", "card glass prompt-card");
    c.innerHTML = `<div class="prompt-head"><strong>${esc(p.title)}</strong><button class="copy-btn">${icon("copy", 14)} Copier</button></div><p class="muted">${esc(p.text)}</p>`;
    c.querySelector(".copy-btn").onclick = (e) => {
      navigator.clipboard.writeText(p.text).then(() => toast("Prompt copié !"));
      e.currentTarget.innerHTML = `${icon("check", 14)} Copié`;
      setTimeout(() => { const b = c.querySelector(".copy-btn"); if (b) b.innerHTML = `${icon("copy", 14)} Copier`; }, 1800);
    };
    pr.appendChild(c);
  });
  root.appendChild(pr);

  // Glossary
  root.appendChild(el("h3", "block-title", `${icon("book-open", 18)} Glossaire express`));
  const gl = el("div", "gloss-grid");
  GLOSSARY.forEach(g => {
    const c = el("div", "card glass gloss-card");
    c.innerHTML = `<strong>${esc(g.term)}</strong><p class="muted">${esc(g.def)}</p>`;
    gl.appendChild(c);
  });
  root.appendChild(gl);

  // FAQ
  root.appendChild(el("h3", "block-title", `${icon("life-buoy", 18)} FAQ débutant`));
  const faq = el("div", "acc-list");
  FAQ.forEach(f => faq.appendChild(accordion(f.q, `<p class="muted">${esc(f.a)}</p>`)));
  root.appendChild(faq);
}

function accordion(title, bodyHtml) {
  const a = el("div", "card glass acc");
  a.innerHTML = `<button class="acc-head"><span>${esc(title)}</span>${icon("chevron-right", 16)}</button><div class="acc-body">${bodyHtml}</div>`;
  a.querySelector(".acc-head").onclick = () => a.classList.toggle("open");
  return a;
}

function randomChallenge() {
  const e = EXERCISES[Math.floor(Math.random() * EXERCISES.length)];
  navigate("atelier", e.id);
  toast("Défi choisi : " + e.title);
}
function scrollToId(id) { const n = $("#" + id); if (n) n.scrollIntoView({ behavior: "smooth", block: "start" }); }
function openSimpleHelp() {
  openModal(`${icon("lightbulb", 20)} Le code, en 3 phrases`,
    `<div class="simple-help">
      <p><strong>1. HTML</strong> = ce que tu écris (les mots, les images). C'est le <em>contenu</em>.</p>
      <p><strong>2. CSS</strong> = comment ça s'habille (couleurs, tailles, espaces). C'est le <em>style</em>.</p>
      <p><strong>3. JavaScript</strong> = ce qui bouge quand on clique. C'est le <em>comportement</em>.</p>
      <p class="muted">C'est tout. Tout le reste, ce sont des variations de ces 3 idées. Commence par l'étape 0 et tu verras : ça vient tout seul.</p>
    </div>`,
    [{ label: "Commencer l'étape 0", primary: true, act: () => { closeModal(); navigate("parcours", "m0"); } }]);
}

/* ---------- Aide contextuelle d'un module ---------- */
function openHelp(m) {
  openModal(`${icon("life-buoy", 20)} Aide : ${esc(m.title)}`,
    `<div class="help-modal">
      <div class="help-sec"><strong>${icon("lightbulb", 15)} Explication simple</strong><p class="muted">${esc(m.concept.plain)}</p></div>
      <div class="help-sec"><strong>${icon("play", 15)} Que faire concrètement</strong><p class="muted">${esc(m.action)}</p></div>
      <div class="help-sec"><strong>${icon("check", 15)} Comment savoir que c'est réussi</strong><p class="muted">${esc(m.expected)}</p></div>
      <div class="help-sec tip"><strong>${icon("sparkles", 15)} Astuce</strong><p class="muted">${esc(m.tip)}</p></div>
    </div>`,
    [
      { label: "Essayer dans l'Atelier", primary: true, act: () => { closeModal(); const e = EXERCISES.find(x => x.moduleId === m.id); navigate("atelier", e ? e.id : ""); } },
      { label: "Fermer", act: closeModal }
    ]);
}

/* ============================================================
   MODAL générique
   ============================================================ */
function openModal(title, bodyHtml, actions = []) {
  closeModal();
  const overlay = el("div", "modal-overlay");
  overlay.id = "modal";
  const box = el("div", "modal card glass");
  box.innerHTML = `<div class="modal-head"><h3>${title}</h3><button class="modal-x">${icon("x", 18)}</button></div>
    <div class="modal-body">${bodyHtml}</div>`;
  const foot = el("div", "modal-foot");
  actions.forEach(a => {
    const b = el("button", "btn " + (a.primary ? "btn-primary" : "btn-ghost"), a.label);
    b.onclick = a.act;
    foot.appendChild(b);
  });
  if (actions.length) box.appendChild(foot);
  box.querySelector(".modal-x").onclick = closeModal;
  overlay.onclick = e => { if (e.target === overlay) closeModal(); };
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add("show"));
}
function closeModal() { const m = $("#modal"); if (m) { m.classList.remove("show"); setTimeout(() => m.remove(), 200); } }

/* ============================================================
   ONBOARDING
   ============================================================ */
function runOnboarding() {
  let step = 0;
  const answers = {};
  const overlay = el("div", "onboard-overlay");
  document.body.appendChild(overlay);

  function draw() {
    if (step >= ONBOARDING.length) return finish();
    const q = ONBOARDING[step];
    overlay.innerHTML = `
      <div class="onboard card glass">
        <div class="ob-brand">${logoMark(22)} <span>${APP_NAME}</span></div>
        <div class="ob-progress"><div class="ob-bar" style="width:${(step / ONBOARDING.length) * 100}%"></div></div>
        <span class="ob-step">Question ${step + 1} / ${ONBOARDING.length}</span>
        <h2>${esc(q.question)}</h2>
        <div class="ob-options"></div>
        ${step > 0 ? `<button class="ob-back">${icon("chevron-right", 15)} Précédent</button>` : ""}
      </div>`;
    const opts = $(".ob-options", overlay);
    q.options.forEach(o => {
      const b = el("button", "ob-opt");
      b.innerHTML = `<strong>${esc(o.label)}</strong><span>${esc(o.desc)}</span>`;
      b.onclick = () => {
        answers[q.key] = o.value;
        if (q.key === "project") answers.projectLabel = o.label;
        step++;
        b.classList.add("chosen");
        setTimeout(draw, 160);
      };
      opts.appendChild(b);
    });
    const back = $(".ob-back", overlay);
    if (back) { const bs = back.querySelector("svg"); if (bs) bs.style.transform = "rotate(180deg)"; back.onclick = () => { step = Math.max(0, step - 1); draw(); }; }
  }

  function finish() {
    overlay.innerHTML = `
      <div class="onboard card glass ob-final">
        ${logoMark(40)}
        <h2>Tout est prêt, on commence 🚀</h2>
        <p class="muted">Ton parcours est personnalisé. Objectif : ton premier vrai site.</p>
        <button class="btn btn-primary btn-lg" id="obGo">${icon("play", 18)} Entrer dans ${APP_NAME}</button>
      </div>`;
    celebrate();
    $("#obGo").onclick = () => {
      state.onboarded = true;
      state.answers = answers;
      if (answers.time) { /* used as daily goal hint */ }
      save();
      overlay.classList.add("out");
      setTimeout(() => { overlay.remove(); handleRoute(); }, 300);
    };
  }
  draw();
}

/* ============================================================
   UI COMMUNE (header, nav, logo)
   ============================================================ */
function logoMark(size = 24) {
  return `<span class="logo-mark" style="width:${size}px;height:${size}px">
    <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg></span>`;
}

function sectionHeader(title, sub) {
  const h = el("div", "view-header");
  h.innerHTML = `<h1>${title}</h1><p class="muted">${sub}</p>`;
  return h;
}

function openSidebar() { $("#sidebar").classList.add("open"); $("#scrim").classList.add("show"); }
function closeSidebar() { const s = $("#sidebar"); if (s) s.classList.remove("open"); const sc = $("#scrim"); if (sc) sc.classList.remove("show"); }

function buildShell() {
  const app = $("#app");
  app.innerHTML = `
    <aside class="sidebar" id="sidebar">
      <div class="brand">${logoMark(26)} <span>${APP_NAME}</span></div>
      <nav class="nav">
        ${navItem("dashboard", "home", "Tableau de bord")}
        ${navItem("parcours", "map", "Parcours")}
        ${navItem("atelier", "code", "Atelier")}
        ${navItem("generateur", "sparkles", "Générateur")}
        ${navItem("outils", "wrench", "Outils")}
        ${navItem("aide", "life-buoy", "Aide")}
      </nav>
      <div class="side-foot">
        <div class="side-progress">
          <div class="sp-top"><span>Progression</span><strong id="sideProg">${progressPercent()}%</strong></div>
          <div class="sp-bar"><div id="sideBar" style="width:${progressPercent()}%"></div></div>
        </div>
        <button class="btn btn-ghost btn-sm btn-block" id="resetBtn">${icon("refresh", 15)} Réinitialiser</button>
      </div>
    </aside>
    <div class="scrim" id="scrim"></div>
    <div class="content">
      <header class="topbar">
        <button class="menu-btn" id="menuBtn" aria-label="Menu">${icon("map", 20)}</button>
        <div class="brand mobile-brand">${logoMark(22)} <span>${APP_NAME}</span></div>
        <div class="top-right">
          <span class="streak-badge" title="Ta série">${icon("flame", 16)} ${state.streak}</span>
        </div>
      </header>
      <main class="view" id="view"></main>
    </div>`;

  $$(".nav-item").forEach(n => n.onclick = () => navigate(n.dataset.route));
  $("#menuBtn").onclick = openSidebar;
  $("#scrim").onclick = closeSidebar;
  $("#resetBtn").onclick = confirmReset;
}

function navItem(route, ic, label) {
  return `<button class="nav-item" data-route="${route}">${icon(ic, 20)}<span>${label}</span></button>`;
}

function refreshSideProgress() {
  const p = progressPercent();
  const a = $("#sideProg"), b = $("#sideBar");
  if (a) a.textContent = p + "%";
  if (b) b.style.width = p + "%";
  const sb = $(".streak-badge");
  if (sb) sb.innerHTML = `${icon("flame", 16)} ${state.streak}`;
}

function confirmReset() {
  openModal(`${icon("refresh", 20)} Réinitialiser ta progression ?`,
    `<p class="muted">Cela efface tes étapes terminées, tes défis réussis, ta série et tes réponses. Cette action est définitive.</p>`,
    [
      { label: "Tout réinitialiser", primary: false, act: () => {
        localStorage.removeItem(STORE_KEY);
        state = { ...defaultState };
        closeModal();
        toast("Progression réinitialisée.");
        location.hash = "#dashboard";
        runOnboarding();
      }},
      { label: "Annuler", act: closeModal }
    ]);
}

/* Refresh side progress after every route render */
const _origHandle = handleRoute;

/* ============================================================
   BOOT
   ============================================================ */
function boot() {
  buildShell();
  if (!location.hash) location.hash = "#dashboard";
  if (!state.onboarded) runOnboarding();
  handleRoute();
  // keep side progress in sync
  const obs = new MutationObserver(() => refreshSideProgress());
  obs.observe($("#view"), { childList: true });
}
document.addEventListener("DOMContentLoaded", boot);
