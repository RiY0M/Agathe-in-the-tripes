// abstract
export default class HUD extends Phaser.GameObjects.Container {

    // abstract
    static hudName = "";

    // readonly
    textConfig = { fontSize: "1.5rem", color: "#ffffff", fontFamily: "'Rubik', sans-serif" };
    depth = 1000;

    constructor(scene, x = 0, y = 0, elements = []) {
        super(scene, x, y);
        elements.forEach(element => this.add(element));
        this.createMask(scene);
        scene.add.existing(this);
    }

    setDepth(newDepth) {
        // Do this to not override the initial depth of the children
        this.list.forEach(element => {
            element.depth -= this.depth + newDepth;
        });

        super.setDepth(newDepth);
    }

    add(child) {
        super.add(child);
        child.depth = ((child.depth ?? 0) + this.depth);
    }

    createMask(scene) {
        this.mask = new Phaser.Display.Masks.BitmapMask(scene, this);
    }
}
