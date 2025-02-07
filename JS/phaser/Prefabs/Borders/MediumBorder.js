import Border from "./Border.js";

export default class MediumBorder extends Border {

    // readonly
    static spriteName = "medium-border";

    constructor(scene, x, y) {
        Border.spriteName = MediumBorder.spriteName
        super(scene, x, y);
    }

    static preloadSprite(scene) {
        scene.load.image(MediumBorder.spriteName, "../../../../img/sprites/borders/medium-border.png"); // border-2
    }
}
