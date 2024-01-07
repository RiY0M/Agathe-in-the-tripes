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


function preload()
{
    // chargement de tous les sprites
    loadImages(this);
}

function create()
{
    //$ FOND DU BACKGROUND $//
    let bg = this.physics.add.staticGroup()
    bg.create(400, 300, "lvl5-bg");

    //$ CHARGEMENT VARIABLES DE SPRITES $//
    loadSpriteVariables(this);

    //$ ZONE DE DIALOGUE $//
    dialogueArea = document.querySelector("#dialogue-area");


    //* AFFICHAGE IMAGES PLATES *//
    displayFlatThings();

    //* BORDURE DU CANVAS *//
    displayCanvasBorder();

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
}

function update()
{
    // console.log("Mouse : (", game.input.mousePointer.x, " ; ", game.input.mousePointer.y, ")");

    //% FONCTION DIALOGUE VIEUX %//
    dialogueWithOld(this, agathe);

    //% FONCTION DIALOGUE MINEUR %//
    dialogueWithMinor(this, agathe);


    //^ANIMATION RAT (AUTOMATIQUE) ^//
    moveThisFuckingRat();


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


    //^ ANIMATIONS AGATHE (CLAVIER) ^//

    // on empêche de se déplacer si on est au milieu d'un dialogue
    if (!isDialogueAreaDisplayed)
    {
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

            if (agathe.x >= 790) {
                window.alert("fin du jeu");
            }
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
    console.log("should collect powder");
    
    // destruction poudre
    powder.disableBody(true, true);

    // indication qu'on a récupéré la poudre
    hasPowder = true;
    
    // vérification des objets en notre possession
    updateObjectifs();
}