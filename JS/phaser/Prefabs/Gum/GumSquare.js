import Gum from "./Gum.js";

export default class GumSquare extends Gum {

    // readonly
    static spriteName = "gum-square";

    constructor(scene, x, y) {
        Gum.spriteName = GumSquare.spriteName;
        super(scene, x, y);
    }

    static preloadSprite(scene) {
        scene.load.image(GumSquare.spriteName, `../../../../img/sprites/gums/${GumSquare.spriteName}.png`);
    }
}
