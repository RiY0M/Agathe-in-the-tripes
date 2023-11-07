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

let game = new Phaser.Game(config);