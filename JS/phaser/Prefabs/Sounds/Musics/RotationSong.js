import Music from "./Music.js";

export default class RotationSong extends Music {

    // readonly
    static soundName = "rotation-song";

    constructor(scene) {
        Music.soundName = RotationSong.soundName;
        super(scene);
    }

    static preloadSound(scene) {
        scene.load.audio(RotationSong.soundName, `../../../../../sounds/musics/${RotationSong.soundName}.mp3`);
    }
}
