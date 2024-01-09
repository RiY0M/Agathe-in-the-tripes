let agathe;                 // agathe personnage
let cursors;                // détection clavier
let lastFrame = 8;          // last frame facing afk
let hole;                   // halo lumineux
let holeRadius = 200;       // rayon du halo

let blood1;
let blood0;

let squelettonHeart;        // coeur du squelette

let map;                    // tilemap
let tileset;                // tileset
let sol;                    // sol
let music;                  //Theme (musique de fond)
const idCurrentLvl = 4;      // Id du niveau courant
const idNextLvl = 5;        // Id du prochain niveau
let startTime = new Date().getTime(); // Starting time for the chronometer