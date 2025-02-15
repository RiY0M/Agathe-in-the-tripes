import Sound from "../Sound.js";

// abstract
export default class Effect extends Sound {

    static soundName = "effect";

    constructor(scene) {
        Sound.soundName = Effect.soundName;
        super(scene);
    }

    // static preloadSound(scene) {
    //     scene.load.audio(Effect.soundName, `../../../../../sounds/effects/${Effect.soundName}.mp3`);
    // }
}
