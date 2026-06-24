import { gameWidth } from "../../constants.js";
import Agathe from "../Agathe/Agathe.js";
import HUD from "./HUD.js";

export default class DisplayHearts extends HUD {

    static hudName = "display-hearts";
    static emptyHeartName = "empty-heart";
    static fullHeartName = "full-heart";

    constructor(scene, hpRemaining, maxHp = Agathe.maxHp, x = gameWidth, y = 0) {
        HUD.hudName = DisplayHearts.hudName;

        const heartSpriteSize = 287;
        const heartInitialDistance = 113;
        const scaleHeart = .12;
        
        const heartGap = heartInitialDistance * scaleHeart;
        const heartSpace = heartSpriteSize * scaleHeart;
        const yHeart = y + (heartSpace + heartGap) / 2;
        const xHeart = x -(heartSpace + heartGap) / 2;

        super(scene, xHeart, yHeart);

        this.hearts = [];

        for (let i = 0; i < maxHp; i++) {
            const xHeart = i * -(heartSpace + heartGap / 2);

            const heart = this.scene.add.image(
                xHeart,
                0,
                DisplayHearts.emptyHeartName
            ).setScale(scaleHeart);

            this.add(heart);
            this.hearts.push(heart);
        }

        this.updateHearts(hpRemaining, maxHp);
    }

    updateHearts(hpRemaining, maxHp = Agathe.maxHp) {
        for (let i = 0; i < this.hearts.length; i++) {
            const heart = this.hearts[i];

            if (i < hpRemaining) {
                heart.setTexture(DisplayHearts.fullHeartName);
                heart.setVisible(true);
            } else if (i < maxHp) {
                heart.setTexture(DisplayHearts.emptyHeartName);
                heart.setVisible(true);
            } else {
                // In case maxHp decreases
                heart.setVisible(false);
            }
        }
    }

    static preloadSprite(scene) {
        scene.load.image(DisplayHearts.emptyHeartName, `../../../../img/sprites/huds/${DisplayHearts.emptyHeartName}.png`);
        scene.load.image(DisplayHearts.fullHeartName, `../../../../img/sprites/huds/${DisplayHearts.fullHeartName}.png`);
    }
}
