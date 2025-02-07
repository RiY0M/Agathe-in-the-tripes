export default class Tree extends Phaser.Physics.Arcade.Sprite {

    // readonly
    static spriteName = "";

    constructor(scene, x, y) {
        super(scene, x, y, Tree.spriteName);

        scene.add.existing(this);

        this.setDepth(1);
    }

    // static preloadSprite(scene, path) {
    //     scene.load.image(Tree.spriteName, path);
    // }
}
