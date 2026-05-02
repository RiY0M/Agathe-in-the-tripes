import Blood from "./Blood.js";

export default class BloodSplat extends Blood {

    // readonly
    static spriteName = "blood-splat";

    constructor(scene, x, y) {
        Blood.spriteName = BloodSplat.spriteName
        super(scene, x, y);
    }

    static preloadSprite(scene) {
        scene.load.image(BloodSplat.spriteName, `../../../../img/sprites/blood/${BloodSplat.spriteName}.png`);
    }
}
