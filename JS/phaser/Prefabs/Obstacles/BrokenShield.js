export default class BrokenShield extends Phaser.Physics.Arcade.Sprite {

    // readonly
    static spriteName = "broken-shield";

    constructor(scene, x, y) {
        super(scene, x, y, BrokenShield.spriteName);

        scene.add.existing(this);
        scene.physics.add.existing(this, true);
    }

    static preloadSprite(scene) {
        scene.load.image(BrokenShield.spriteName, `../../../../img/sprites/obstacles/${BrokenShield.spriteName}.png`);
    }
}
