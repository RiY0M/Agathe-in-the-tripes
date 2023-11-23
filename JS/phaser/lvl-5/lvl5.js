// configuration de la taille de l'écran, du type de jeu et des fonctions par défaut
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#a36440",
    physics: { default: 'arcade' },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


//$ CREATION FENETRE PHASER $//
let game = new Phaser.Game(config);


function preload()
{
    // chargement de tous les sprites
    loadImages(this);
}

function create()
{
    //$ CHARGEMENT VARIABLES DE SPRITES $//
    loadSpriteVariables(this);

    //* BORDURE DU CANVAS *//
    displayCanvasBorder();


    //~ SPRITE AGATHE ~//
    createAgathe(this);


    //! COLLISIONS !//
    this.physics.add.collider(agathe, canvasBorder);
    
    //! DETECTION DU CLAVIER !//
    cursors = this.input.keyboard.createCursorKeys();


    //^ ANIMATIONS AGATHE (SPRITES) ^//

    //? MOVING ANIMS ?//
    createAnims(this);
    
    //? AFK ANIMS ?//
    createAFK(this);
}

function update()
{
    //^ ANIMATIONS AGATHE (CLAVIER) ^//


    /* GAUCHE */
    if (cursors.left.isDown)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityX(-160);
        // animation sprite
        agathe.anims.play("left", true);
        // last frame facing afk
        lastFrame = 4;
    }

    /* DROITE */
    else if (cursors.right.isDown)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityX(160);
        // animation sprite
        agathe.anims.play("right", true);
        // last frame facing afk
        lastFrame = 8;
    }

    /* HAUT */
    else if (cursors.up.isDown)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityY(-160);
        // animation sprite
        agathe.anims.play("up", true);
        // last frame facing afk
        lastFrame = 12;
    }

    /* BAS */
    else if (cursors.down.isDown)
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