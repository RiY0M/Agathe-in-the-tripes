let agathe;                             // agathe personnage
let cursors;                            // détection clavier
let lastFrame = 8;                      // last frame facing afk
let canvasBorder;                       // bordure du canvas
let oldOnPoop;                          // image pnj sur caca
let flatThings;                         // images plates (sang, caca, ...)
let dialogueOldPoop = 0;                // check si on a déjà parlé au vieux
let dialogueArea;                       // zone de dialogue
let isDialogueAreaDisplayed = false;    // on vérifie si la zone est affichée ou non

let oldDialogueList = [                 // dialogues du vieux au caca
    "Salut la jeunesse !<br>Alors comme ça toi aussi tu es coincée dans ce monstre gamine ?",
    "La sortie ?<br>Ça fait logntemps que j'ai abandonné l'idée de l'atteindre. Elle semble bloquée par cet amas de... je préfère pas trop savoir en fait.",
    "Si seulement j'avais un moyen de tout faire sauter... Un bon coup de dynamite règlerai notre problème !",
    "T'en penses quoi gamine ?"
]

// variables des objets à récupérer
let sticksGathered = 0;
let hasPowder = false;
let hasString = false;
let hasLighter = false;


function loadSpriteVariables(scene)
{
    // bordure
    canvasBorder = scene.physics.add.staticGroup();

    // PNJs
    oldOnPoop = scene.physics.add.staticGroup();

    // images plates
    flatThings = scene.physics.add.staticGroup();
}