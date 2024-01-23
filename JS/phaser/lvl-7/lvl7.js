// configuration de la taille de l'écran, du type de jeu et des fonctions par défaut
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#e78c93",
    physics: { default: 'arcade' },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


// $ CREATION FENETRE PHASER $//
let game = new Phaser.Game(config);


function preload(){
    loadImages(this);
}

function create(){
    //* Theme de fond *//
    music = this.sound.add("theme");
    music.volume -= 0.5;
    music.setLoop(true);
    music.play();

    //~ SPRITE AGATHE ~//
    createAgathe(this);    

    //! COLLISIONS !//
    // this.physics.add.collider(agathe, walls);
    
    //! DETECTION DU CLAVIER !//
    cursors = this.input.keyboard.createCursorKeys();

    //^ ANIMATIONS AGATHE (SPRITES) ^//

    //? MOVING ANIMS ?//
    createAnims(this);
    
    //? AFK ANIMS ?//
    createAFK(this);   

}

function update(){

    // console.log(agathe.x, agathe.y);

    //^ ANIMATIONS AGATHE (CLAVIER) ^//
    lastFrame = createMove(agathe, cursors, lastFrame)[0];

    // if (agathe.x >= 1580) {
    //     changeLvl(idCurrentLvl, idNextLvl, startTime, nbHearts);
    // }

}