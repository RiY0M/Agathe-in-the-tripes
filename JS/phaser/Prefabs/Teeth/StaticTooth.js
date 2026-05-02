import Tooth from "./Tooth.js";

export default class StaticTooth extends Tooth {

    // readonly
    static spriteName = "static-tooth";

    constructor(scene, x, y) {
        Tooth.spriteName = StaticTooth.spriteName
        super(scene, x, y);
    }

    static preloadSprite(scene) {
        scene.load.image(StaticTooth.spriteName, `../../../../img/sprites/teeth/${StaticTooth.spriteName}.png`);
    }
}
