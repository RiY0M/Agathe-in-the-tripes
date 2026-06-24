import Effect from "./Effect.js";

export default class TeethMoving extends Effect {

    // readonly
    static soundName = "teeth-moving";

    constructor(scene) {
        super(scene);
        this.setVolume(.3);
    }

    static preloadSound(scene) {
        scene.load.audio(TeethMoving.soundName, `../../../../../sounds/effects/${TeethMoving.soundName}.mp3`);
    }
}
