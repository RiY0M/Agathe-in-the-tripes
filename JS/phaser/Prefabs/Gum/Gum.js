export default class Gum extends Phaser.Physics.Arcade.Sprite {

    // readonly
    static spriteName = "";

    constructor(scene, x, y) {
        super(scene, x, y, Gum.spriteName);

        scene.add.existing(this);
    }

    // static preloadSprite(scene, path) {
    //     scene.load.image(Gum.spriteName, path);
    // }
}
