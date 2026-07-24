/* ============================================================
   CodePath — Contenu pédagogique
   Tout le contenu réel de l'application (modules, exercices,
   astuces, erreurs, projets, prompts). Aucun placeholder.
   ============================================================ */

const APP_NAME = "CodePath";

/* ---------- PARCOURS / MODULES (11 étapes pratiques) ---------- */
const MODULES = [
  {
    id: "m0",
    step: 0,
    icon: "rocket",
    title: "Préparer ton atelier",
    subtitle: "Installer les outils en 10 min",
    minutes: 10,
    goal: "Avoir un endroit pour écrire du code et voir le résultat.",
    intro: "Coder, c'est juste écrire du texte dans un fichier, puis l'ouvrir dans un navigateur. Rien de magique.",
    concept: { term: "Éditeur de code", plain: "Un bloc-notes amélioré qui colore ton code pour t'aider à voir tes erreurs." },
    action: "Télécharge VS Code, ouvre-le, et crée un fichier appelé index.html.",
    exercise: "Crée un dossier « mon-site » sur ton bureau. Dedans, crée un fichier vide nommé index.html.",
    expected: "Un dossier avec un fichier index.html prêt à recevoir du code.",
    example: `<!-- Ceci est un fichier HTML vide.\n     On va le remplir à l'étape suivante. -->`,
    lang: "html",
    tip: "Tu n'as même pas besoin de VS Code pour commencer : l'Atelier de cette app te laisse coder tout de suite."
  },
  {
    id: "m1",
    step: 1,
    icon: "file",
    title: "Ta première page web",
    subtitle: "Comprendre le HTML en 1 exercice",
    minutes: 12,
    goal: "Afficher du texte dans un navigateur avec du HTML.",
    intro: "Le HTML, c'est le squelette d'une page : les titres, les paragraphes, les images. On met le contenu entre des balises.",
    concept: { term: "Balise", plain: "Un mot entre chevrons, comme <h1>, qui dit au navigateur « ceci est un titre »." },
    action: "Écris un titre et un paragraphe, puis ouvre le fichier dans ton navigateur.",
    exercise: "Crée une page avec ton prénom en grand titre et une phrase qui te décrit.",
    expected: "Une page blanche avec un grand titre et une phrase en dessous.",
    example: `<h1>Salut, moi c'est Alex</h1>\n<p>J'apprends à coder, un pas à la fois.</p>`,
    lang: "html",
    tip: "Une balise s'ouvre <h1> et se ferme </h1>. Le / veut dire « on ferme »."
  },
  {
    id: "m2",
    step: 2,
    icon: "type",
    title: "Modifier le contenu",
    subtitle: "Titres, textes, liens, images",
    minutes: 15,
    goal: "Utiliser les balises les plus utiles du HTML.",
    intro: "Il y a peu de balises à connaître pour aller loin. Voici les indispensables.",
    concept: { term: "Attribut", plain: "Une info en plus dans une balise, comme l'adresse d'un lien : href=\"...\"." },
    action: "Ajoute un lien cliquable et une image à ta page.",
    exercise: "Ajoute un titre de niveau 2, une liste de 3 choses que tu aimes, et un lien vers un site.",
    expected: "Un sous-titre, une liste à puces et un lien bleu cliquable.",
    example: `<h2>Ce que j'aime</h2>\n<ul>\n  <li>La musique</li>\n  <li>Le sport</li>\n  <li>Coder</li>\n</ul>\n<a href="https://developer.mozilla.org">Un site utile</a>`,
    lang: "html",
    tip: "<ul> = liste à puces, <li> = un élément de la liste. Chaque <li> est une ligne."
  },
  {
    id: "m3",
    step: 3,
    icon: "palette",
    title: "Ajouter du style avec CSS",
    subtitle: "Couleurs, polices, espaces",
    minutes: 18,
    goal: "Changer l'apparence de ta page.",
    intro: "Le CSS habille le HTML : couleurs, tailles, espacements. On cible un élément, puis on lui donne un style.",
    concept: { term: "CSS", plain: "Les règles de style. On dit « cet élément → cette couleur, cette taille »." },
    action: "Ajoute une balise <style> et change la couleur du fond et du titre.",
    exercise: "Mets un fond sombre, un titre violet et centre le texte.",
    expected: "Une page sombre avec un titre coloré et centré.",
    example: `<style>\n  body {\n    background: #0f0f1a;\n    color: white;\n    text-align: center;\n    font-family: sans-serif;\n  }\n  h1 { color: #a855f7; }\n</style>`,
    lang: "html",
    tip: "Une règle CSS = un sélecteur { propriété: valeur; }. Le ; sépare chaque règle."
  },
  {
    id: "m4",
    step: 4,
    icon: "square",
    title: "Créer une carte produit",
    subtitle: "Ton premier vrai composant",
    minutes: 20,
    goal: "Assembler HTML + CSS pour créer un bloc réutilisable.",
    intro: "Une « carte » est un bloc avec une bordure, un peu d'ombre et du contenu. C'est partout sur le web.",
    concept: { term: "div", plain: "Une boîte invisible qui sert à regrouper des éléments pour les styler ensemble." },
    action: "Crée une carte avec un titre, un texte et un prix.",
    exercise: "Fais une carte produit : nom, description courte, prix et bouton « Acheter ».",
    expected: "Un rectangle arrondi avec une petite ombre contenant les infos du produit.",
    example: `<div class="carte">\n  <h3>Casque Aura</h3>\n  <p>Son immersif, léger, autonomie 30h.</p>\n  <strong>129 €</strong>\n  <button>Acheter</button>\n</div>\n<style>\n  .carte {\n    background: #1a1a2e; padding: 20px;\n    border-radius: 16px; width: 220px;\n    color: white; font-family: sans-serif;\n  }\n  button {\n    background: #a855f7; color: white;\n    border: none; padding: 10px 16px;\n    border-radius: 10px; margin-top: 10px;\n  }\n</style>`,
    lang: "html",
    tip: "class=\"carte\" dans le HTML se cible avec .carte dans le CSS (avec un point)."
  },
  {
    id: "m5",
    step: 5,
    icon: "layout",
    title: "Créer une section hero",
    subtitle: "La grande bannière d'accueil",
    minutes: 20,
    goal: "Créer la première chose qu'on voit sur un site.",
    intro: "Le « hero », c'est la grande zone en haut d'un site : un titre fort, une phrase, un bouton.",
    concept: { term: "Hero", plain: "La bannière d'accueil qui donne envie de rester, avec un message principal." },
    action: "Crée une bannière plein écran avec un titre accrocheur et un bouton.",
    exercise: "Fais un hero pour un site fictif : titre percutant, sous-titre, bouton d'action.",
    expected: "Une grande zone centrée avec titre, phrase et bouton bien visibles.",
    example: `<section class="hero">\n  <h1>Crée ton premier site aujourd'hui</h1>\n  <p>Simple, rapide, sans prise de tête.</p>\n  <button>Commencer</button>\n</section>\n<style>\n  .hero {\n    min-height: 60vh; display: flex;\n    flex-direction: column; justify-content: center;\n    align-items: center; text-align: center;\n    background: radial-gradient(circle at top, #2a1a4a, #0f0f1a);\n    color: white; gap: 16px; font-family: sans-serif;\n  }\n</style>`,
    lang: "html",
    tip: "display: flex + justify-content + align-items = la façon la plus simple de centrer."
  },
  {
    id: "m6",
    step: 6,
    icon: "file-stack",
    title: "Assembler une page complète",
    subtitle: "Header, contenu, footer",
    minutes: 25,
    goal: "Structurer une page comme un vrai site.",
    intro: "Un site = un en-tête (menu), un corps (contenu) et un pied de page. On empile les sections.",
    concept: { term: "Structure", plain: "L'ordre logique des sections d'une page : haut, milieu, bas." },
    action: "Assemble un menu, un hero, une grille de cartes et un footer.",
    exercise: "Crée une page complète pour une marque fictive avec ces 4 zones.",
    expected: "Une page qui ressemble à un vrai site, du menu jusqu'au pied de page.",
    example: `<header>\n  <strong>MaMarque</strong>\n  <nav><a href="#">Accueil</a> · <a href="#">Contact</a></nav>\n</header>\n<main>\n  <h1>Bienvenue</h1>\n  <p>Voici mon premier vrai site.</p>\n</main>\n<footer>© 2026 MaMarque</footer>`,
    lang: "html",
    tip: "<header>, <main>, <footer> aident le navigateur (et toi) à comprendre la page."
  },
  {
    id: "m7",
    step: 7,
    icon: "smartphone",
    title: "Rendre la page responsive",
    subtitle: "Belle sur mobile aussi",
    minutes: 22,
    goal: "Adapter la page aux petits écrans.",
    intro: "Responsive = la page s'adapte à la taille de l'écran. On utilise des unités souples et des « media queries ».",
    concept: { term: "Media query", plain: "Une règle qui dit « si l'écran est petit, applique ce style »." },
    action: "Fais passer une grille de 3 colonnes à 1 colonne sur mobile.",
    exercise: "Crée une grille de cartes qui devient une seule colonne sous 600px.",
    expected: "Sur grand écran : plusieurs colonnes. Sur mobile : une seule colonne empilée.",
    example: `.grille {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n@media (max-width: 600px) {\n  .grille { grid-template-columns: 1fr; }\n}`,
    lang: "css",
    tip: "1fr = « une part égale de l'espace ». repeat(3, 1fr) = 3 colonnes égales."
  },
  {
    id: "m8",
    step: 8,
    icon: "zap",
    title: "Ajouter de l'interactivité (JS)",
    subtitle: "Faire réagir la page",
    minutes: 25,
    goal: "Faire quelque chose quand on clique.",
    intro: "Le JavaScript rend la page vivante : au clic, on change un texte, on affiche/cache, on compte…",
    concept: { term: "Événement", plain: "Une action de l'utilisateur (clic, saisie) à laquelle ton code réagit." },
    action: "Ajoute un bouton qui change le texte quand on clique.",
    exercise: "Crée un compteur : un bouton « +1 » qui augmente un nombre affiché.",
    expected: "Un nombre qui augmente à chaque clic sur le bouton.",
    example: `<p>Score : <span id="score">0</span></p>\n<button onclick="ajoute()">+1</button>\n<script>\n  let score = 0;\n  function ajoute() {\n    score = score + 1;\n    document.getElementById('score').textContent = score;\n  }\n</script>`,
    lang: "html",
    tip: "getElementById('score') va chercher l'élément qui a id=\"score\" pour le modifier."
  },
  {
    id: "m9",
    step: 9,
    icon: "package",
    title: "Ton mini-projet complet",
    subtitle: "Tout mettre ensemble",
    minutes: 40,
    goal: "Construire un petit site fini de A à Z.",
    intro: "Tu as toutes les briques. On les assemble en un projet simple mais complet.",
    concept: { term: "Projet", plain: "Un ensemble de fichiers qui forment un site utilisable." },
    action: "Choisis une idée simple et construis-la avec HTML + CSS + un peu de JS.",
    exercise: "Crée une page « Ma carte de visite » : photo/initiales, nom, métier, boutons de contact interactifs.",
    expected: "Une page personnelle propre, responsive, avec au moins une interaction JS.",
    example: `<!-- Structure conseillée -->\n<header> ... logo/nom ... </header>\n<main>\n  <section class="hero"> ... </section>\n  <section class="infos"> ... cartes ... </section>\n</main>\n<footer> ... </footer>\n<style> ... </style>\n<script> ... </script>`,
    lang: "html",
    tip: "Ne vise pas la perfection. Vise « fini ». Un projet fini vaut mieux qu'un parfait jamais terminé."
  },
  {
    id: "m10",
    step: 10,
    icon: "globe",
    title: "Publier et partager",
    subtitle: "Mettre ton site en ligne",
    minutes: 20,
    goal: "Avoir un lien à partager.",
    intro: "Un site en local n'est visible que par toi. Pour le partager, on le met en ligne gratuitement.",
    concept: { term: "Hébergement", plain: "Un service qui garde tes fichiers en ligne et donne un lien public." },
    action: "Dépose ton dossier sur Netlify Drop pour obtenir un lien instantané.",
    exercise: "Publie ton mini-projet et envoie le lien à un proche.",
    expected: "Un lien du type ton-site.netlify.app qui ouvre ton site depuis n'importe où.",
    example: `1. Va sur app.netlify.com/drop\n2. Glisse ton dossier « mon-site » dans la zone\n3. Attends 10 secondes → ton lien apparaît\n4. Partage-le !`,
    lang: "text",
    tip: "Netlify Drop est gratuit et ne demande même pas de créer un compte pour tester."
  }
];

