import Snowflakes from "./Snowflakes.js";

export default class BlueSnowflakes extends Snowflakes {

    // readonly
    static spriteName = "blue-snowflake";

    constructor(scene) {
        Snowflakes.spriteName = BlueSnowflakes.spriteName
        super(scene);
    }

    static preloadSprite(scene) {
        // super(scene, "../../../../img/assets/lvl0/blue-snowflake.png");
        scene.load.image(BlueSnowflakes.spriteName, "../../../../img/sprites/snowflakes/blue-snowflake.png");
    }
}
