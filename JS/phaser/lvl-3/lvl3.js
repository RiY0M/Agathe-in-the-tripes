// configuration de la taille de l'écran, du type de jeu et des fonctions par défaut
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#b33015",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 550 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


// $ CREATION FENETRE PHASER $//
let game = new Phaser.Game(config);


function preload(){
    //$ ELEMENTS HTML $//
    loadImages(this);
}

function create(){
    //* Theme de fond *//
    music = this.sound.add("theme");
    music.play();

    //* SOL *//
    createGround(this);

    //* MAP *//
    //tilemap(this);

    //~ SPRITE AGATHE ~//
    createAgathe(this);
    agathe.setBounce(0.2);

    //! COLLISIONS !//
    this.physics.add.collider(agathe, platforms);

    //! DETECTION DU CLAVIER !//
    cursors = this.input.keyboard.createCursorKeys();

    //^ ANIMATIONS AGATHE (SPRITES) ^//

    //? MOVING ANIMS ?//
    anims(this);    //Animation unique a ce niveau
    
    //? AFK ANIMS ?//
    createAFK(this);   
    
    //? Caméra ?//
    // this.cameras.main.setBounds(0, 0, 1600, 1600);
    // this.cameras.main.startFollow(agathe, true, 0.5, 0.5);

    
}

function update(){


    if (cursors.left.isDown)
    {
        agathe.setVelocityX(-160);

        agathe.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        agathe.setVelocityX(160);

        agathe.anims.play('right', true);
    }
    else
    {
        agathe.setVelocityX(0);

        agathe.anims.play('turn');
    }

    if (cursors.up.isDown && agathe.body.touching.down)
    {
        agathe.setVelocityY(-330);
    }
}