import Effect from "./Effect.js";

export default class Damage extends Effect {

    // readonly
    static soundName = "damage";

    constructor(scene) {
        Effect.soundName = Damage.soundName;
        super(scene);
    }

    static preloadSound(scene) {
        scene.load.audio(Damage.soundName, `../../../../../sounds/effects/${Damage.soundName}.mp3`);
    }
}
