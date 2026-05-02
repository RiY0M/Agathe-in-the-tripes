export default class Border extends Phaser.Physics.Arcade.Sprite {

    // readonly
    static spriteName = "";

    constructor(scene, x, y) {
        super(scene, x, y, Border.spriteName);

        scene.add.existing(this);
        scene.physics.add.existing(this, true);
        this.setAlpha(0);
    }

    // static preloadSprite(scene, path) {
    //     scene.load.image(Border.spriteName, path);
    // }
}
