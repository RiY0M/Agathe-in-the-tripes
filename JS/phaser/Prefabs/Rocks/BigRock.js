import Rock from "./Rock.js";

export default class BigRock extends Rock {

    // readonly
    static spriteName = "big-rock";

    constructor(scene, x, y) {
        Rock.spriteName = BigRock.spriteName;
        super(scene, x, y);
    }

    static preloadSprite(scene) {
        scene.load.image(BigRock.spriteName, "../../../../img/sprites/rocks/big-rock.png");
    }
}
