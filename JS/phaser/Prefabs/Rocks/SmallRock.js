import Rock from "./Rock.js";

export default class SmallRock extends Rock {

    // readonly
    static spriteName = "small-rock";

    constructor(scene, x, y) {
        Rock.spriteName = SmallRock.spriteName
        super(scene, x, y);
    }

    static preloadSprite(scene) {
        scene.load.image(SmallRock.spriteName, "../../../../img/sprites/rocks/small-rock.png");
    }
}
