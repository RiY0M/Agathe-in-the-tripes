import Cursor from "./Cursor.js";

export default class AzertyLayout extends Cursor {
    constructor(scene) {
        super(scene);
        this.keys = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.Z,
            left: Phaser.Input.Keyboard.KeyCodes.Q,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });
    }
}