/* ---------- 20+ MINI-EXERCICES (Atelier) ---------- */
const EXERCISES = [
  { id: "e1", moduleId: "m1", level: "Facile", title: "Ton titre à toi", brief: "Remplace le texte du titre par ton prénom et écris une phrase qui te décrit.", starter: { html: "<h1>Change-moi</h1>\n<p>Écris ta phrase ici.</p>", css: "body{font-family:sans-serif;padding:24px;}", js: "" } },
  { id: "e2", moduleId: "m1", level: "Facile", title: "Trois paragraphes", brief: "Ajoute trois paragraphes <p> qui racontent ta journée idéale.", starter: { html: "<h1>Ma journée idéale</h1>\n<p>Le matin, ...</p>", css: "body{font-family:sans-serif;padding:24px;line-height:1.6;}", js: "" } },
  { id: "e3", moduleId: "m2", level: "Facile", title: "Une liste de courses", brief: "Crée une liste à puces <ul> avec 5 articles de courses.", starter: { html: "<h2>Courses</h2>\n<ul>\n  <li>Pain</li>\n</ul>", css: "body{font-family:sans-serif;padding:24px;}", js: "" } },
  { id: "e4", moduleId: "m2", level: "Facile", title: "Un lien cliquable", brief: "Ajoute un lien <a> vers ton site préféré. Fais-le s'ouvrir dans un nouvel onglet avec target=\"_blank\".", starter: { html: '<p>Mon site préféré : <a href="https://exemple.com">clique ici</a></p>', css: "body{font-family:sans-serif;padding:24px;}", js: "" } },
  { id: "e5", moduleId: "m3", level: "Moyen", title: "Mode sombre", brief: "Donne à la page un fond très sombre, un texte clair et un titre violet.", starter: { html: "<h1>Thème sombre</h1>\n<p>Change mes couleurs avec le CSS.</p>", css: "body{\n  \n}", js: "" } },
  { id: "e6", moduleId: "m3", level: "Moyen", title: "Un bouton stylé", brief: "Style un bouton : fond violet, coins arrondis, pas de bordure, curseur main au survol.", starter: { html: "<button>Mon bouton</button>", css: "button{\n  \n}\nbody{padding:40px;background:#0f0f1a;}", js: "" } },
  { id: "e7", moduleId: "m4", level: "Moyen", title: "Carte produit", brief: "Crée une carte avec un nom de produit, une description, un prix et un bouton.", starter: { html: '<div class="carte">\n  <h3>Produit</h3>\n</div>', css: ".carte{\n  \n}\nbody{background:#0f0f1a;padding:40px;font-family:sans-serif;}", js: "" } },
  { id: "e8", moduleId: "m4", level: "Moyen", title: "Deux cartes côte à côte", brief: "Mets deux cartes l'une à côté de l'autre avec display:flex sur leur conteneur.", starter: { html: '<div class="grille">\n  <div class="carte">A</div>\n  <div class="carte">B</div>\n</div>', css: ".grille{}\n.carte{background:#1a1a2e;color:#fff;padding:20px;border-radius:14px;}\nbody{background:#0f0f1a;padding:40px;}", js: "" } },
  { id: "e9", moduleId: "m5", level: "Moyen", title: "Section hero", brief: "Crée un hero centré avec un grand titre, une phrase et un bouton.", starter: { html: '<section class="hero">\n  <h1>Titre fort</h1>\n</section>', css: ".hero{\n  \n}\nbody{margin:0;font-family:sans-serif;color:#fff;}", js: "" } },
  { id: "e10", moduleId: "m5", level: "Moyen", title: "Un dégradé de fond", brief: "Applique un dégradé violet → bleu foncé en fond du hero.", starter: { html: '<section class="hero"><h1>Dégradé</h1></section>', css: ".hero{min-height:60vh;display:grid;place-items:center;color:#fff;}\nbody{margin:0;font-family:sans-serif;}", js: "" } },
  { id: "e11", moduleId: "m6", level: "Moyen", title: "Menu de navigation", brief: "Crée un header avec un logo à gauche et 3 liens de menu à droite (flex + space-between).", starter: { html: '<header>\n  <strong>Logo</strong>\n  <nav>...</nav>\n</header>', css: "header{}\nbody{margin:0;font-family:sans-serif;background:#0f0f1a;color:#fff;}", js: "" } },
  { id: "e12", moduleId: "m6", level: "Difficile", title: "Page en 3 sections", brief: "Assemble header + main (hero) + footer sur une seule page.", starter: { html: "<header>Menu</header>\n<main>Contenu</main>\n<footer>Pied</footer>", css: "body{margin:0;font-family:sans-serif;}\nheader,footer{padding:20px;background:#1a1a2e;color:#fff;}", js: "" } },
  { id: "e13", moduleId: "m7", level: "Difficile", title: "Grille responsive", brief: "Grille de 3 cartes qui passe à 1 colonne sous 600px avec une media query.", starter: { html: '<div class="grille">\n  <div class="c">1</div>\n  <div class="c">2</div>\n  <div class="c">3</div>\n</div>', css: ".grille{display:grid;gap:14px;}\n.c{background:#a855f7;color:#fff;padding:30px;border-radius:12px;text-align:center;}", js: "" } },
  { id: "e14", moduleId: "m7", level: "Difficile", title: "Texte qui s'adapte", brief: "Utilise clamp() pour que le titre grandisse doucement avec l'écran.", starter: { html: "<h1>Je m'adapte</h1>", css: "h1{ font-size: 32px; }\nbody{padding:40px;font-family:sans-serif;}", js: "" } },
  { id: "e15", moduleId: "m8", level: "Moyen", title: "Compteur de clics", brief: "Un bouton +1 qui augmente un nombre affiché à l'écran.", starter: { html: '<p>Score : <span id="s">0</span></p>\n<button onclick="plus()">+1</button>', css: "body{font-family:sans-serif;padding:40px;text-align:center;}", js: "let n = 0;\nfunction plus(){\n  \n}" } },
  { id: "e16", moduleId: "m8", level: "Moyen", title: "Afficher / cacher", brief: "Un bouton qui montre ou cache un paragraphe secret.", starter: { html: '<button onclick="toggle()">Voir le secret</button>\n<p id="secret">🎉 Bravo !</p>', css: "#secret{display:none;}\nbody{font-family:sans-serif;padding:40px;}", js: "function toggle(){\n  \n}" } },
  { id: "e17", moduleId: "m8", level: "Difficile", title: "Changer le thème", brief: "Un bouton qui bascule entre fond clair et fond sombre (classList.toggle).", starter: { html: '<button onclick="theme()">Basculer</button>\n<h1>Salut</h1>', css: "body{font-family:sans-serif;padding:40px;transition:.3s;}\nbody.dark{background:#0f0f1a;color:#fff;}", js: "function theme(){\n  \n}" } },
  { id: "e18", moduleId: "m8", level: "Difficile", title: "Dire bonjour par ton prénom", brief: "Un champ texte + un bouton qui affiche « Bonjour [prénom] ».", starter: { html: '<input id="nom" placeholder="Ton prénom">\n<button onclick="salue()">Ok</button>\n<p id="out"></p>', css: "body{font-family:sans-serif;padding:40px;}input,button{padding:8px;}", js: "function salue(){\n  \n}" } },
  { id: "e19", moduleId: "m9", level: "Difficile", title: "Carte de visite", brief: "Assemble une carte de visite : initiales, nom, métier, et un bouton « Contacter » qui affiche ton email.", starter: { html: '<div class="card">\n  <div class="avatar">AX</div>\n  <h2>Alex</h2>\n</div>', css: ".card{max-width:280px;margin:40px auto;background:#1a1a2e;color:#fff;padding:24px;border-radius:18px;text-align:center;font-family:sans-serif;}\n.avatar{width:64px;height:64px;border-radius:50%;background:#a855f7;display:grid;place-items:center;margin:0 auto 12px;font-size:22px;}", js: "" } },
  { id: "e20", moduleId: "m9", level: "Difficile", title: "Mini todo-list", brief: "Un champ + un bouton qui ajoute la tâche saisie dans une liste.", starter: { html: '<input id="t" placeholder="Une tâche">\n<button onclick="add()">Ajouter</button>\n<ul id="liste"></ul>', css: "body{font-family:sans-serif;padding:40px;max-width:420px;}input,button{padding:8px;}li{margin:6px 0;}", js: "function add(){\n  \n}" } },
  { id: "e21", moduleId: "m3", level: "Facile", title: "Espace qui respire", brief: "Ajoute du padding et une largeur max pour que le texte respire et soit lisible.", starter: { html: "<article>\n  <h1>Un article</h1>\n  <p>Beaucoup de texte serré n'est pas agréable à lire. Aère-le.</p>\n</article>", css: "article{\n  \n}\nbody{font-family:sans-serif;}", js: "" } },
  { id: "e22", moduleId: "m4", level: "Moyen", title: "Effet au survol", brief: "Fais réagir une carte au survol : elle monte légèrement et son ombre grandit (:hover + transition).", starter: { html: '<div class="carte">Survole-moi</div>', css: ".carte{width:200px;padding:30px;background:#1a1a2e;color:#fff;border-radius:14px;transition:.25s;}\nbody{background:#0f0f1a;padding:40px;font-family:sans-serif;}", js: "" } }
];

