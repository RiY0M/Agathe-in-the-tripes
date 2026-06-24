import Snowflakes from "./Snowflakes.js";

export default class BlueSnowflakes extends Snowflakes {

    // readonly
    static spriteName = "blue-snowflake";

    constructor(scene) {
        Snowflakes.spriteName = BlueSnowflakes.spriteName
        super(scene);
    }

    static preloadSprite(scene) {
        scene.load.image(BlueSnowflakes.spriteName, `../../../../img/sprites/snowflakes/${BlueSnowflakes.spriteName}.png`);
    }
}
