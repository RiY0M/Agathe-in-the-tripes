import HUD from "./HUD.js";
import Button from "./Button.js";
import DarkOverlay from "../Lighting/DarkOverlay.js";
import { gameHeight, gameWidth } from "../../constants.js";

export default class GameOver extends HUD {

    static hudName = "game-over";

    constructor(scene, x = gameWidth / 2, y = gameHeight / 2) {
        HUD.hudName = GameOver.hudName;

        super(scene, x, y);

        this.setVisible(false);
        const darkOverlay = new DarkOverlay(scene, null, -x, -y).setDepth(0);
        const retryButton = new Button(
            this.scene, 0, 50, 200, 60, "Recommencer",
            () => this.hide()
        );

        const quitButton = new Button(
            this.scene, 0, 100, 200, 60, "Quitter",
            () => window.location.replace("../../../../HTML/index.html")
        );

        const gameOverImage = scene.add.image(0, -100, GameOver.hudName).setScale(0.75);
        const elements = [darkOverlay, retryButton, gameOverImage, quitButton];

        this.add(elements);
    }

    display() {
        this.setVisible(true);
        // this.scene.physics.pause();
    }

    hide() {
        this.setVisible(false);
        // this.scene.physics.resume();
        this.scene.scene.restart();
    }

    static preloadSprite(scene) {
        scene.load.image(GameOver.hudName, `../../../../img/sprites/huds/${GameOver.hudName}.png`);
    }
}