/* ---------- 10 ASTUCES CONCRÈTES ---------- */
const TIPS = [
  { icon: "eye", title: "Ouvre la console", text: "Appuie sur F12 dans le navigateur : les erreurs de ton code s'affichent là, en rouge. C'est ton meilleur ami." },
  { icon: "copy", title: "Copie, puis modifie", text: "Personne ne code de mémoire. Copie un exemple qui marche, puis change une chose à la fois." },
  { icon: "save", title: "Recharge après chaque save", text: "Enregistre ton fichier (Ctrl+S), puis recharge le navigateur (Ctrl+R) pour voir tes changements." },
  { icon: "search", title: "Cherche l'erreur mot pour mot", text: "Colle le message d'erreur en rouge dans Google. 99% du temps, quelqu'un a eu le même souci." },
  { icon: "minus", title: "Une chose à la fois", text: "Si ça casse, annule ton dernier changement. Tu sauras exactement ce qui posait problème." },
  { icon: "indent", title: "Indente ton code", text: "Décale ton code vers la droite quand il est « à l'intérieur » d'autre chose. Ça se lit 10x mieux." },
  { icon: "palette", title: "Vole les bonnes couleurs", text: "Pas d'inspiration ? Prends une palette toute faite sur coolors.co au lieu de deviner." },
  { icon: "ruler", title: "Utilise rem, pas des px partout", text: "Pour les tailles de texte, 1rem = taille de base. Ça reste lisible même si l'utilisateur zoome." },
  { icon: "git-branch", title: "Garde des versions", text: "Avant un gros changement, duplique ton fichier en index-v2.html. Zéro stress si tu casses tout." },
  { icon: "coffee", title: "Fais des pauses", text: "Bloqué depuis 20 min ? Lève-toi 5 min. La solution vient souvent quand tu arrêtes de forcer." }
];

