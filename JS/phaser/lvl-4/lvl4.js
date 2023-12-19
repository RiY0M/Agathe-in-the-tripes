// configuration de la taille de l'écran, du type de jeu et des fonctions par défaut
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#e78c93",
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
    hole.style.width = 400 + "px";
    hole.style.height = 400 + "px";
    loadImages(this);
}

function create(){
    //* TACHES DE SANG *//
    tacheDeSang(this);

    //* MAP *//
    labyrinthe(this);

    //~ SPRITE AGATHE ~//
    createAgathe(this);    

    //! COLLISIONS !//
    this.physics.add.collider(agathe, walls);
    
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
    lastFrame = createMove(agathe, cursors, lastFrame);

    if (agathe.x >= 1580) {
        window.location.replace("./lvl5.html");
    }

    // innerWidth = taille écran disponible
    // on divise par 2 pour avoir le milieu
    // on retire le rayon du halo pour être au centre du cercle de 120 ou 200px
    // on ajoute les coordonnées de agathe qui varient de 0 à 800
    // on retire 400 pour avoir une donnée entre -400 et +400 par rapport au centre

    if (agathe.x > 400 && agathe.x < 1200) hole.style.left = window.innerWidth/2 - holeRadius + "px";
    else if (agathe.x <= 400) hole.style.left = window.innerWidth/2 - holeRadius + (agathe.x - 400) + "px";
    else if (agathe.x  >= 1200) hole.style.left = window.innerWidth/2 - holeRadius + (agathe.x - 1200) + "px";

    if (agathe.y > 300 && agathe.y < 1300) hole.style.top = 300 - holeRadius/2 - 48 + "px";
    else if (agathe.y <= 300) hole.style.top = agathe.y - holeRadius/2 - 48 + "px";
    else if (agathe.y >= 1300) hole.style.top = agathe.y - 1000 - holeRadius/2 - 48 + "px";
    
    
}