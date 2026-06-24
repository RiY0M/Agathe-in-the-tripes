import Sound from "../Sound.js";

// abstract
export default class Music extends Sound {

    static soundName = "music";

    constructor(scene) {
        Sound.soundName = Music.soundName;
        super(scene);
        this.setLoop(true);
        this.play();
    }

    // static preloadSound(scene) {
    //     scene.load.audio(Music.soundName, `../../../../../sounds/musics/${Music.soundName}.mp3`);
    // }
}
