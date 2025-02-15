import ForestScene from "./Scenes/ForestScene.js";
import TransitionScene from "./Scenes/TransitionScene.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#FFFFFF",
    physics: { default: 'arcade' },
    scene: [
        ForestScene,
        TransitionScene,
        // MouthScene,
        // EsophagusScene,
        // StomachScene,
        // IntestineScene,
        // AnusScene,
        // OutsideScene,
        // BossScene,
    ]
};

const game = new Phaser.Game(config);