/* ---------- 8 ERREURS FRÉQUENTES ---------- */
const MISTAKES = [
  { title: "Ma page est toute blanche", cause: "Le fichier n'est pas ouvert dans un navigateur, ou il est vide.", fix: "Fais un clic droit sur index.html → Ouvrir avec → ton navigateur. Vérifie que tu as bien enregistré." },
  { title: "Mon CSS ne s'applique pas", cause: "Le style est mal relié, ou le sélecteur ne cible pas le bon élément.", fix: "Vérifie que .maclasse (avec le point) correspond bien à class=\"maclasse\" dans le HTML." },
  { title: "J'ai oublié de fermer une balise", cause: "Une balise ouverte <div> sans son </div> casse la mise en page.", fix: "Chaque balise ouvrante a une fermante. Compte-les. VS Code colore la paire quand tu cliques dessus." },
  { title: "Mon bouton ne fait rien", cause: "La fonction JS n'existe pas ou son nom ne correspond pas au onclick.", fix: "Vérifie que onclick=\"plus()\" appelle bien une function plus() écrite dans <script>." },
  { title: "« undefined » s'affiche", cause: "Tu utilises une variable avant de lui donner une valeur.", fix: "Déclare et remplis ta variable (let x = 0;) avant de l'afficher." },
  { title: "Mon image ne s'affiche pas", cause: "Le chemin vers l'image est faux ou le fichier n'est pas là.", fix: "Vérifie le nom exact (majuscules comprises) et que l'image est dans le bon dossier." },
  { title: "Tout est collé, aucun espace", cause: "Pas de padding ni de margin définis.", fix: "Ajoute du padding (espace intérieur) et de la margin (espace extérieur) sur tes blocs." },
  { title: "Sur mobile c'est cassé", cause: "Il manque la balise viewport ou des largeurs fixes en px.", fix: "Ajoute <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> et remplace les largeurs fixes par des %/max-width." }
];

