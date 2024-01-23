let agathe;                 // agathe personnage
let cursors;                // détection clavier
let lastFrame = 8;          // last frame facing afk
let music;                  //Theme (musique de fond)

const idCurrentLvl = 4;      // Id du niveau courant
const idNextLvl = 5;        // Id du prochain niveau
let startTime = new Date().getTime(); // Starting time for the chronometer

let start3sCoolDown = false;    // lancement de l'invincibilité
let invicibility = 150;         // temps d'immortalité
//-------------------------

let ground;