export default class LoadingBar extends Phaser.GameObjects.Graphics {

    // readonly
    static spriteName = "loading-bar";
    progress = 0; // 0 to 1 (percentage)
    bgColor = 0x2d2d2d;  // Background color
    fillColor = 0x2dff2d; // Fill color

    constructor(scene, x, y, width, height, options = {}) {
        super(scene, options);

        scene.add.existing(this);

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.drawBackground();
        this.setDepth(-1);
        this.filledBar = scene.add.graphics();
    }

    drawBackground() {
        this.fillStyle(this.bgColor);
        this.fillRect(0, 0, this.width, this.height);
    }

    updateProgress(newProgress) {
        this.progress = Phaser.Math.Clamp(newProgress, 0, 1);

        // Instead of clearing everything, just redraw the filled portion
        this.filledBar.clear();
        this.filledBar.fillStyle(this.fillColor);
        this.filledBar.fillRect(this.x +5, this.y +5, (this.width -10) * this.progress, this.height -10);
    }
}
