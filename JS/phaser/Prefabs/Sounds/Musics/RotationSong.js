import Sound from "../Sound.js";

export default class RotationSong extends Sound {

    // readonly
    static soundName = "rotation-song";

    constructor(scene) {
        super(scene, RotationSong.soundName);
    }

    static preloadSound(scene) {
        scene.load.audio(RotationSong.soundName, '../../../../../sounds/musics/rotation-song.mp3');
    }
}
