import Effect from "./Effect.js";

export default class TeethMoving extends Effect {

    // readonly
    static soundName = "teeth-moving";

    constructor(scene) {
        Effect.soundName = TeethMoving.soundName;
        super(scene);
    }

    static preloadSound(scene) {
        scene.load.audio(TeethMoving.soundName, `../../../../../sounds/effects/${TeethMoving.soundName}.mp3`);
    }
}
