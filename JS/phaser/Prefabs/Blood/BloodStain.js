import Blood from "./Blood.js";

export default class BloodStain extends Blood {

    // readonly
    static spriteName = "blood-stain";

    constructor(scene, x, y) {
        Blood.spriteName = BloodStain.spriteName;
        super(scene, x, y);
    }

    static preloadSprite(scene) {
        scene.load.image(BloodStain.spriteName, `../../../../img/sprites/blood/${BloodStain.spriteName}.png`);
    }
}
