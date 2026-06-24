export default class Light extends Phaser.GameObjects.Graphics {

    static spriteName = "light";
    fillColor = 0xffffff;
    depth = 100;
    mask;

    constructor(scene, x, y) {
        super(scene);

        this.setPosition(x, y);
        this.createMask(scene);
        scene.add.existing(true);
    }

    // abstract
    // drawLight()

    createMask(scene) {
        this.mask = new Phaser.Display.Masks.BitmapMask(scene, this);
        this.mask.invertAlpha = true;
    }
}
