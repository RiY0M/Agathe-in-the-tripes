import Music from "./Music.js";

export default class TotallyNotSnowy extends Music {

    // readonly
    static soundName = "totally-not-snowy";

    constructor(scene) {
        Music.soundName = TotallyNotSnowy.soundName;
        super(scene);
        this.volume -= 0.9;
    }

    static preloadSound(scene) {
        scene.load.audio(TotallyNotSnowy.soundName, `../../../../../sounds/musics/${TotallyNotSnowy.soundName}.mp3`);
    }
}
