import HUD from "./HUD.js";

export default class TutoKeys extends HUD {

    static hudName = "tuto-keys";

    constructor(scene, x = scene.sys.game.config.width / 2, y = scene.sys.game.config.height / 2) {
        HUD.hudName = TutoKeys.hudName;

        super(scene, x, y);

        const textLeft = scene.add.text(-200, 0, "Utilisez", this.textConfig);
        const arrows = scene.add.image(-50, 0, TutoKeys.hudName).setScale(0.5);
        const textRight = scene.add.text(10, 0, "pour vous déplacer", this.textConfig);
        const elements = [textLeft, arrows, textRight];

        elements.forEach(element => this.add(element));
    }

    static preloadSprite(scene) {
        scene.load.image(TutoKeys.hudName, `../../../../img/sprites/huds/${TutoKeys.hudName}.png`);
    }
}
