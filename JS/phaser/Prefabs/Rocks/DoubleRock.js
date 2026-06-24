import Rock from "./Rock.js";

export default class DoubleRock extends Rock {

    // readonly
    static spriteName = "double-rock";

    constructor(scene, x, y) {
        Rock.spriteName = DoubleRock.spriteName
        super(scene, x, y);
    }

    static preloadSprite(scene) {
        scene.load.image(DoubleRock.spriteName, `../../../../img/sprites/rocks/${DoubleRock.spriteName}.png`);
    }
}
