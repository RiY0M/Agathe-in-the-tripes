// configuration de la taille de l'écran, du type de jeu et des fonctions par défaut
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#d57e5b",
    physics: { default: 'arcade' },
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
    hole = document.querySelector(".hole");
    loadImages(this);
}

function create(){
    //* MAP *//
    labyrinthe(this);

    //* TACHES DE SANG *//
    //tacheDeSang(this);

    //~ SPRITE AGATHE ~//
    createAgathe(this);    

    //! COLLISIONS !//
    this.physics.add.collider(agathe, walls);

    // Permet à Agathe de marcher sur le sol sans collision
    this.physics.add.collider(agathe, sol, null, null, this);
    
    //! DETECTION DU CLAVIER !//
    cursors = this.input.keyboard.createCursorKeys();


    //^ ANIMATIONS AGATHE (SPRITES) ^//

    //? MOVING ANIMS ?//
    createAnims(this);
    
    //? AFK ANIMS ?//
    createAFK(this);   
    
    //? Caméra ?//
    this.cameras.main.setBounds(0, 0, 1600, 1600);
    this.cameras.main.startFollow(agathe, true, 0.5, 0.5);
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
        //console.log("x : ",agathe.x, "y :",agathe.y);
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

    // innerWidth = taille écran disponible
    // on divise par 2 pour avoir le milieu
    // on retire le rayon du halo pour être au centre du cercle de 120 ou 200px
    // on ajoute les coordonnées de agathe qui varient de 0 à 800
    // on retire 400 pour avoir une donnée entre -400 et +400 par rapport au centre
    holeRadius = 100;
    holeDiffHeight = 25;
    hole.style.width = "300px";
    hole.style.height = "300px";
    hole.style.left = window.innerWidth/2 - holeRadius + (agathe.x - 400) + "px";
    hole.style.top = agathe.y - holeDiffHeight + "px";
}

