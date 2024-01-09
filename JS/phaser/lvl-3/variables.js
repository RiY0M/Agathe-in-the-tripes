let agathe;                 // agathe personnage
let cursors;                // détection clavier
let lastFrame = 8;          // last frame facing afk
let hole;                   // halo lumineux
let holeRadius = 200;       // rayon du halo

let blood1;
let blood0;

let map;                    // tilemap
let tileset;                // tileset
let sol;                    // sol
let wall;

let platforms;
let music;                  //Theme (musique de fond) 

let start3sCoolDown = false;    // lancement de l'invincibilité
let invicibility = 150;         // temps d'immortalité

const idCurrentLvl = 3;      // Id du niveau courant
const idNextLvl = 4;         // Id du prochain niveau
let startTime = new Date().getTime(); // Starting time for the chronometer

let hasMoved = false;       // booleen verif si affi ou non tuto                  
let size_poison = 3000;
let Vitesse_de_poison = 0.001;
let augmentation_poison = 0.0002;