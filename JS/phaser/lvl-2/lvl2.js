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
    //* Theme de fond *//
    music = this.sound.add("theme");
    music.play();

    this.scrollSpeed = 6;

    backgrounds = createMap(this);

    //* SPRITE BORDURES *//
    createBorders(this);

    //* SPRITES CAILLOUX *//
    createObstacles(this);

    //* SPRITES CAILLOUX *//
    createBenef(this);

    //* SPRITES FIN *//
    createEnd(this);


    //~ SPRITE AGATHE ~//
    createAgathe(this);


    //! COLLISIONS !//
    this.physics.add.collider(agathe, obstacles, hitObstacle, null, this);
    this.physics.add.collider(agathe, heart, getHeart, null, this);
    this.physics.add.collider(agathe, dynamite, getDynamite, null, this);
    this.physics.add.collider(agathe, finNiv, reachEnd, null, this);
    this.physics.add.collider(agathe, borders);

    
    //! DETECTION DU CLAVIER !//
    cursors = this.input.keyboard.createCursorKeys();


    //^ ANIMATIONS AGATHE (SPRITES) ^//
    createAFK(this);

    //? MOVING ANIMS ?//
    createAnims(this);
}

function update()
{
    
    if(hasMoved && !levelStop) {
        // animation sprite
        agathe.anims.play("right", true);
        moveLevel(this.scrollSpeed);
    }
    // else {
    //     // agathe.anims.play("afk-8", true);
    // }

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

//^ Si agathe rencontre un obstacle ^//
function hitObstacle(character, obstacles) {

    // Stoppe le niveau pendant 1 seconde
    levelStop = true;
    this.scrollSpeed = 0;
    agathe.setVelocityY(0);
    
    // sleep(1000); + Reset lvl without reloading it
    setTimeout(() => {

        // Réinitialise le niveau
        agathe.y = initialY;
        startTime = new Date().getTime();
        moveLevel(-xScroll);
        // heart.disableBody(false, false);
        // dynamite.disableBody(false, false);
        heart.visible = true;
        dynamite.visible = true;
        hasDynamite = false;
        hasMoved = false;
        levelStop = false;
    }, 1000);
}

//^ Si agathe touche le coeur ^//
function getHeart(character, heart) {

    // heart.disableBody(true, true);
    heart.visible = false;
    if (nbHearts < 3) {
        nbHearts++;
        reloadNbHearts();
    }
}

//^ Si agathe touche le coeur ^//
function getDynamite(character, dynamite) {
    // dynamite.disableBody(true, true);
    dynamite.visible = false;
    hasDynamite = true;
}

//^ Si Agathe termine le niveau ^//
function reachEnd(character, end) {
    changeLvl(idCurrentLvl, idNextLvl, startTime, nbHearts, hasDynamite);
}