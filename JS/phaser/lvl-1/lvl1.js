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
    //* Theme de fond *//
    music = this.sound.add("theme");
    music.play();
    
    //$ CHARGEMENT VARIABLES DE SPRITES $//
    loadSpriteVariables(this);

    //~ SPRITES ELTS BOUCHE ~//
    createMouseElts();

    
    //* SPRITE COEUR DU SQUELETTE *//
    createSquelettonHeart(this);

    //* SPRITES CHEMIN DENTS FIXES *//
    createTeethPath();

    //* SPRITES CHEMIN DENTS MOBILES *//
    createMobileTeethPath();

    //* SPRITE MUR DE SANG *//
    createFleshWall();

    //* SPRITES BORDURE DENTS *//
    createBorderTeeth();


    //~ SPRITE AGATHE ~//
    createAgathe(this);


    //! COLLISIONS !//
    this.physics.add.collider(agathe, topBorder);
    this.physics.add.collider(agathe, staticTeeth, collideTeeth);

    // on ajoute la collision uniquement si la dent est vers le haut
    this.physics.add.collider(agathe, movingTeeth1, () => {
        if (isMovingTeeth1Up) collideTeeth();
    });
    // on ajoute la collision uniquement si la dent est vers le haut
    this.physics.add.collider(agathe, movingTeeth2, () => {
        if (isMovingTeeth2Up) collideTeeth();
    });
    // on ajoute la collision uniquement si la dent est vers le haut
    this.physics.add.collider(agathe, movingTeeth3, () => {
        if (isMovingTeeth3Up) collideTeeth();
    });
    // on ajoute la collision uniquement si la dent est vers le haut
    this.physics.add.collider(agathe, movingTeeth4, () => {
        if (isMovingTeeth4Up) collideTeeth();
    });

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
    // on limite la boucle à 1000 frames pour éviter qu'elle surcharge
    if (retractingTeethLoop == 1000) retractingTeethLoop = 0;
    // incrémentation de la boucle
    retractingTeethLoop++;


    //? DENTS N°1 -> 100 frames ?//
    // toute les 100 frames (2s)
    if (retractingTeethLoop % 100 == 0) {
        // on check les dents n°1 du chemin
        movingTeeth1.children.entries.forEach((teeth) => {
            // si elles sont hautes on les descend
            if (isMovingTeeth1Up) {
                // changement texture
                teeth.setTexture("moving-teeth-down");
                // suppression collisions
                teeth.body.checkCollision = {down: false, left: false, none: false, right: false, up: false};
            }
            // si elles sont basses on les monte
            else {
                // changement texture
                teeth.setTexture("moving-teeth-up");
                // suppression collisions
                teeth.body.checkCollision = {down: true, left: true, none: false, right: true, up: true};
            }
        });
        // on inverse le statut haut-bas
        isMovingTeeth1Up = !isMovingTeeth1Up;
    }


    //? DENTS N°2 -> 100 frames delay ?//
    // toute les 100 frames (2s)
    if (retractingTeethLoop % 100 == 50) {
        // on check les dents n°2 du chemin
        movingTeeth3.children.entries.forEach((teeth) => {
            // si elles sont hautes on les descend
            if (isMovingTeeth3Up) {
                // changement texture
                teeth.setTexture("moving-teeth-down");
                // suppression collisions
                teeth.body.checkCollision = {down: false, left: false, none: false, right: false, up: false};
            }
            // si elles sont basses on les monte
            else {
                // changement texture
                teeth.setTexture("moving-teeth-up");
                // suppression collisions
                teeth.body.checkCollision = {down: true, left: true, none: false, right: true, up: true};
            }
        });
        // on inverse le statut haut-bas
        isMovingTeeth3Up = !isMovingTeeth3Up;
    }


    //? DENTS N°3 -> 50 frames ?//
    // toutes les 50 frames (1s)
    if (retractingTeethLoop % 50 == 0) {
        // on check les dents n°3 du chemin
        movingTeeth2.children.entries.forEach((teeth) => {
            // si elles sont hautes on les descend
            if (isMovingTeeth2Up) {
                // changement texture
                teeth.setTexture("moving-teeth-down");
                // suppression collisions
                teeth.body.checkCollision = {down: false, left: false, none: false, right: false, up: false};
            }
            // si elles sont basses on les monte
            else {
                // changement texture
                teeth.setTexture("moving-teeth-up");
                // suppression collisions
                teeth.body.checkCollision = {down: true, left: true, none: false, right: true, up: true};
            }
        });
        // on inverse le statut haut-bas
        isMovingTeeth2Up = !isMovingTeeth2Up;
    }


    //? DENTS N°4 -> ?? frames ?//
    // toutes les ? frames (?s)
    if (retractingTeethLoop % randomDelay == 0) {

        // on check les dents n°4 du chemin
        movingTeeth4.children.entries.forEach((teeth) => {
            // si elles sont hautes on les descend
            if (isMovingTeeth4Up) {
                // changement texture
                teeth.setTexture("moving-teeth-down");
                // suppression collisions
                teeth.body.checkCollision = {down: false, left: false, none: false, right: false, up: false};
            }
            // si elles sont basses on les monte
            else {
                // changement texture
                teeth.setTexture("moving-teeth-up");
                // suppression collisions
                teeth.body.checkCollision = {down: true, left: true, none: false, right: true, up: true};
            }

            // changement valeur aléatoire déclenchement dents n°4 
            randomDelay = Math.floor(Math.random() * (250 - 25 + 1) + 25);
        });
        // on inverse le statut haut-bas
        isMovingTeeth4Up = !isMovingTeeth4Up;
    }


    // boucle en fonction du timer de l'invincibilité allant de 0.0 à 4.9
    let timer = invicibility / 10 % 5;

    // la moitié du temps on passe en rouge
    if ((timer >= 0 && timer <= 1.25) || (timer >= 2.5 && timer <= 3.75)) agathe.setTint(0xFFFFFF);
    else agathe.setTint(0xFF0000);


    // si le lancement de l'invincibilité est lancé
    if (start3sCoolDown) {
        // on lance la décrémentation des 150 frames (150 frames = 3s)
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
        invicibility = 150;
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

        // si agathe rentre dans l'oesophage (y = coordonnées du point d'entrée)
        if (agathe.y <= 15) {
            // changement map
            changeLvl(idCurrentLvl, idNextLvl, startTime);
        }
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
