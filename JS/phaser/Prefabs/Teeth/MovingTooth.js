import MovingGum from "../Gum/MovingGum.js";
import TeethMoving from "../Sounds/Effects/TeethMoving.js";
import Tooth from "./Tooth.js";

export default class MovingTooth extends Tooth {

    // readonly
    static spriteName = "moving-tooth";
    isMovingToothUp = true;

    constructor(scene, x, y) {
        Tooth.spriteName = `${MovingTooth.spriteName}-up`;
        super(scene, x, y);
        this.changeTextureFromState();

        this.setScale(0.7);
        this.movingGum = new MovingGum(scene, x + 1, y + 7).setDepth(-1);
        scene.sound.add(TeethMoving.soundName);
        scene.sound.volume -= 0.3;
    }

    changeTextureFromState() {
        const texture = `${MovingTooth.spriteName}-${this.isMovingToothUp ? "up" : "down"}`;
        this.setTexture(texture);
    }

    onAgatheCollide(agathe, callback) {
        if (this.isMovingToothUp) {
            this.scene.collideTeeth(agathe); // spaghetti
        }
    }

    update(retractingTeethTickLoop, time, offset = 0) {
        if (retractingTeethTickLoop % time == offset) {
            this.isMovingToothUp = !this.isMovingToothUp;
            
            this.body.checkCollision = {
                down: this.isMovingToothUp,
                left: this.isMovingToothUp,
                none: false,
                right: this.isMovingToothUp,
                up: this.isMovingToothUp
            };
            this.changeTextureFromState();
            // this.scene.sound.play();
        }
    }

    static preloadSprite(scene) {
        scene.load.image(`${MovingTooth.spriteName}-up`, `../../../../img/sprites/teeth/${MovingTooth.spriteName}-up.png`);
        scene.load.image(`${MovingTooth.spriteName}-down`, `../../../../img/sprites/teeth/${MovingTooth.spriteName}-down.png`);
        MovingGum.preloadSprite(scene);
        TeethMoving.preloadSound(scene);
    }
}
