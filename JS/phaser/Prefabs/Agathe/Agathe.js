// abstract class
export default class Agathe extends Phaser.Physics.Arcade.Sprite {

    // readonly
    static spriteName = "agathe";
    // protected
    currentDirection = "right";
    // protected
    isDead = false;
    items = {};

    constructor(scene, x, y) {
        super(scene, x, y, Agathe.spriteName);

        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setCollideWorldBounds(true)

        this.setSize(21, 8)
        this.setOffset(5, 40);

        this.createAnimations(scene);
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

    static preloadSprite(scene) {
        scene.load.spritesheet(Agathe.spriteName, "../../../../img/sprites/agathe/agathe-sprite.png", { frameWidth: 32, frameHeight: 48 });
    }
}
