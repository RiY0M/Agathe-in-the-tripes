import DisplayHearts from "../Prefabs/HUDs/displayHearts.js";
import GameOver from "../Prefabs/HUDs/GameOver.js";
import TutoKeys from "../Prefabs/HUDs/TutoKeys.js";
import ForestScene from "./ForestScene.js";

export default class UIScene extends Phaser.Scene {

    static sceneName = "UIScene";

    constructor() {
        super(UIScene.sceneName);
    }

    preload() {
        DisplayHearts.preloadSprite(this);
        GameOver.preloadSprite(this);
        TutoKeys.preloadSprite(this);
    }

    create(data) {
        this.cameras.main.setScroll(0, 0);

        if (data?.sceneName !== ForestScene.sceneName) {
            this.displayHearts = new DisplayHearts(this, data.hitPoints);
            this.gameOver = new GameOver(data.scene);
        }

        if (data?.sceneName === ForestScene.sceneName) {
            this.tutoKeys = new TutoKeys(this);
        }

        this.events.on('updateHP', (hp) => {
            this?.displayHearts?.updateHearts(hp);
        });

        this.events.on('gameOver', () => {
            this?.gameOver?.display();
        });

        this.events.on('hideTuto', () => {
            this?.tutoKeys?.destroy();
        });
    }
}