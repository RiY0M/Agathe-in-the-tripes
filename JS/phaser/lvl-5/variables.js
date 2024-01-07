let agathe;                             // agathe personnage
let rat;                                // rat pnj
let MOVX = true;                        // le rat peut se déplacer en x
let MOVY = true;                        // le rat peut se déplacer en y
let allowRatToMove = false;             // autorisation deplacement rat
let switchRatDirection = false;         // check si direction rat change ou pas
let delaybeforeCapture = 0;             // délai avant que le rat puisse de nouveau être capturé
let cursors;                            // détection clavier
let lastFrame = 8;                      // last frame facing afk
let canvasBorder;                       // bordure du canvas
let blackBorders;                       // bordures noires limiter déplacement
let poopDoor;                           // porte caca
let oldOnPoop;                          // image pnj sur caca
let flatThings;                         // images plates (sang, caca, ...)
let bloodyRocks;                        // images cailloux de sang + caca
let fakeBloodyRocks;                    // cailloux pouvant bouger
let deadThings;                         // sprites trucs morts
let sticks;                             // bâtons de dynamite à ramasser
let angryMinor;                         // sprite mineur

let talkingTo = "";                     // variable pour savoir à qui on parle
let dialogueArea;                       // zone de dialogue
let isDialogueAreaDisplayed = false;    // on vérifie si la zone est affichée ou non

let dialogueOldPoop = 0;                // check si on a déjà parlé au vieux
let oldDialogueList = [                 // dialogues du vieux au caca
    "Salut la jeunesse !<br>Alors comme ça toi aussi tu es coincée dans ce monstre gamine ?",
    "La sortie ?<br>Ça fait logntemps que j'ai abandonné l'idée de l'atteindre. Elle semble bloquée par cet amas de... je préfère pas trop savoir en fait.",
    "Si seulement j'avais un moyen de tout faire sauter... Un bon coup de dynamite règlerai notre problème !",
    "Mais avant tout ça, réglons déjà ce problème de lumière, on y voit rien ici...",
    "T'en penses quoi gamine ?"
];

let powder;                             // poudre à canon
let strangeRock;                        // pierre bizarre
let strangeRockDialogue = 0;            // check si on a déjà pensé devant le cailloux
let strangeRockDialogueList = [         // pensées devant le cailloux chelou
    "*Cette pierre semble étrange...*",
    "*Peut-être pourriez-vous la briser avec un outil adapté ?*"
];

let canDestroyRock = false;                        // boolean pour savoir quand on peut péter le cailloux
let strangeRockDialogueWithPickaxe = 0;            // check si on a déjà pensé devant le cailloux
let strangeRockDialogueListWithPickaxe = [         // pensées devant le cailloux chelou
    "*Grâce à la pioche du mineur vous arrivez désormais à casser cette pierre étrange*",
    "*Vous la brisez et il n'en reste désormais plus que cet amas de poudre*",
];

let dialogueMinor = 0;                  // check si on a déjà parlé au mineur
let dialogueMinorList = [               // dialogues du mineur
    "Quoi ?<br>Qu'est-ce que tu m'veux gamine ?",
    "Ma pioche ?<br>Laisse tomber j'ai déjà essayé, ce truc est incassable...",
    "Quoi ?<br>Tu veux quand même essayer ? T'es têtue ma parole...",
    "Bon ok, je te la laisse à condition que tu me prouves que tu la mérites d'accord ?",
    "À ton avis, le comble pour un mineur c'est quoi ?<br><br><span class='minor-answer-1'>- C'est feur !</span><br><span class='minor-answer-2'>- Être une tête de pioche ?</span>",
    ""
];

let dialogueRat = 0;
let dialogueRatList = [
    "*Vous venez d'attraper ce rat plutôt dégoutant*",
    "*Le rat gesticule et vous vomit dessus*",
    "*Vous obtenez du fil !*"
]

// variables des objets à récupérer
let sticksGathered = 0;
let hasPowder = false;
let hasString = false;
let hasLighter = false;
let hasPickaxe = false;


function loadSpriteVariables(scene)
{
    // bordure
    canvasBorder = scene.physics.add.staticGroup();
    blackBorders = scene.physics.add.staticGroup();
    poopDoor = scene.physics.add.staticGroup();

    // PNJs
    oldOnPoop = scene.physics.add.staticGroup();
    angryMinor = scene.physics.add.staticGroup();

    // images plates
    flatThings = scene.physics.add.staticGroup();

    // cailloux de sang
    bloodyRocks = scene.physics.add.staticGroup();
    fakeBloodyRocks = scene.physics.add.group();

    // cailloux bizarre
    strangeRock = scene.physics.add.staticGroup();

    // trucs morts
    deadThings = scene.physics.add.staticGroup();

    // bâtons dyna
    sticks = scene.physics.add.staticGroup();

    // poudre à canon
    powder = scene.physics.add.staticGroup();
}