import Rock from "./Rock.js";

export default class MediumRock extends Rock {

    // readonly
    static spriteName = "medium-rock";

    constructor(scene, x, y) {
        Rock.spriteName = MediumRock.spriteName
        super(scene, x, y);
    }

    static preloadSprite(scene) {
        scene.load.image(MediumRock.spriteName, `../../../../img/sprites/rocks/${MediumRock.spriteName}.png`);
    }
}
