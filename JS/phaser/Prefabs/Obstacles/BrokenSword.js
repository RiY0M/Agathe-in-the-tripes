export default class BrokenSword extends Phaser.Physics.Arcade.Sprite {

    // readonly
    static spriteName = "broken-sword";

    constructor(scene, x, y) {
        super(scene, x, y, BrokenSword.spriteName);

        scene.add.existing(this);
        scene.physics.add.existing(this, true);
    }

    static preloadSprite(scene) {
        scene.load.image(BrokenSword.spriteName, `../../../../img/sprites/obstacles/${BrokenSword.spriteName}.png`);
    }
}
