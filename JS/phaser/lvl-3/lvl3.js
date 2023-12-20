// configuration de la taille de l'écran, du type de jeu et des fonctions par défaut
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#b33015",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
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

    //* MAP *//
    tilemap(this);

    //~ SPRITE AGATHE ~//
    createAgathe(this);

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
    this.cameras.main.setBounds(0, 0, 800, 3200);
    this.cameras.main.startFollow(agathe, true, 0.5, 0.5);

    
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
        agathe.setVelocityY(-450);
        
        if (agathe.y <= 105) console.log("next lv");               //changeLvl(idCurrentLvl, idNextLvl, startTime);

    }
}