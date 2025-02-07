import ForestScene from "../Scenes/ForestScene.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#FFFFFF",
    physics: { default: 'arcade' },
    scene: ForestScene
};

const game = new Phaser.Game(config);

