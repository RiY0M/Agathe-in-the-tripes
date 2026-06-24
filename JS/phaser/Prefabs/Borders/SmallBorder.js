import Border from "./Border.js";

export default class SmallBorder extends Border {

    // readonly
    static spriteName = "small-border";

    constructor(scene, x, y) {
        Border.spriteName = SmallBorder.spriteName
        super(scene, x, y);
    }

    static preloadSprite(scene) {
        scene.load.image(SmallBorder.spriteName, `../../../../img/sprites/borders/${SmallBorder.spriteName}.png`); // border 1
    }
}