/* ---------- 5 IDÉES DE PREMIERS PROJETS ---------- */
const PROJECT_IDEAS = [
  { icon: "id-card", title: "Carte de visite en ligne", desc: "Une page perso : ton nom, ce que tu fais, tes liens. Parfait premier projet.", tags: ["HTML", "CSS"], time: "1-2h" },
  { icon: "utensils", title: "Menu de restaurant", desc: "Une page avec des plats en cartes, prix, et une belle section d'en-tête.", tags: ["HTML", "CSS", "Responsive"], time: "2-3h" },
  { icon: "list-todo", title: "Liste de tâches", desc: "Ajouter, cocher et supprimer des tâches. Ton premier vrai projet interactif.", tags: ["HTML", "CSS", "JS"], time: "2-4h" },
  { icon: "image", title: "Portfolio de photos", desc: "Une galerie en grille responsive pour montrer des images ou des projets.", tags: ["CSS Grid", "Responsive"], time: "2-3h" },
  { icon: "cloud-sun", title: "Page météo (simulée)", desc: "Une carte météo avec ville, température et icône. Le JS change l'affichage.", tags: ["HTML", "CSS", "JS"], time: "3-4h" }
];

/* ---------- 5 PROMPTS PRÊTS POUR CLAUDE CODE ---------- */
const PROMPTS = [
  { title: "Page perso / carte de visite", text: "Crée un site web local d'une seule page (index.html, style.css) : une carte de visite personnelle. Thème sombre, accent violet, glassmorphism léger. Sections : hero avec mon nom et mon métier, une courte bio, 3 boutons de contact (email, LinkedIn, GitHub). Responsive mobile. Code vanilla commenté simplement pour un débutant." },
  { title: "Landing page produit", text: "Crée une landing page locale (HTML/CSS vanilla) pour un produit fictif. Sections : header avec menu, hero avec titre + bouton, 3 cartes de fonctionnalités, une section témoignages, un footer. Design moderne, coins arrondis, ombres douces. Entièrement responsive. Ajoute des commentaires pour que je comprenne chaque partie." },
  { title: "To-do list interactive", text: "Crée une application to-do list locale en HTML/CSS/JavaScript vanilla (un seul dossier). On peut ajouter une tâche, la cocher, la supprimer. Sauvegarde dans localStorage. Design épuré, mode sombre, accent violet. Explique le JavaScript en commentaires simples pour un débutant complet." },
  { title: "Portfolio en grille", text: "Crée un portfolio local (HTML/CSS vanilla) avec une grille responsive de 6 projets (cartes avec image, titre, description). Header simple, section « à propos », footer avec liens. CSS Grid, effet au survol des cartes, thème sombre élégant. Commente le code pour un débutant." },
  { title: "Menu de restaurant", text: "Crée un site local d'une page pour un restaurant fictif (HTML/CSS vanilla). Hero avec le nom du resto, une section menu en cartes (entrées, plats, desserts avec prix), horaires, et un bouton « Réserver ». Ambiance chaleureuse mais moderne, responsive. Ajoute des commentaires pédagogiques." }
];

