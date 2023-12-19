// configuration de la taille de l'écran, du type de jeu et des fonctions par défaut
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#b33015",
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

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'platforms').setScale(5);

    //* MAP *//
    //labyrinthe(this);

    //~ SPRITE AGATHE ~//
    createAgathe(this);
    agathe.setBounce(0.2);

    //! COLLISIONS !//
    this.physics.add.collider(agathe, platforms);

    //! DETECTION DU CLAVIER !//
    cursors = this.input.keyboard.createCursorKeys();

    //^ ANIMATIONS AGATHE (SPRITES) ^//

    //? MOVING ANIMS ?//
    createAnims(this);
    
    //? AFK ANIMS ?//
    createAFK(this);   
    
    //? Caméra ?//
    // this.cameras.main.setBounds(0, 0, 1600, 1600);
    // this.cameras.main.startFollow(agathe, true, 0.5, 0.5);

}

function update(){


    //^ ANIMATIONS AGATHE (CLAVIER) ^//
    /* GAUCHE */
    if (cursors.left.isDown && cursors.right.isUp && cursors.up.isUp && cursors.down.isUp)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityX(-160);
        // animation sprite
        agathe.anims.play("left", true);
        // last frame facing afk
        lastFrame = 4;
    }

    /* DROITE */
    else if (cursors.right.isDown && cursors.left.isUp && cursors.up.isUp && cursors.down.isUp)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityX(160);
        // animation sprite
        agathe.anims.play("right", true);
        // last frame facing afk
        lastFrame = 8;

        if (agathe.x >= 1580) {
            window.location.replace("./lvl5.html");
        }
    }

    /* HAUT */
    else if (cursors.up.isDown && cursors.down.isUp && cursors.left.isUp && cursors.right.isUp)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityY(-160);
        // animation sprite
        agathe.anims.play("up", true);
        // last frame facing afk
        lastFrame = 12;
    }

    /* BAS */
    else if (cursors.down.isDown && cursors.up.isUp && cursors.left.isUp && cursors.right.isUp)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityY(160);
        // animation sprite
        agathe.anims.play("down", true);
        // last frame facing afk
        lastFrame = 0;
    }

    /* AFK */
    else
    {
        // si aucune touche du clavier n'est appuyée : on arrête agathe
        agathe.setVelocityX(0);
        agathe.setVelocityY(0);
        // pose du joueur selon la dernière touche (gauche/droite/haut/bas)
        agathe.anims.play("afk-" + lastFrame);
    }
}