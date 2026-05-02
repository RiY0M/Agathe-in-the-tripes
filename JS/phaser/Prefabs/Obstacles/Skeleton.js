export default class Skeleton extends Phaser.Physics.Arcade.Sprite {

    // readonly
    static spriteName = "skeleton";

    constructor(scene, x, y) {
        super(scene, x, y, Skeleton.spriteName);

        scene.add.existing(this);
        scene.physics.add.existing(this, true);
    }

    static preloadSprite(scene) {
        scene.load.image(Skeleton.spriteName, `../../../../img/sprites/obstacles/${Skeleton.spriteName}.png`);
    }
}
