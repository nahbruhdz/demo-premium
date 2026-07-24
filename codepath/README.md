# CodePath 🟣

**Apprends à coder par la pratique — de zéro jusqu'à ton premier vrai site en ligne.**

CodePath est une petite application web locale, premium, qui t'apprend à créer des sites
web **en faisant**, pas en lisant des cours. Style sombre, accent violet néon, effet
« liquid glass ». Tout est en français, pensé pour un grand débutant.

---

## 🚀 Comment la lancer (le plus simple)

1. Télécharge / copie le dossier **`codepath`** sur ton **Bureau**.
2. Double-clique sur le fichier **`index.html`**.
3. C'est tout — l'application s'ouvre dans ton navigateur. ✨

> Rien à installer. Pas de compte. Tes progrès sont sauvegardés automatiquement
> dans ton navigateur (localStorage).

### (Optionnel) La lancer avec un petit serveur local

Certaines choses sont parfois plus fluides via un mini serveur. Si tu as Python :

```bash
cd codepath
python3 -m http.server 8000
```

Puis ouvre **http://localhost:8000** dans ton navigateur.

Ou, dans VS Code, installe l'extension **Live Server**, fais un clic droit sur
`index.html` → **Open with Live Server**.

---

## 🧭 Ce que tu trouveras dedans

| Zone | À quoi ça sert |
|------|----------------|
| **Tableau de bord** | Ta progression, ta série, ta prochaine action, ton objectif du jour. |
| **Parcours** | 11 étapes pratiques (étape 0 → publication) + un plan « 7 jours ». |
| **Atelier** | Un vrai mini-éditeur HTML/CSS/JS avec **aperçu en direct**. 22 défis. |
| **Générateur** | Réponds à 4 questions → un plan de projet + un prompt prêt pour Claude Code. |
| **Outils** | Les outils gratuits d'un dev, expliqués simplement. |
| **Aide** | Erreurs fréquentes, astuces, idées de projets, glossaire, FAQ. |

---

## 🎯 Comment l'utiliser au quotidien

1. Réponds à l'**onboarding** au premier lancement (6 questions rapides).
2. Sur le tableau de bord, clique sur **« Continuer »** : tu tombes sur ta prochaine étape.
3. Lis l'objectif, regarde l'exemple, puis clique **« Essayer dans l'Atelier »**.
4. Code, vois le résultat en direct, puis valide **« J'ai réussi »**.
5. Reviens chaque jour pour garder ta **série** 🔥 et atteindre ton **objectif du jour**.

---

## 📁 Structure du dossier

```
codepath/
├── index.html        → le point d'entrée (à double-cliquer)
├── css/
│   └── styles.css    → tout le design (thème sombre, glass, violet)
├── js/
│   ├── data.js       → le contenu pédagogique (modules, exercices, astuces…)
│   └── app.js        → la logique (navigation, éditeur, sauvegarde)
└── README.md         → ce fichier
```

---

## 🔒 Tes données

Tout reste **sur ta machine**, dans le navigateur. Rien n'est envoyé sur internet.
Tu peux tout effacer à tout moment avec le bouton **« Réinitialiser »** en bas du menu.

---

## 💡 Astuce

Tu n'as **pas besoin** d'installer VS Code pour commencer : l'**Atelier** de
CodePath te laisse écrire du vrai code et voir le résultat tout de suite.
Installe les outils « pour de vrai » seulement quand tu te sens prêt (voir l'onglet **Outils**).

Bon code ! 🟣
