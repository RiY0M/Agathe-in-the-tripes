import Scene from "./Scene.js";
import TransitionAgathe from "../Prefabs/Agathe/TransitionAgathe.js";
import MouthTransition from "../Prefabs/MouthTransition.js";
import LoadingBar from "../Prefabs/LoadingBar.js";
import RotationSong from "../Prefabs/Sounds/Musics/RotationSong.js";
import MouthScene from "./MouthScene.js";

export default class TransitionScene extends Scene {

    static sceneName = "TransitionScene";
    nextSceneName = MouthScene.sceneName;
    agathe;
    music;
    mouthTransition;
    LoadingBarX = 64;
    sizeLoading; // Get the game width, not available in constructor
    loadingSpeed = 0.002;

    constructor() {
        super(TransitionScene.sceneName);
    }

    preload() {
        TransitionAgathe.preloadSprite(this);
        MouthTransition.preloadSprite(this);
        RotationSong.preloadSound(this);
    }

    create() {
        this.cameras.main.setBackgroundColor("#241F21");
        this.sizeLoading = this.sys.game.config.width -(this.LoadingBarX *2);

        this.agathe = new TransitionAgathe(this, 400, 300);
        this.mouthTransition = new MouthTransition(this, 410, 295);
        this.loading = new LoadingBar(this, 64, 64, this.sizeLoading, 50);

        this.agathe.anims.play("rotate");

        this.music = new RotationSong(this);
    }

    update() {
        if (this.loadingSpeed < 1) {
            this.loadingSpeed += 0.0035;
        } else {
            this.agathe.anims.play("afk-down");
            this.switchScenes();            
        }
        this.loading.updateProgress(this.loadingSpeed);
    }
}
