function loadImages(scene)
{
    // chargement sprites agathe
    scene.load.spritesheet("agathe", "../../img/assets/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    scene.load.image("ground", "../../img/TileMaps/ground.png");
    scene.load.image("borderTopBottm", "../../img/TileMaps/borderTopBottom.png");
}
