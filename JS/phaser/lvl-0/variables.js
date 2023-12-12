let agathe;                 // agathe personnage
let cursors;                // détection clavier
let lastFrame = 8;          // last frame facing afk
let trees;                  // sprites arbres
let rocks;                  // sprites cailloux
let topBorder;              // bordure du haut
let cave;                   // sprite grotte
let hasLight = false;       // taille halo en fonction lampe ou pas
let lamp;                   // lampe
let hole;                   // halo lumineux
let holeRadius = 60;        // rayon du halo de lumière
let holeDiffHeight = 0;     // décalage du halo si lampe
let hasMoved = false;       // booleen verif si affi ou non tuto                  
let tutoDeplacement;        // message tutoriel pour apprendre touches
const idCurrentLvl = 0;      // Id du niveau courant
const idNextLvl = 1;         // Id du prochain niveau
let startTime = new Date().getTime(); // Starting time fot the chronometer