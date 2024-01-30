let agathe;                             // sprite agathe
let lastFrame = 8;                      // last frame facing afk
let roadBorder;                         // bordure route invisible
let frontMapElement;                    // éléments devant agathe
let potion;                             // potion à récupérer


function loadSpriteVariables(scene)
{
    roadBorder = scene.physics.add.staticGroup();

    frontMapElement = scene.physics.add.staticGroup();

    potion = scene.physics.add.staticGroup();
}