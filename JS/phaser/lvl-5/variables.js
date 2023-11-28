let agathe;                    // agathe personnage
let cursors;                   // détection clavier
let lastFrame = 8;             // last frame facing afk
let canvasBorder;              // bordure du canvas
let oldOnPoop;                 // image pnj sur caca
let flatThings;                // images plates (sang, caca, ...)
let dialogueOldPoop = 0;       // check si on a déjà parlé au vieux
let dialogueArea;              // zone de dialogue


function loadSpriteVariables(scene)
{
    // bordure
    canvasBorder = scene.physics.add.staticGroup();

    // PNJs
    oldOnPoop = scene.physics.add.staticGroup();

    // images plates
    flatThings = scene.physics.add.staticGroup();
}