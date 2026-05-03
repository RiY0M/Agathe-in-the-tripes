import HUD from "./HUD.js";

export default class Button extends HUD {
    constructor(scene, x, y, width, height, label, callback) {
        super(scene, x, y);

        const backgroundColor = 0x222222;
        const hoverColor = 0x444444;

        // const background = scene.add.rectangle(0, 0, width, height, backgroundColor);
        const text = scene.add.text(0, 0, label, this.textConfig);

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
            // .on('pointerover', () => {
            //     background.setFillStyle(hoverColor);
            // })
            // .on('pointerout', () => {
            //     background.setFillStyle(backgroundColor);
            // });
    }
}
