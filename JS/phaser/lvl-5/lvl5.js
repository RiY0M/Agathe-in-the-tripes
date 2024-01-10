// configuration de la taille de l'écran, du type de jeu et des fonctions par défaut
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: { default: 'arcade' },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


//$ CREATION FENETRE PHASER $//
let game = new Phaser.Game(config);
sticks = cookies.nbDynamite;


function preload()
{
    // chargement de tous les sprites
    loadImages(this);
}

function create()
{
    //* Theme de fond *//
    music = this.sound.add("theme");
    music.setLoop(true);
    music.play();

    //$ FOND DU BACKGROUND $//
    let bg = this.physics.add.staticGroup()
    bg.create(400, 300, "lvl5-bg");

    //$ CHARGEMENT VARIABLES DE SPRITES $//
    loadSpriteVariables(this);

    //$ ZONE DE DIALOGUE $//
    dialogueArea = document.querySelector("#dialogue-area");

    //* BORDURE DU CANVAS *//
    displayCanvasBorder();

    //* AFFICHAGE IMAGES PLATES *//
    displayFlatThings();

    //* AFFICHAGE CAILLOUX DE SANG *//
    displayBloodyRocks();

    //* AFFICHAGE DES PNJs *//
    displayPNJs();


    //~ SPRITE AGATHE ~//
    createAgathe(this);

    //~ SPRITE RAT ~//
    createRat(this);


    //! COLLISIONS !//
    this.physics.add.collider(agathe, canvasBorder);
    this.physics.add.collider(agathe, blackBorders);
    this.physics.add.collider(agathe, poopDoor);
    this.physics.add.collider(agathe, oldOnPoop);
    this.physics.add.collider(agathe, angryMinor);
    this.physics.add.collider(agathe, bloodyRocks);
    this.physics.add.collider(agathe, strangeRock, collidePowderRock, null, this);
    this.physics.add.collider(agathe, powder, collectPowder, null, this);
    this.physics.add.collider(agathe, fakeBloodyRocks);
    this.physics.add.collider(agathe, dynamite, dropDynamite, null, this);

    //! DETECTION RECUP DYNAMITE !//
    this.physics.add.overlap(agathe, sticks, collectStick, null, this);
    
    //! DETECTION DU CLAVIER !//
    cursors = this.input.keyboard.createCursorKeys();


    //^ ANIMATIONS AGATHE (SPRITES) ^//

    //? MOVING ANIMS ?//
    createAnims(this);
    createRatAnims(this);
    
    //? AFK ANIMS ?//
    createAFK(this);

    //? EXPLOSION ?//
    this.anims.create({
        key: 'EXPLOSION',
        frames: this.anims.generateFrameNumbers('EXPLOSION', {
          start: 0,
          end: 7
        }),
        repeat: 0,
        frameRate: 10
    });

    
    boom.on('animationcomplete', () => {
        boom.setVisible(false);
    });
}

function update()
{
    //% FONCTION DIALOGUE VIEUX %//
    dialogueWithOld(this, agathe);

    //% FONCTION DIALOGUE MINEUR %//
    dialogueWithMinor(this, agathe);


    //^ANIMATION RAT (AUTOMATIQUE) ^//
    moveThisFuckingRat();

    // changeLvl(idCurrentLvl, idNextLvl, startTime, nbHearts);

    //? CHECK COLLISION AGATHE - RAT ?//
    // si on tape le rat et que l'on a pas encore récupéré le fil
    if (agathe.x > rat.x -10 && agathe.x < rat.x +10 && agathe.y +10 > rat.y -15 && agathe.y +10 < rat.y +15 && !hasString) {

        // si on a pas encore changé la direction
        if (!switchRatDirection) {
            // on change la direction
            ratPath = ratPath.switchOrder();
            switchRatDirection = true;
        }

        // si on attrape le rat 50 frames après qu'il ait changé de direction
        if (delaybeforeCapture >= 50) {

            // arrêt déplacement rat
            allowRatToMove = false;
            rat.setVelocityX(0);
            rat.setVelocityY(0);

            // on le cache
            rat.setTexture("blank");

            // lancement dialogue avec rat
            dialogueWithRat();
        }      
    }

    if (switchRatDirection && dialogueRat == 0) delaybeforeCapture++;


    //? CHECK SI ON PEUT TRANSFORMER LA PIERRE EN POUDRE ?//
    if (canDestroyRock) {
                
        // destruction pierre
        strangeRock.children.entries[0].disableBody(true, true);

        canDestroyRock = false;

        // affichage poudre
        displayPowder(this);
    }


    //? CHECK SI ON PEUT AFFICHER LE CALQUE DE LA DYNA ?//
    if (canDropDyna) {

        dynamite.create(760, 315, "dynamite").setAlpha(0.4);
        canDropDyna = false;
    }


    //? CHECK SI ON PEUT EXPLOSER DYNAMITE ?//
    if (hasDropDyna && delaybeforeExplosion <= 50) delaybeforeExplosion++
    if (delaybeforeExplosion == 50) {

        // affichage explosion
        boom.setVisible(true);
        boom.play('EXPLOSION');
        updateObjectifs();
        
        // suppression dynamite + porte
        dynamite.children.entries[0].disableBody(true, true);
        poopDoor.children.entries[0].disableBody(true, true);
    }


    // vérification de notre vie
    if (nbHearts == 0) displayDeathScreen();


    //^ ANIMATIONS AGATHE (CLAVIER) ^//

    // on empêche de se déplacer si on est au milieu d'un dialogue
    if (!isDialogueAreaDisplayed)
    {
        lastFrame = createMove(agathe, cursors, lastFrame)[0];
    }
    else
    {
        // si aucune touche du clavier n'est appuyée : on arrête agathe
        agathe.setVelocityX(0);
        agathe.setVelocityY(0);
        // pose du joueur selon la dernière touche (gauche/droite/haut/bas)
        agathe.anims.play("afk-" + lastFrame);
    }
}


function collectStick(player, stick)
{
    // destruction stick
    stick.disableBody(true, true);

    // indication qu'on en a récupéré un
    sticksGathered++;
    updateStickNumber();

    // vérification des objets en notre possession
    updateObjectifs();
}


function collidePowderRock(player, rock)
{
    // lacement dialogue si on a pas la pioche
    if (!hasPickaxe) dialogueWithStrangeRock();

    // transformation pierre en poudre si on a la pioche (lancement dialogue avec pierre)
    else if (strangeRockDialogueWithPickaxe == 0) dialogueWithStrangeRockWithPickaxe();
}


function collectPowder(player, powder)
{    
    // destruction poudre
    powder.disableBody(true, true);

    // indication qu'on a récupéré la poudre
    hasPowder = true;
    
    // vérification des objets en notre possession
    updateObjectifs();
}


function dropDynamite(player, dyna)
{
    dyna.setAlpha(1);
    hasDropDyna = true;
    updateObjectifs();
}