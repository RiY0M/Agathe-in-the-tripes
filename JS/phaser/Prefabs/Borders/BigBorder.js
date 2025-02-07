import Border from "./Border.js";

export default class BigBorder extends Border {

    // readonly
    static spriteName = "big-border";

    constructor(scene, x, y) {
        Border.spriteName = BigBorder.spriteName;
        super(scene, x, y);
    }

    static preloadSprite(scene) {
        scene.load.image(BigBorder.spriteName, "../../../../img/sprites/borders/big-border.png"); // border 0
    }
}
