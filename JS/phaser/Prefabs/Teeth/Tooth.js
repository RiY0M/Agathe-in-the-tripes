export default class Tooth extends Phaser.Physics.Arcade.Sprite {

    // readonly
    static spriteName = "";

    constructor(scene, x, y) {
        super(scene, x, y, Tooth.spriteName);

        scene.add.existing(this);
        scene.physics.add.existing(this, true);
    }

    // static preloadSprite(scene, path) {
    //     scene.load.image(Tooth.spriteName, path);
    // }
}
