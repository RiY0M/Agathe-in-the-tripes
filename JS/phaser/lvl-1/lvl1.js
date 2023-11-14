// configuration de la taille de l'écran, du type de jeu et des fonctions par défaut
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#d64e45",
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

    //~ SPRITES ELTS BOUCHE ~//
    createMouseElts();


    //* SPRITE COEUR DU SQUELETTE *//
    createSquelettonHeart(this);

    //* SPRITES CHEMIN DENTS *//
    createTeethPath();

    //* SPRITE MUR DE SANG *//
    createFleshWall();

    //* SPRITES BORDURE DENTS *//
    createBorderTeeth();


    //~ SPRITE AGATHE ~//
    createAgathe(this);


    //! COLLISIONS !//
    this.physics.add.collider(agathe, topBorder);
    this.physics.add.collider(agathe, staticTeeth, collideTeeth);
    this.physics.add.collider(agathe, deadThings);

    //! ACTION RECUP LAMPE !//
    this.physics.add.overlap(agathe, squelettonHeart, collectSquelettonHeart, null, this);
    
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
    // boucle en fonction du timer de l'invincibilité allant de 0.0 à 4.9
    let timer = invicibility / 10 % 5;

    // la moitié du temps on passe en rouge
    if ((timer >= 0 && timer <= 1.25) || (timer >= 2.5 && timer <= 3.75)) agathe.setTint(0xFFFFFF);
    else agathe.setTint(0xFF0000);


    // si le lancement de l'invincibilité est lancé
    if (start3sCoolDown) {
        // on lance la décrémentation des 300 frames (300 frames = 3s)
        invicibility--;
        // on rend agathe invincible
        isInvicible = true;
    }

    // si les 3s d'invincibilité sont écoulées
    if (invicibility == 0) {
        // on enlève l'effet d'immortalité à agathe
        isInvicible = false;
        // on arrête le chorno
        start3sCoolDown = false;
        // on réinitialise le compteur de frames
        invicibility = 300;
    }

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


function collideTeeth()
{
    // si agathe n'est pas invincible
    if (!isInvicible)
    {
        // si elle a encore au moins une vie
        if (nbHearts > 0) {
            // on lui en retire une
            nbHearts--;
            reloadNbHearts();
        }

        // lancement des 3s d'invincibilité
        start3sCoolDown = true;
    }
}


function collectSquelettonHeart(agathe, squelettonHeart) {

    // suppression du coeur du squelette
    squelettonHeart.disableBody(true, true);

    // si agathe n'a pas toutes ses vies
    if (nbHearts < 3) {
        // on lui en rajoute une
        nbHearts++;
        reloadNbHearts();
    }
}
