import { frameRate } from "../../constants.js"
import Damage from "../Sounds/Effects/Damage.js";
import NewHeart from "../Sounds/Effects/NewHeart.js";

// type positions = "left" | "right" | "up" | "down";

// abstract class
export default class Agathe extends Phaser.Physics.Arcade.Sprite {

    // readonly
    static spriteName = "agathe";
    // protected
    currentDirection = "right";
    // protected
    isDead = false;
    // protected
    hitPoints;
    // protected
    invincibleTime = 0;
    // protected
    items = {};
    static invincibleTime = frameRate * 3 // time in second
    static maxHp = 3;

    constructor(scene, x, y, hitPoints = Agathe.maxHp, startPosition = "right") {
        super(scene, x, y, Agathe.spriteName);
        this.hitPoints = hitPoints <= Agathe.maxHp ? hitPoints : Agathe.maxHp;
        this.damage = new Damage(scene);
        this.newHeart = new NewHeart(scene);

        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setCollideWorldBounds(true);

        this.setSize(21, 8)
        this.setOffset(5, 40);
        this.setDepth(1);

        this.createAnimations(scene);
        this.anims.play(`afk-${startPosition}`, true);
    }

    // private
    createAnimations(scene) {

        const anims = ["down", "right", "up", "left"];
        let frame = 0;
        for(const anim of anims) {

            // Afk anims
            scene.anims.create({
                key: `afk-${anim}`,
                frames: [ { key: Agathe.spriteName, frame: frame } ],
                frameRate: 20
            });

            // Moving anims
            scene.anims.create({
                key: `move-${anim}`,
                frames: scene.anims.generateFrameNumbers(Agathe.spriteName, { start: frame, end: frame+3 }),
                frameRate: 10,
                repeat: -1
            });

            frame += 4;
        }

        // Transition anims
        scene.anims.create({ 
            key: "rotate",
            frames: scene.anims.generateFrameNumbers(Agathe.spriteName, { start: 0, end: 15 }),
            frameRate: 14, // Ajust speed to your needs
            repeat: -1, // Repeat 3 times
        });
    }

    getItem(item) {
        const itemName = item.texture.key;
        if(!this.items[itemName]) {
            this.items[itemName] = 1;
            return;
        }
        this.items[itemName] += 1;
    }

    getHit(damage) {
        if (this.invincibleTime) {
            return;
        }

        this.damage.play();

        this.hitPoints -= damage;
        if (this.hitPoints <= 0) {
            this.isDead = true;
        }
        this.invincibleTime = Agathe.invincibleTime;
    }

    recover(hitPoints) {
        this.newHeart.play();

        this.hitPoints = this.hitPoints + hitPoints <= Agathe.maxHp ? this.hitPoints + hitPoints : Agathe.maxHp;
    }

    static preloadSprite(scene) {
        scene.load.spritesheet(Agathe.spriteName, "../../../../img/sprites/agathe/agathe-spritesheet.png", { frameWidth: 32, frameHeight: 48 });
        Damage.preloadSound(scene);
        NewHeart.preloadSound(scene);
    }
}
