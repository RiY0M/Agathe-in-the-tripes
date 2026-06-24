export default class Heart extends Phaser.Physics.Arcade.Sprite {

    // readonly
    static spriteName = "heart";

    constructor(scene, x, y) {
        super(scene, x, y, Heart.spriteName);

        scene.add.existing(this);
        scene.physics.world.enable(this);
    }

    static preloadSprite(scene) {
        scene.load.image(Heart.spriteName, `../../../../img/sprites/items/${Heart.spriteName}.png`);
    }
}
