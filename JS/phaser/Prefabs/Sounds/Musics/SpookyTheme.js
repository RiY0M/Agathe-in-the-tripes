import Music from "./Music.js";

export default class SpookyTheme extends Music {

    // readonly
    static soundName = "spooky-theme";

    constructor(scene) {
        Music.soundName = SpookyTheme.soundName;
        super(scene);
        this.volume -= 0.9;
    }

    static preloadSound(scene) {
        scene.load.audio(SpookyTheme.soundName, `../../../../../sounds/musics/${SpookyTheme.soundName}.mp3`);
    }
}
