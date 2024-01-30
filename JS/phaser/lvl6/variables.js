let agathe;                             // sprite agathe
let lastFrame = 8;                      // last frame facing afk
let roadBorder;                         // bordure route invisible
let frontMapElement;                    // éléments devant agathe
let potion;                             // potion à récupérer
const idCurrentLvl = 6;                 // Id du niveau courant
const idNextLvl = 7;                    // Id du prochain niveau
let startTime = new Date().getTime();   // Starting time for the chronometer

let music;                  //Theme (musique de fond) 
let newHeart;

function loadSpriteVariables(scene)
{
    roadBorder = scene.physics.add.staticGroup();

    frontMapElement = scene.physics.add.staticGroup();

    potion = scene.physics.add.staticGroup();
}