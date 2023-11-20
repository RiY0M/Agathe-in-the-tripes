"use strict";

// configuration de la taille de l'écran, du type de jeu et des fonctions par défaut
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#000",
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
    this.scrollSpeed = 6;

    backgrounds = createMap(this);

    //* SPRITE BORDURES *//
    createBorders(this);

    //* SPRITES CAILLOUX *//
    createRocks(this);

    //* SPRITES FIN *//
    createEnd(this);


    //~ SPRITE AGATHE ~//
    createAgathe(this);


    //! COLLISIONS !//
    this.physics.add.collider(agathe, rocks, hitRock, null, this);
    this.physics.add.collider(agathe, finNiv, reachEnd, null, this);
    this.physics.add.collider(agathe, borders);

    
    //! DETECTION DU CLAVIER !//
    cursors = this.input.keyboard.createCursorKeys();


    //^ ANIMATIONS AGATHE (SPRITES) ^//

    //? MOVING ANIMS ?//
    createAnims(this);

    // console.log(borders);
    // console.log(rocks);
    // console.log(finNiv);
}

function update()
{
    // animation sprite
    agathe.anims.play("right", true);

    if(hasMoved && !levelStop) {
        moveLevel(this.scrollSpeed);
    }

    //^ MOUVEMENTS AGATHE (CLAVIER) ^//
    /* GAUCHE */
    if (cursors.left.isDown && !levelStop) {
        // vitesse et direction du déplacement
        this.scrollSpeed = 5;
        // this.scrollSpeed = -3; // debug
        hasMoved = true;
    }

    /* DROITE */
    if (cursors.right.isDown && !levelStop) {
        // vitesse et direction du déplacement
        this.scrollSpeed = 8;
        // this.scrollSpeed = 0; // debug
        hasMoved = true;
    }

    /* HAUT */
    if (cursors.up.isDown && !levelStop) {
        // vitesse et direction du déplacement
        agathe.setVelocityY(-160);
        hasMoved = true;
    }

    /* BAS */
    if (cursors.down.isDown && !levelStop) {
        // vitesse et direction du déplacement
        agathe.setVelocityY(160);
        hasMoved = true;
    }

    /* AFK */
    if (cursors.down.isUp && cursors.up.isUp && !levelStop) {
        // si ni haut ni bas n'est appuyé : on arrête agathe
        agathe.setVelocityY(0);
    }

    /* AFK */
    if (cursors.left.isUp && cursors.right.isUp && !levelStop) {
        // si ni droite ni guache n'est appuyée : on réinitialise le scroll
        this.scrollSpeed = 6;
    }
}

function hitRock(character, rock) {

    // Stoppe le niveau pendant 1 seconde
    levelStop = true;
    this.scrollSpeed = 0;
    agathe.setVelocityY(0);
    
    // sleep(1000); + Reset lvl without reloading it
    setTimeout(() => {

        // Réinitialise le niveau
        agathe.y = initialY;
        moveLevel(-xScroll);
        hasMoved = false;
        levelStop = false;
    }, 1000);
    
}

function reachEnd(character, end) {
    //^ Si Agathe termine le niveau ^//
    // changement map
    // window.location.replace("./lvl3.html");

    // Enregistrement du temps + passage au niveau 3 dans la bdd
    // Appel API


    window.alert("Dans l'estomac !"); // debug
}