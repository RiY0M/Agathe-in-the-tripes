import Gum from "./Gum.js";

export default class MovingGum extends Gum {

    // readonly
    static spriteName = "gum-square";

    constructor(scene, x, y) {
        Gum.spriteName = MovingGum.spriteName;
        super(scene, x, y);
    }

    static preloadSprite(scene) {
        scene.load.image(MovingGum.spriteName, `../../../../img/sprites/gums/${MovingGum.spriteName}.png`);
    }
}
