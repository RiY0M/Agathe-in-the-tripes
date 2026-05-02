import AzertyLayout from "../Prefabs/Cursors/AzertyLayout.js";

export default class Scene extends Phaser.Scene {

    // public abstract
    static sceneName;
    // protected
    nextSceneName = null;
    // abstract
    idCurrentLvl = 0;
    // abstract
    idNextLvl = 1;
    // protected
    startTime = new Date().getTime(); // Starting time for the chronometer

    constructor(sceneName) {
        super({ key: sceneName });

        if(this.nextSceneName) {
            this.scene.launch(this.nextSceneName);
        }
    }

    // protected
    async switchScenes() {
        const time = (new Date().getTime() - this.startTime) / 1000;
        // if(!hp_remain) hp_remain = getCookie("hpRemain");
        // Appel API
        // await this.sendData(idCurrentLvl, idNextLvl, time, hp_remain, nbDynamite);
        this.scene.start(this.nextSceneName);
        this.scene.stop(Scene.sceneName);  // Optional: stops the previous scene
    }

    // private
    async sendData(idLevel, idNextLevel, time, hp_remain = 3, nbDynamite = 0) {

        const json = await callAPI("saveScore", {
            level_id: idNextLevel,
            hpRemain: hp_remain,
            nbDynamite: nbDynamite,
        },
        {
            level_id: idLevel,
            next_level_id: idNextLevel,
            complete_time: time,
            hp_remain: hp_remain,
            nb_dynamite: nbDynamite,
        });
    
        if (json.status == 'error') {
            console.log(json.message);
        }
        // createCookiesFromData(json.data);
    }

    // preload() {}

    create() {
        const layout = new AzertyLayout(this);
        this.cursors = layout.cursors;
    }

    // update() {}
}
