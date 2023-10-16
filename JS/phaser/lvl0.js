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

let agathe;         // agathe personnage
let cursors;        // détection clavier


// création fenêtre phaser
let game = new Phaser.Game(config);


function preload()
{
    // chargement sprites agathe
    this.load.spritesheet("agathe", "../../img/assets/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });
}

function create()
{
    // ajout d'agathe à la fenêtre
    agathe = this.physics.add.sprite(400, 300, "agathe");
    // on définit les collisions avec la bordure
    agathe.setCollideWorldBounds(true);

    
    // détection du clavier
    cursors = this.input.keyboard.createCursorKeys();


    // ^ ANIMATIONS AGATHE (SPRITES)

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

    this.anims.create({
        key: "afk",
        frames: [ { key: "agathe", frame: 0 } ],
        frameRate: 20
    });
}

function update()
{
    // ^ ANIMATIONS AGATHE (CLAVIER)

    if (cursors.left.isDown)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityX(-160);
        // animation sprite
        agathe.anims.play("left", true);
    }

    else if (cursors.right.isDown)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityX(160);
        // animation sprite
        agathe.anims.play("right", true);
    }

    else if (cursors.up.isDown)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityY(-160);
        // animation sprite
        agathe.anims.play("up", true);
    }

    else if (cursors.down.isDown)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityY(160);
        // animation sprite
        agathe.anims.play("down", true);
    }

    else
    {
        // si aucune touche du clavier n'est appuyée : on arrête agathe
        agathe.setVelocityX(0);
        agathe.setVelocityY(0);
        agathe.anims.play("afk");
    }
}
