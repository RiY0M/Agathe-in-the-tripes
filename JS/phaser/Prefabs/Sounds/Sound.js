export default class Sound extends Phaser.Sound.WebAudioSound {

    static soundName = "sound";

    constructor(scene) {
        super(scene.sound, Sound.soundName);

        scene.sound.add(Sound.soundName);
        this.setLoop(true);
    }

    // protected
    // static preloadSound(scene, path) {
    //     scene.load.sound(Sound.soundName, path);
    // }
}
