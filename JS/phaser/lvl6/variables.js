let agathe;                             // sprite agathe
let lastFrame = 8;                      // last frame facing afk
let roadBorder;                         // bordure route invisible
let frontMapElement;                    // éléments devant agathe 


function loadSpriteVariables(scene)
{
    roadBorder = scene.physics.add.staticGroup();

    frontMapElement = scene.physics.add.staticGroup();
}