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

let agathe;         // agathe personnage
let cursors;        // détection clavier
let lastFrame = 8;  // last frame facing afk
let trees;          // sprites arbres
let rocks;          // sprites cailloux
let topBorder;      // bordure du haut
let cave;           // sprite grotte
let background;     // darkness bg


// création fenêtre phaser
let game = new Phaser.Game(config);


function preload()
{
    // chargement sprites agathe
    this.load.spritesheet("agathe", "../../img/assets/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    // chargement sprites arbres
    this.load.image("tree-0", "../../img/assets/tree-0.png");
    this.load.image("tree-1", "../../img/assets/tree-1.png");
    this.load.image("tree-2", "../../img/assets/tree-2.png");
    this.load.image("tree-3", "../../img/assets/tree-3.png");

    // chargement sprites cailloux
    this.load.image("rock-0", "../../img/assets/rock-0.png");
    this.load.image("rock-1", "../../img/assets/rock-1.png");
    this.load.image("rock-2", "../../img/assets/rock-2.png");
    this.load.image("rock-3", "../../img/assets/rock-3.png");

    // chargement bordure du haut
    this.load.image("border-0", "../../img/assets/border-0.png");
    this.load.image("border-1", "../../img/assets/border-1.png");
    this.load.image("border-2", "../../img/assets/border-2.png");

    // chargement de la grotte
    this.load.image("cave", "../../img/assets/cave.png");

    // chargement fond noir
    this.load.image("darkness", "../../img/assets/darkness.png");
}

function create()
{
    //* SPRITE BORDURE DU HAUT *//

    // affichage bordure depuis (0;0)
    topBorder = this.physics.add.staticGroup();
    // bordures permettant d'accéder uniquement à la grotte
    topBorder.create(325, 70, "border-0");
    topBorder.create(800, 70, "border-1");
    topBorder.create(750, 45, "border-2");


    //* SPRITE GROTTE *//

    // affichage grotte en haut à droite
    cave = this.physics.add.staticGroup();
    cave.create(728, 50, "cave");


    //* SPRITES ARBRES HAUT *//

    // groupement d'arbres
    trees = this.physics.add.group();

	for (let i = 0; i < 650; i += 50)
    {
		let x = Phaser.Math.RND.between(0, 50);
        let y = Phaser.Math.RND.between(0, 10);

		trees.create(i + x, 50 + y, "tree-" + Phaser.Math.RND.between(0, 3));
	}

    // arbre cacher gauche grotte
    trees.create(675, 55, "tree-3");


    //* SPRITES CAILLOUX *//

    // groupement de cailloux
    rocks = this.physics.add.staticGroup();

    // grossses pierres
    rocks.create(50, 150, "rock-3");
    rocks.create(75, 350, "rock-3");
    rocks.create(100, 200, "rock-3");
    rocks.create(30, 500, "rock-3");
    rocks.create(270, 500, "rock-3");
    rocks.create(320, 425, "rock-3");
    rocks.create(270, 125, "rock-3");
    rocks.create(430, 290, "rock-3");
    rocks.create(465, 215, "rock-3");
    rocks.create(600, 455, "rock-3");
    rocks.create(740, 400, "rock-3");
    rocks.create(695, 335, "rock-3");
    rocks.create(650, 145, "rock-3");

    // double-pierre
    rocks.create(65, 190, "rock-2");
    rocks.create(115, 370, "rock-2");
    rocks.create(670, 300, "rock-2");
    rocks.create(690, 150, "rock-2");

    // cailloux pointu neige
    rocks.create(230, 110, "rock-0");
    rocks.create(115, 440, "rock-0");
    rocks.create(430, 195, "rock-0");
    rocks.create(285, 235, "rock-0");
    rocks.create(310, 255, "rock-0");
    rocks.create(315, 500, "rock-0");
    rocks.create(785, 95, "rock-0");
    rocks.create(550, 425, "rock-0");

    // petit cailloux
    rocks.create(115, 345, "rock-1");
    rocks.create(285, 275, "rock-1");
    rocks.create(230, 135, "rock-1");
    rocks.create(160, 310, "rock-1");
    rocks.create(400, 415, "rock-1");
    rocks.create(565, 445, "rock-1");
    rocks.create(535, 460, "rock-1");
    rocks.create(775, 115, "rock-1");
    rocks.create(660, 325, "rock-1");
    rocks.create(350, 445, "rock-1");


    //~ SPRITE AGATHE ~//

    // ajout d'agathe à la fenêtre
    agathe = this.physics.add.sprite(10, 300, "agathe")
        .setSize(21, 8)
        .setOffset(5, 40);
    // on définit les collisions avec la bordure
    agathe.setCollideWorldBounds(true);


    //* SPRITES ARBRES MIDDLE *//

    trees.create(310, 190, "tree-" + Phaser.Math.RND.between(0, 3));
    trees.create(105, 290, "tree-" + Phaser.Math.RND.between(0, 3));
    trees.create(575, 390, "tree-" + Phaser.Math.RND.between(0, 3));
    trees.create(725, 320, "tree-" + Phaser.Math.RND.between(0, 3));
    trees.create(350, 385, "tree-" + Phaser.Math.RND.between(0, 3));


    //* SPRITES ARBRES BAS *//

    // groupement d'arbres
    trees = this.physics.add.group();

	for (let i = 0; i < 800; i += 50)
    {
		let x = Phaser.Math.RND.between(0, 50);
        let y = Phaser.Math.RND.between(0, 10);

		trees.create(i + x, 550 + y, "tree-" + Phaser.Math.RND.between(0, 3));
	}


    // collisions
    this.physics.add.collider(agathe, rocks);
    this.physics.add.collider(agathe, topBorder);
    
    // détection du clavier
    cursors = this.input.keyboard.createCursorKeys();



    //^ HALO LUMIERE AGATHE ^//

    background = this.add.sprite(400, 300, "darkness").setAlpha(0.9);
    background.setAlpha(0.3, 0.9, 0.3, 0.9)


    //^ ANIMATIONS AGATHE (SPRITES) ^//

    //? MOVING ?//

    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("agathe", { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("agathe", { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "up",
        frames: this.anims.generateFrameNumbers("agathe", { start: 12, end: 15 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "down",
        frames: this.anims.generateFrameNumbers("agathe", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    //? AFK ?//
    
    // gauche
    this.anims.create({
        key: "afk-4",
        frames: [ { key: "agathe", frame: 4 } ],
        frameRate: 20
    });

    // droite
    this.anims.create({
        key: "afk-8",
        frames: [ { key: "agathe", frame: 8 } ],
        frameRate: 20
    });

    // haut
    this.anims.create({
        key: "afk-12",
        frames: [ { key: "agathe", frame: 12 } ],
        frameRate: 20
    });

    // bas
    this.anims.create({
        key: "afk-0",
        frames: [ { key: "agathe", frame: 0 } ],
        frameRate: 20
    });
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
            // changement map
            window.alert("Dans la grotte !");
        }
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
}
