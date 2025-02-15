// abstract
export default class Cursor {
    constructor(scene) {

        this.cursors = scene.input.keyboard.createCursorKeys();
        this.keys = scene.input.keyboard.addKeys({
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            enter: Phaser.Input.Keyboard.KeyCodes.ENTER
        });
    }

    isUpPressed() {
        return this.cursors.up.isDown || this.keys.up.isDown;
    }

    isDownPressed() {
        return this.cursors.down.isDown || this.keys.down.isDown;
    }

    isLeftPressed() {
        return this.cursors.left.isDown || this.keys.left.isDown;
    }

    isRightPressed() {
        return this.cursors.right.isDown || this.keys.right.isDown;
    }

    isEnterPressed() {
        return this.keys.enter.isDown;
    }

    isSpacePressed() {
        return this.keys.space.isDown;
    }
}
