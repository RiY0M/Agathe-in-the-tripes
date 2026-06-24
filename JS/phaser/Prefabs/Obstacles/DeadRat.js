export default class DeadRat extends Phaser.Physics.Arcade.Sprite {

    // readonly
    static spriteName = "dead-rat";

    constructor(scene, x, y) {
        super(scene, x, y, DeadRat.spriteName);

        scene.add.existing(this);
        scene.physics.add.existing(this, true);
    }

    static preloadSprite(scene) {
        scene.load.image(DeadRat.spriteName, `../../../../img/sprites/obstacles/${DeadRat.spriteName}.png`);
    }
}
