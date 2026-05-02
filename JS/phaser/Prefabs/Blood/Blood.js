export default class Blood extends Phaser.Physics.Arcade.Sprite {

    // readonly
    static spriteName = "";

    constructor(scene, x, y) {
        super(scene, x, y, Blood.spriteName);

        scene.add.existing(this);
    }

    // static preloadSprite(scene, path) {
    //     scene.load.image(Blood.spriteName, path);
    // }
}