/* ---------- PARCOURS 7 JOURS ---------- */
const SEVEN_DAYS = [
  { day: 1, title: "Installe et affiche", focus: "Prépare ton atelier et affiche ta première page.", modules: ["m0", "m1"], reward: "Ta première page web s'ouvre dans le navigateur." },
  { day: 2, title: "Remplis ta page", focus: "Titres, textes, listes, liens, images.", modules: ["m2"], reward: "Une page riche en contenu." },
  { day: 3, title: "Habille avec le CSS", focus: "Couleurs, polices, espaces, mode sombre.", modules: ["m3"], reward: "Ta page a enfin du style." },
  { day: 4, title: "Cartes et hero", focus: "Crée tes premiers composants réutilisables.", modules: ["m4", "m5"], reward: "Une carte produit et une bannière d'accueil." },
  { day: 5, title: "Une vraie page", focus: "Assemble header, contenu et footer.", modules: ["m6"], reward: "Une page qui ressemble à un vrai site." },
  { day: 6, title: "Mobile + interactivité", focus: "Responsive et premières interactions JS.", modules: ["m7", "m8"], reward: "Un site adaptatif et vivant." },
  { day: 7, title: "Projet + publication", focus: "Construis ton mini-projet et mets-le en ligne.", modules: ["m9", "m10"], reward: "Un vrai site en ligne, avec un lien à partager 🎉" }
];

