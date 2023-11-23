let agathe;                     // agathe personnage
let cursors;                    // détection clavier
let lastFrame = 8;              // last frame facing afk
let canvasBorder;               // bordure du canvas


function loadSpriteVariables(scene)
{
    canvasBorder = scene.physics.add.staticGroup();
}