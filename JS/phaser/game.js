import ForestScene from "./Scenes/ForestScene.js";

// configuration de la taille de l'écran, du type de jeu et des fonctions par défaut
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#FFFFFF",
    physics: { default: 'arcade' },
    scene: [
        ForestScene,
        // TransitionScene,
        // MouthScene,
        // oesophagusScene,
        // StomachScene,
        // IntestineScene,
        // AnusScene,
        // OutsideScene,
        // BossScene,
    ]
};

const game = new Phaser.Game(config);
