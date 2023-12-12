// configuration de la taille de l'écran, du type de jeu et des fonctions par défaut
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#FFFFFF",
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
    //$ ELEMENTS HTML $//
    hole = document.querySelector(".hole");
    tutoDeplacement = document.querySelector("#tuto-deplacement");

    // chargement de tous les sprites
    loadImages(this);
}

function create()
{
    //* SPRITE BORDURE DU HAUT *//
    createTopBorder(this);


    //* SPRITE GROTTE *//
    createCave(this);


    //* SPRITES ARBRES HAUT *//
    createTopTrees(this);


    //* SPRITE LAMPE *//
    createLamp(this);


    //* SPRITES CAILLOUX *//
    createRocks(this);    


    //~ SPRITE AGATHE ~//
    createAgathe(this);    


    //* SPRITES ARBRES MIDDLE *//
    createMiddleTrees();    


    //* SPRITES ARBRES BAS *//
    createBottomTrees();    


    //* PARTICULES DE NEIGE *//
    createWhiteParticles(this); // BLANCHES
    createBlueParticles(this);  // BLEUES
    


    //! COLLISIONS !//
    this.physics.add.collider(agathe, rocks);
    this.physics.add.collider(agathe, topBorder);

    //! ACTION RECUP LAMPE !//
    this.physics.add.overlap(agathe, lamp, collectLamp, null, this);

    
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
    if (cursors.left.isDown && cursors.right.isUp && cursors.up.isUp && cursors.down.isUp)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityX(-160);
        // animation sprite
        agathe.anims.play("left", true);
        // last frame facing afk
        lastFrame = 4;

        // on indique qu'on a appuyé sur une touche pour supprimer le message de tuto
        hasMoved = true;
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

        // on indique qu'on a appuyé sur une touche pour supprimer le message de tuto
        hasMoved = true;
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
        
        // si agathe rentre dans la grotte (y = coordonnées du point d'entrée)
        if (agathe.y == 64) {
            changeLvl(idCurrentLvl, idNextLvl, startTime);
        }

        // on indique qu'on a appuyé sur une touche pour supprimer le message de tuto
        hasMoved = true;
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

        // on indique qu'on a appuyé sur une touche pour supprimer le message de tuto
        hasMoved = true;
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

    // innerWidth = taille écran disponible
    // on divise par 2 pour avoir le milieu
    // on retire le rayon du halo pour être au centre du cercle de 120 ou 200px
    // on ajoute les coordonnées de agathe qui varient de 0 à 800
    // on retire 400 pour avoir une donnée entre -400 et +400 par rapport au centre
    hole.style.left = window.innerWidth/2 - holeRadius + (agathe.x - 400) + "px";
    hole.style.top = agathe.y - holeDiffHeight + "px";


    // on masque le message de tuto si on bouge
    if (hasMoved) tutoDeplacement.style.visibility = "hidden";
}



function collectLamp(agathe, lamp) {

    // suppression de la lampe
    lamp.disableBody(true, true);

    // changement taille cercle de lampe
    holeRadius = 100;
    holeDiffHeight = 25;
    hole.style.width = "200px";
    hole.style.height = "200px";
}
