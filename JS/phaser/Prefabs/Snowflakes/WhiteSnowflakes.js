import Snowflakes from "./Snowflakes.js";

export default class WhiteSnowflakes extends Snowflakes {

    // readonly
    static spriteName = "white-snowflake";

    constructor(scene) {
        Snowflakes.spriteName = WhiteSnowflakes.spriteName
        super(scene);
    }

    static preloadSprite(scene) {
        scene.load.image(WhiteSnowflakes.spriteName, `../../../../img/sprites/snowflakes/${WhiteSnowflakes.spriteName}.png`);
    }
}
