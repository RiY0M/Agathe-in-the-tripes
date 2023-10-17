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
let lastFrame = 0;  // last frame facing afk
let trees;          // sprites arbres
let rocks;          // sprites cailloux
let topBorder;      // bordure du haut


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
    this.load.image("top-border", "../../img/assets/top-border.png");
}

function create()
{
    //* SPRITE BORDURE DU HAUT *//

    // affichage bordure depuis (0;0)
    topBorder = this.physics.add.staticGroup();
    topBorder.create(400, 35, "top-border");


    //* SPRITES ARBRES *//

    // groupement d'arbres
    trees = this.physics.add.group();

	for (let i = 0; i < 800; i += 50)
    {
		let x = Phaser.Math.RND.between(0, 50);
        let y = Phaser.Math.RND.between(0, 10);

		trees.create(i + x, 50 + y, "tree-" + Phaser.Math.RND.between(0, 3));
	}


    //~ SPRITE AGATHE ~//

    // ajout d'agathe à la fenêtre
    agathe = this.physics.add.sprite(400, 300, "agathe");
    // on définit les collisions avec la bordure
    agathe.setCollideWorldBounds(true);


    //* SPRITES ARBRES *//

    // groupement d'arbres
    trees = this.physics.add.group();

	for (let i = 0; i < 800; i += 50)
    {
		let x = Phaser.Math.RND.between(0, 50);
        let y = Phaser.Math.RND.between(0, 10);

		trees.create(i + x, 550 + y, "tree-" + Phaser.Math.RND.between(0, 3));
	}


    //* SPRITES CAILLOUX *//

    // groupement de cailloux
    rocks = this.physics.add.staticGroup();

	for (let i = 0; i < 20; i++)
    {
		let x = Phaser.Math.RND.between(50, 750);
        let y = Phaser.Math.RND.between(100, 500);

		rocks.create(x, y, "rock-" + Phaser.Math.RND.between(0, 3));
	}


    // collisions
    this.physics.add.collider(agathe, rocks);
    this.physics.add.collider(agathe, topBorder);
    
    // détection du clavier
    cursors = this.input.keyboard.createCursorKeys();


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

    if (cursors.left.isDown)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityX(-160);
        // animation sprite
        agathe.anims.play("left", true);
        // last frame facing afk
        lastFrame = 4;
    }

    else if (cursors.right.isDown)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityX(160);
        // animation sprite
        agathe.anims.play("right", true);
        // last frame facing afk
        lastFrame = 8;
    }

    else if (cursors.up.isDown)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityY(-160);
        // animation sprite
        agathe.anims.play("up", true);
        // last frame facing afk
        lastFrame = 12;
    }

    else if (cursors.down.isDown)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityY(160);
        // animation sprite
        agathe.anims.play("down", true);
        // last frame facing afk
        lastFrame = 0;
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
