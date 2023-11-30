"use strict";

let agathe;                 // agathe personnage
let backgrounds             // Background
let cursors;                // détection clavier
// let lastFrame = 8;          // last frame facing afk
let finNiv;                 // Hitbox représentant la fin du niveau
let obstacles = [];         // sprites cailloux
let borders;                // bordure du haut et du bas
// let cave;                   // sprite grotte
// let hasLight = false;       // taille halo en fonction lampe ou pas
// let lamp;                   // lampe
// let hole;                   // halo lumineux
// let holeRadius = 60;        // rayon du halo de lumière
// let holeDiffHeight = 0;     // décalage du halo si lampe
let hasMoved = false;       // booleen verif si affi ou non tuto                  
// let tutoDeplacement;        // message tutoriel pour apprendre touches
let startTime = new Date().getTime(); // Starting time fot the chronometer
let xScroll = 0;             // Compteur pour combien on a scroll dans le niveau
let levelStop = false;        // Indicate if the level is stopped or not
const initialY = 270;        // Initial Y position of agathe
const loopLvl2 = 10;         // Nombre de fois qu'on boucle pour créer le niveau 2