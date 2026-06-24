export default class MouthTransition extends Phaser.GameObjects.Image {

    // readonly
    static spriteName = "mouth-transition";

    constructor(scene, x, y) {
        super(scene, x, y, MouthTransition.spriteName);

        scene.add.existing(this);
        this.setScale(1.8);
        this.setDepth(-1);
    }

    static preloadSprite(scene) {
        scene.load.image(MouthTransition.spriteName, `../../../img/sprites/${MouthTransition.spriteName}.png`);
    }
}
