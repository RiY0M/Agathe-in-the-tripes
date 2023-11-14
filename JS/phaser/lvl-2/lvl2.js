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


    //~ SPRITE AGATHE ~//
    createAgathe(this);


    //! COLLISIONS !//
    this.physics.add.collider(agathe, rocks, hitRock, null, this);
    this.physics.add.collider(agathe, borders);
    this.physics.add.collider(agathe, finNiv, reachEnd, null, this);

    
    //! DETECTION DU CLAVIER !//
    cursors = this.input.keyboard.createCursorKeys();


    //^ ANIMATIONS AGATHE (SPRITES) ^//

    //? MOVING ANIMS ?//
    createAnims(this);
}

function update()
{
    // animation sprite
    agathe.anims.play("right", true);

    backgrounds.forEach(background => background.x -= this.scrollSpeed);
    rocks.getChildren().forEach(rock => {
        rock.x -= this.scrollSpeed;
        // Update the hitbox position
        rock.refreshBody();
    });

    //^ MOUVEMENTS AGATHE (CLAVIER) ^//
    /* GAUCHE */
    if (cursors.left.isDown)
    {
        // vitesse et direction du déplacement
        // agathe.setVelocityX(-160);
        this.scrollSpeed = 5;
    }

    /* DROITE */
    if (cursors.right.isDown)
    {
        // vitesse et direction du déplacement
        // agathe.setVelocityX(160);
        this.scrollSpeed = 8;
    }

    /* HAUT */
    if (cursors.up.isDown)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityY(-160);
    }

    /* BAS */
    if (cursors.down.isDown)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityY(160);
    }

    /* AFK */
    if (cursors.down.isUp && cursors.up.isUp)
    {
        // si aucune touche du clavier n'est appuyée : on arrête agathe
        agathe.setVelocityY(0);
    }

    /* AFK */
    if (cursors.left.isUp && cursors.right.isUp)
    {
        // si aucune touche du clavier n'est appuyée : on arrête agathe
        // agathe.setVelocityX(0);
        this.scrollSpeed = 6;
    }
}

function hitRock(character, rock) {
    // This function will be called when the character collides with a rock
    // Add your code to handle the collision here
    console.log('Character hit a rock!');
    alert('Bahaha T null ! (git gud + cringe + ratio)');
    // You can also apply actions like damage or game over logic here
}

function reachEnd(character, end) {
    //^ Si Agathe termine le niveau ^//
    // changement map
    // window.alert("Dans l'estomac !");
    window.location.replace("./lvl3.html");
}