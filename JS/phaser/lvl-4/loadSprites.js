function loadImages(scene)
{
    // chargement sprites agathe
    scene.load.spritesheet("agathe", "../../img/assets/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    scene.load.image("ground", "../../img/TileMaps/ground.png");
    scene.load.image("borderTopBottom", "../../img/TileMaps/borderTopBottom.png");
    scene.load.image("murVerticale", "../../img/TileMaps/murVerticale.png");
    scene.load.image("murHorizontale", "../../img/TileMaps/murHorizontale.png");

    scene.load.image("blood1", "../../img/assets/blood-1.png");
    scene.load.image("blood0", "../../img/assets/blood-0.png");
}