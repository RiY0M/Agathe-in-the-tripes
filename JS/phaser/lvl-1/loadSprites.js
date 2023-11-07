function loadImages(scene)
{
    // chargement sprites agathe
    scene.load.spritesheet("agathe", "../../../img/assets/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    // chargement mur de sang
    scene.load.image("flesh-wall", "../../../img/assets/flesh-wall.png");

    // chargement dent
    scene.load.image("tooth", "../../../img/assets/tooth.png");
}