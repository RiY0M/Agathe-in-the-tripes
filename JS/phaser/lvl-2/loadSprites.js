"use strict";

function loadImages(scene)
{
    // chargement sprites agathe
    scene.load.spritesheet("agathe", "../../../img/assets/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    // chargement de la map
    for(let i = 1; i <= loopLvl2; i++) {
        scene.load.image("map"+i, "../../../img/assets/tilemap-lvl2.png");
    }

    // chargement sprites cailloux
    scene.load.image("log", "../../../img/assets/log.png");
    scene.load.image("meatball", "../../../img/assets/meatball.png");
    scene.load.image("vomit", "../../../img/assets/vomit.png");
    scene.load.image("blob", "../../../img/assets/blob.png");
    scene.load.image("house", "../../../img/assets/house.png");

    // chargement bordure du haut
    scene.load.image("border-0", "../../../img/assets/border-0.png");

    // chargement bordure de fin de niveau
    scene.load.image("border-1", "../../../img/assets/border-1.png");
}