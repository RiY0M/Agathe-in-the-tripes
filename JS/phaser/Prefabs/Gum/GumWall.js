import Gum from "./Gum.js";

export default class GumWall extends Gum {

    // readonly
    static spriteName = "gum-wall";

    constructor(scene, x, y) {
        Gum.spriteName = GumWall.spriteName
        super(scene, x, y);
    }

    static preloadSprite(scene) {
        scene.load.image(GumWall.spriteName, `../../../../img/sprites/gums/${GumWall.spriteName}.png`);
    }
}
