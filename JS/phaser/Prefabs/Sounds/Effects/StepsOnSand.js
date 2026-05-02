import Effect from "./Effect.js";

export default class StepsOnSand extends Effect {

    // readonly
    static soundName = "steps-on-sand";

    constructor(scene) {
        Effect.soundName = StepsOnSand.soundName;
        super(scene);
    }

    static preloadSound(scene) {
        scene.load.audio(StepsOnSand.soundName, `../../../../../sounds/effects/${StepsOnSand.soundName}.mp3`);
    }
}
