let agathe;                 // agathe personnage
let cursors;                // détection clavier
let lastFrame = 8;          // last frame facing afk
let trees;                  // sprites arbres
let rocks;                  // sprites cailloux
let borders;                // bordure du haut et du bas
// let cave;                   // sprite grotte
let hasLight = false;       // taille halo en fonction lampe ou pas
let lamp;                   // lampe
let hole;                   // halo lumineux
let holeRadius = 60;        // rayon du halo de lumière
let holeDiffHeight = 0;     // décalage du halo si lampe
let hasMoved = false;       // booleen verif si affi ou non tuto                  
let tutoDeplacement;        // message tutoriel pour apprendre touches
const loopLvl2 = 5;         // Nombre de fois qu'on boucle pour créer le niveau 2