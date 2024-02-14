// configuration de la taille de l'écran, du type de jeu et des fonctions par défaut
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


//$ CREATION FENETRE PHASER $//
let game = new Phaser.Game(config);
sticksGathered = cookies.nbDynamite;


function preload()
{
    // chargement de tous les sprites
    loadImages(this);
}

function create()
{

    //* Theme de fond *//
    music = this.sound.add("theme");
    music.volume -= 0.3;
    music.setLoop(true);
    music.play();
    newHeart = this.sound.add("newHeart");

    //$ FOND DU BACKGROUND $//
    let bg = this.physics.add.staticGroup()
    bg.create(400, 300, "lvl6-bg");

    //$ CHARGEMENT VARIABLES DE SPRITES $//
    loadSpriteVariables(this);

    //* CREATION DE LA MAP BACK *//
    createBackMap(this);

    //~ SPRITE AGATHE ~//
    createAgathe(this);

    //* CREATION DE LA MAP FRONT *//
    createFrontMap(this);


    //! COLLISIONS !//
    this.physics.add.collider(agathe, roadBorder);
    this.physics.add.collider(agathe, potion, gulpDown, null, this);
    
    //! DETECTION DU CLAVIER !//
    cursors = this.input.keyboard.createCursorKeys();


    //^ ANIMATIONS AGATHE (SPRITES) ^//

    //? MOVING ANIMS ?//
    createVerticalAnims(this);
    
    //? AFK ANIMS ?//
    createAFK(this);
}

function update()
{
    createVerticalMove(agathe, cursors);

    if(agathe.x >= 790) {
        changeLvl(idCurrentLvl, idNextLvl, startTime, nbHearts);
    }
}


function gulpDown(player, potion)
{
    // destruction potion
    potion.disableBody(true, true);

    // joueur full vie
    nbHearts = 3;
    newHeart.play();
}