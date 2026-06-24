export default class Snowflakes extends Phaser.GameObjects.Particles.ParticleEmitterManager {

    static spriteName = "";
    constructor(scene) {
        super(scene, Snowflakes.spriteName);
        scene.add.existing(this);

        this.createEmitter({
            emitZone: {
                source: new Phaser.Geom.Line(0, 0, 800, 0),
                type: "random",
                quantity: 50
            },

            speedX: { min: -20, max: 20 },
            speedY: { min: 40, max: 60 },
            accelerationY: { random: [10, 15] },

            lifespan: { min: 8000, max: 10000 },

            scale: { random: [0.1, 0.5] },

            gravityY: 10,
            frequency: 10,
        });
    }

    // protected
    // static preloadSprite(scene, path) {
    //     scene.load.image(Snowflakes.spriteName, path);
    // }
}
