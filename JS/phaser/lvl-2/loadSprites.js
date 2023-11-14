function loadImages(scene)
{
    // chargement sprites agathe
    scene.load.spritesheet("agathe", "../../../img/assets/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    // chargement de la map
    for(let i = 1; i <= loopLvl2; i++) {
        scene.load.image("map"+i, "../../../img/assets/tilemap-lvl-2-wide.png");
    }

    // chargement sprites cailloux
    scene.load.image("rock-0", "../../../img/assets/rock-0.png");
    scene.load.image("rock-1", "../../../img/assets/rock-1.png");
    scene.load.image("rock-2", "../../../img/assets/rock-2.png");
    scene.load.image("rock-3", "../../../img/assets/rock-3.png");

    // chargement bordure du haut
    scene.load.image("border-0", "../../../img/assets/border-0.png");

    // chargement bordure de fin de niveau
    scene.load.image("border-1", "../../../img/assets/border-1.png");
}