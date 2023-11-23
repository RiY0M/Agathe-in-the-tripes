function loadImages(scene)
{
    // chargement sprites agathe
    scene.load.spritesheet("agathe", "../../../img/assets/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    // bordures du canvas
    scene.load.image("horizontalBorder", "../../../img/assets/horizontal-border.png");
    scene.load.image("verticalBorder", "../../../img/assets/vertical-border.png");
}