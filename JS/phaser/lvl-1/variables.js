let agathe;                 // agathe personnage
let cursors;                // détection clavier
let lastFrame = 12;         // last frame facing afk
let tongue;                 // langue map
let topBorder;              // bordure du haut
let fleshWall;              // mur de sang
let staticTeeth;            // dents fixes
let deadThings;             // squelette mort
let blood;                  // sang par terre
let squelettonHeart;        // coeur du squelette


function loadSpriteVariables(scene)
{
    // définition groupe dents
    staticTeeth = scene.physics.add.staticGroup();

    // définition groupe mur de sang
    fleshWall = scene.physics.add.staticGroup();

    // sang squelette et rat
    blood = scene.physics.add.staticGroup();

    // chose morte
    deadThings = scene.physics.add.staticGroup();
}