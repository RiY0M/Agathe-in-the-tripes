import Snowflakes from "./Snowflakes.js";

export default class WhiteSnowflakes extends Snowflakes {

    // readonly
    static spriteName = "white-snowflake";

    constructor(scene) {
        Snowflakes.spriteName = WhiteSnowflakes.spriteName
        super(scene);
    }

    static preloadSprite(scene) {
        // super(scene, "../../../../img/assets/lvl0/white-snowflake.png");
        scene.load.image(WhiteSnowflakes.spriteName, "../../../../img/sprites/snowflakes/white-snowflake.png");
    }
}
