import Effect from "./Effect.js";

export default class NewHeart extends Effect {

    // readonly
    static soundName = "new-heart";

    constructor(scene) {
        Effect.soundName = NewHeart.soundName;
        super(scene);
    }

    static preloadSound(scene) {
        scene.load.audio(NewHeart.soundName, `../../../../../sounds/effects/${NewHeart.soundName}.mp3`);
    }
}
