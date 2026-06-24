import { callAPI, createCookiesFromData, getCookie } from "../../createCookiesFromData.js";
import AzertyLayout from "../Prefabs/Cursors/AzertyLayout.js";
import UIScene from "./UIScene.js";

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
        this?.music?.stop();
        this.scene.stop(UIScene.sceneName);

        let hpRemaining = getCookie("hpRemaining");
        let nbDynamite = getCookie("nbDynamite");
        // Appel API
        // await this.sendData(this.idCurrentLvl, this.idNextLvl, time, hpRemaining, nbDynamite);
        this.scene.start(this.nextSceneName);
        this.scene.stop(Scene.sceneName);
    }

    // private
    async sendData(idLevel, idNextLevel, time, hpRemaining = 3, nbDynamite = 0) {

        const json = await callAPI("saveScore", {
            level_id: idNextLevel,
            hpRemaining: hpRemaining,
            nbDynamite: nbDynamite,
        },
        {
            level_id: idLevel,
            next_level_id: idNextLevel,
            complete_time: time,
            hpRemaining: hpRemaining,
            nb_dynamite: nbDynamite,
        });
    
        if (json.status == 'error') {
            console.log(json.message);
        }
        createCookiesFromData(json.data);
    }

    create() {
        const layout = new AzertyLayout(this);
        this.cursors = layout.cursors;
    }
}
