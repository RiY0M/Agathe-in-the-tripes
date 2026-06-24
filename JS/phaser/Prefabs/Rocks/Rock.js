export default class Rock extends Phaser.Physics.Arcade.Sprite {

    // readonly
    static spriteName = "";

    constructor(scene, x, y) {
        super(scene, x, y, Rock.spriteName);

        scene.add.existing(this);
        scene.physics.add.existing(this, true);
    }

    // static preloadSprite(scene, path) {
    //     scene.load.image(Rock.spriteName, path);
    // }
}