/* ---------- OUTILS ---------- */
const TOOLS = [
  { icon: "code", name: "VS Code", what: "L'éditeur de code gratuit le plus utilisé.", when: "Dès que tu quittes cette app pour coder pour de vrai.", action: "Télécharge-le sur code.visualstudio.com", url: "https://code.visualstudio.com" },
  { icon: "globe", name: "Chrome / Firefox", what: "Ton navigateur, mais aussi ton outil de debug (touche F12).", when: "Pour voir ton site et repérer les erreurs.", action: "Ouvre tes fichiers .html dedans", url: "https://www.google.com/chrome" },
  { icon: "puzzle", name: "Live Server (extension)", what: "Recharge ta page automatiquement à chaque sauvegarde.", when: "Dès que tu codes dans VS Code, pour aller plus vite.", action: "Installe-la dans l'onglet Extensions de VS Code", url: "https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" },
  { icon: "book-open", name: "MDN Web Docs", what: "La référence officielle pour HTML, CSS et JS.", when: "Quand tu veux comprendre une balise ou une propriété.", action: "Cherche « MDN + ta question »", url: "https://developer.mozilla.org/fr" },
  { icon: "palette", name: "Coolors", what: "Générateur de palettes de couleurs.", when: "Quand tu n'as pas d'idée de couleurs.", action: "Appuie sur Espace pour générer une palette", url: "https://coolors.co" },
  { icon: "image", name: "unDraw / Unsplash", what: "Illustrations et photos gratuites et libres.", when: "Pour habiller ton site sans dessiner toi-même.", action: "Télécharge une image et mets-la dans ton dossier", url: "https://undraw.co" },
  { icon: "smartphone", name: "Mode responsive (F12)", what: "Simule un téléphone dans ton navigateur.", when: "Pour vérifier que ton site est beau sur mobile.", action: "F12 → icône téléphone en haut à gauche", url: "https://developer.chrome.com/docs/devtools/device-mode" },
  { icon: "upload-cloud", name: "Netlify Drop", what: "Met ton site en ligne en glissant un dossier.", when: "Quand ton projet est prêt à être partagé.", action: "Glisse ton dossier sur app.netlify.com/drop", url: "https://app.netlify.com/drop" }
];

