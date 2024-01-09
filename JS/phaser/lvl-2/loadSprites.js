"use strict";

function loadImages(scene)
{
    // chargement sprites agathe
    scene.load.spritesheet("agathe", "../../../img/assets/common/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    // chargement de la map
    for(let i = 1; i <= loopLvl2; i++) {
        scene.load.image("map"+i, "../../../img/assets/lvl2/tilemap-lvl2.png");
    }

    // chargement sprites obstacles
    scene.load.image("log", "../../../img/assets/lvl2/log.png");
    scene.load.image("meatball", "../../../img/assets/lvl2/meatball.png");
    scene.load.image("vomit", "../../../img/assets/lvl2/vomit.png");
    scene.load.image("blob", "../../../img/assets/lvl2/blob.png");
    scene.load.image("house", "../../../img/assets/lvl2/house.png");

    scene.load.image("heart", "../../../img/assets/common/heart.png");
    scene.load.image("dynamite", "../../../img/assets/common/dynamite-stick.png");

    // chargement bordure du haut
    scene.load.image("border-0", "../../../img/assets/common/border-0.png");

    // chargement bordure de fin de niveau
    scene.load.image("border-1", "../../../img/assets/common/border-1.png");

    scene.load.audio('theme', '../../sound/lvl2.mp3');
}