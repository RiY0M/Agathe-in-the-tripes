// import { AUTO, Game } from "phaser";
import { gameHeight, gameWidth } from "./constants.js";
import ForestScene from "./Scenes/ForestScene.js";
import TransitionScene from "./Scenes/TransitionScene.js";
import MouthScene from "./Scenes/MouthScene.js";
import UIScene from "./Scenes/UIScene.js";

const config = {
    type: Phaser.AUTO,
    width: gameWidth,
    height: gameHeight,
    backgroundColor: "#FFFFFF",
    parent: 'game-canvas',
    physics: { default: 'arcade' },
    scene: [
        ForestScene,
        TransitionScene,
        MouthScene,
        // EsophagusScene,
        // StomachScene,
        // IntestineScene,
        // AnusScene,
        // OutsideScene,
        // BossScene,
        UIScene,
    ]
};

const game = new Phaser.Game(config);
