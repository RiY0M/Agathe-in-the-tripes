let agathe;                 // agathe personnage
let vomitball;              // boule de vomis
let leftLittleWorms;   // petits vers gauche
let rightLittleWorms;  // petits vers droite
let okForLeftWormAnim = true;
let okForRightWormAnim = true;
let cursors;                // détection clavier
let lastFrame = 8;          // last frame facing afk
let music;                  //Theme (musique de fond)
let bossDmgSound;                  //Sound effect boss
let restartMusic = 16;       // Musique se relance au moment choisis
let isFirstTime = true; 



const idCurrentLvl = 7;      // Id du niveau courant
const idNextLvl = 8;        // Id du prochain niveau
let startTime = new Date().getTime(); // Starting time for the chronometer

let start3sCoolDownAgathe = false;    // lancement de l'invincibilité pour Agathe
let invicibilityAgathe = 150;         // temps d'immortalité d'agathe
//-------------------------

let roadBorder;                         // bordure route invisible

function loadSpriteVariables(scene){
    roadBorder = scene.physics.add.staticGroup();

}

let graphics;
let boss;
let percent_bar;
let width_bar
