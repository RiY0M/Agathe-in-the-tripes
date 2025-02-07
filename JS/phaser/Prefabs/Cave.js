export default class Cave extends Phaser.GameObjects.Sprite {

    // readonly
    static spriteName = "cave";

    constructor(scene, x, y) {
        super(scene, x, y, Cave.spriteName);

        scene.add.existing(this);
        scene.physics.world.enable(this);
    }

    static preloadSprite(scene) {
        scene.load.image(Cave.spriteName, "../../../img/sprites/cave.png");
    }
}
