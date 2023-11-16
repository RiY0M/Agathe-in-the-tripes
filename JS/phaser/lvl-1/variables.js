let agathe;                     // agathe personnage
let cursors;                    // détection clavier
let lastFrame = 12;             // last frame facing afk
let tongue;                     // langue map
let topBorder;                  // bordure du haut
let fleshWall;                  // mur de sang
let movingFleshWall;            // gencives des dents mobiles
let staticTeeth;                // dents fixes
let movingTeeth1;               // dents bougent (vitesse 1)
let isMovingTeeth1Up = true;    // booleen check si up ou down
let deadThings;                 // squelette mort
let blood;                      // sang par terre
let squelettonHeart;            // coeur du squelette
let invicibility = 150;         // temps d'immortalité
let start3sCoolDown = false;    // lancement de l'invincibilité
let hurting = false;            // clignottement agathe dégât
let retractingTeethLoop = 0;    // boucle rétractation dents



function loadSpriteVariables(scene)
{
    // définition groupe dents
    staticTeeth = scene.physics.add.staticGroup();
    movingTeeth1 = scene.physics.add.staticGroup();

    // définition groupe mur de sang
    fleshWall = scene.physics.add.staticGroup();

    // sang squelette et rat
    blood = scene.physics.add.staticGroup();

    // chose morte
    deadThings = scene.physics.add.staticGroup();
}