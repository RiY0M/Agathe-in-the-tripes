import Effect from "./Effect.js";

export default class StepsOnSnow extends Effect {

    // readonly
    static soundName = "steps-on-snow";

    constructor(scene) {
        Effect.soundName = StepsOnSnow.soundName;
        super(scene);
    }

    static preloadSound(scene) {
        scene.load.audio(StepsOnSnow.soundName, `../../../../../sounds/effects/${StepsOnSnow.soundName}.mp3`);
    }
}