/* ---------- GLOSSAIRE (orienté action) ---------- */
const GLOSSARY = [
  { term: "HTML", def: "Le contenu et la structure de la page. Réponds : « quoi afficher ? »" },
  { term: "CSS", def: "L'apparence. Réponds : « à quoi ça ressemble ? »" },
  { term: "JavaScript", def: "Le comportement. Réponds : « que se passe-t-il quand on clique ? »" },
  { term: "Balise", def: "Un mot entre chevrons qui délimite un morceau de contenu, comme <p>…</p>." },
  { term: "Classe", def: "Une étiquette (class=\"...\") pour styler plusieurs éléments pareil depuis le CSS." },
  { term: "Sélecteur", def: "Ce qui, dans le CSS, désigne les éléments à styler (ex : .carte, h1)." },
  { term: "Flexbox", def: "Une façon simple d'aligner des éléments en ligne ou en colonne." },
  { term: "Grid", def: "Une façon d'organiser des éléments en grille (lignes + colonnes)." },
  { term: "Responsive", def: "Un site qui s'adapte à toutes les tailles d'écran." },
  { term: "Variable", def: "Une boîte qui garde une valeur pour la réutiliser (let score = 0)." },
  { term: "Fonction", def: "Un bloc de code réutilisable qu'on déclenche quand on veut." },
  { term: "localStorage", def: "Une mémoire du navigateur pour garder des infos même après fermeture." }
];

/* ---------- FAQ ---------- */
const FAQ = [
  { q: "Je pars vraiment de zéro, c'est possible ?", a: "Oui. Tu n'as besoin de rien savoir. Commence par l'étape 0 et suis les actions une par une." },
  { q: "Faut-il être bon en maths ?", a: "Non. Créer des sites web, c'est surtout de la logique simple et de la mise en page. Pas de maths." },
  { q: "Combien de temps pour créer un vrai site ?", a: "Avec le parcours 7 jours, tu peux avoir un premier site en ligne en une semaine à petit rythme." },
  { q: "Dois-je installer quelque chose maintenant ?", a: "Non. Tu peux tout tester dans l'Atelier de cette app. Installe VS Code seulement quand tu te sens prêt." },
  { q: "J'ai peur d'oublier ce que j'apprends", a: "Normal. On n'apprend pas en mémorisant mais en refaisant. Reviens sur les exercices, ça rentre tout seul." },
  { q: "C'est quoi la différence entre HTML, CSS et JS ?", a: "HTML = le contenu, CSS = le style, JS = les réactions. Une maison : les murs, la peinture, l'électricité." },
  { q: "Je suis bloqué, que faire ?", a: "Clique sur « J'ai besoin d'aide » dans l'étape, lis les erreurs fréquentes, ou colle ton message d'erreur dans Google." }
];

/* ---------- OPTIONS D'ONBOARDING ---------- */
const ONBOARDING = [
  { key: "level", question: "Quel est ton niveau actuel ?", options: [
    { value: "zero", label: "Grand débutant", desc: "Je n'ai jamais codé" },
    { value: "little", label: "Un peu curieux", desc: "J'ai déjà bidouillé un peu" },
    { value: "some", label: "Quelques bases", desc: "Je connais 2-3 balises" }
  ]},
  { key: "project", question: "Quel projet veux-tu créer en premier ?", options: [
    { value: "card", label: "Une page perso", desc: "Ma carte de visite en ligne" },
    { value: "landing", label: "Une landing page", desc: "Présenter un produit / une idée" },
    { value: "todo", label: "Une app simple", desc: "Une to-do list interactive" },
    { value: "free", label: "Je ne sais pas encore", desc: "Aide-moi à choisir" }
  ]},
  { key: "time", question: "Combien de temps par jour ?", options: [
    { value: "15", label: "15 min", desc: "Petit rythme régulier" },
    { value: "30", label: "30 min", desc: "Rythme équilibré" },
    { value: "60", label: "1h ou +", desc: "Je veux avancer vite" }
  ]},
  { key: "style", question: "Ton style d'apprentissage ?", options: [
    { value: "guided", label: "Très guidé", desc: "Dis-moi exactement quoi faire" },
    { value: "challenge", label: "Challenge", desc: "Donne-moi des défis" },
    { value: "free", label: "Projet libre", desc: "Je préfère construire mon idée" }
  ]},
  { key: "editor", question: "As-tu déjà un éditeur comme VS Code ?", options: [
    { value: "yes", label: "Oui", desc: "Il est installé" },
    { value: "no", label: "Pas encore", desc: "On le fera ensemble" }
  ]},
  { key: "start", question: "Par où veux-tu commencer ?", options: [
    { value: "basics", label: "Les bases HTML/CSS/JS", desc: "Solide, étape par étape" },
    { value: "project", label: "Un projet complet direct", desc: "J'apprends en construisant" }
  ]}
];
