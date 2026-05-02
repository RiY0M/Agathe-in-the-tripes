export default class Lamp extends Phaser.Physics.Arcade.Sprite {

    // readonly
    static spriteName = "lamp";

    constructor(scene, x, y) {
        super(scene, x, y, Lamp.spriteName);

        scene.add.existing(this);
        scene.physics.world.enable(this);
    }

    static preloadSprite(scene) {
        scene.load.image(Lamp.spriteName, `../../../../img/sprites/items/${Lamp.spriteName}.png`);
    }
}
