import HUD from "./HUD.js";

export default class Button extends HUD {
    constructor(scene, x, y, width, height, label, callback) {
        super(scene, x, y);

        const backgroundColor = 0x222222;
        const hoverColor = '#950202';

        // const background = scene.add.rectangle(0, 0, width, height, backgroundColor);
        const text = scene.add.text(0, 0, label, this.textConfig).setOrigin(.5).setDepth(100);

        this.add([text]);


        text.setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                if (callback) callback();
                scene.tweens.add({
                    targets: this,
                    scale: 0.95,
                    duration: 50,
                    yoyo: true
                });
            })
            .on('pointerover', () => {
                text.setColor(hoverColor);
            })
            .on('pointerout', () => {
                text.setColor(this.textConfig.color);
            });
    }
}
