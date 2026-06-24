import { gameHeight, gameWidth } from "../../constants.js";

export default class DarkOverlay extends Phaser.GameObjects.Graphics {

    // readonly
    static spriteName = "dark-overlay";
    fillColor = 0x000000;
    alpha = 0.98;
    depth = 10;

    constructor(
        scene,
        mask = null,
        x = 0,
        y = 0,
        width = gameWidth,
        height = gameHeight
    ) {
        super(scene);

        this.setPosition(x, y);
        this.width = width;
        this.height = height;

        this.drawRectangle();
        if (mask) {
            this.addOverlay(scene, mask);
        }
    }

    drawRectangle() {
        this.clear();
        this.fillStyle(this.fillColor, this.alpha);
        this.fillRect(0, 0, this.width, this.height);

        this.generateTexture(DarkOverlay.spriteName, this.width, this.height);
    }

    addOverlay(scene, mask) {
        this.darkOverlayImage = scene.add.image(0, 0, DarkOverlay.spriteName)
            .setOrigin(0)
            .setDepth(this.depth)
            .setVisible(true)
            .setMask(mask);
    }
}
