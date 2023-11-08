function loadImages(scene)
{
    // chargement sprites agathe
    scene.load.spritesheet("agathe", "../../img/assets/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });
    scene.load.tilemapTiledJSON("map", "../../img/TileMaps/mapLv4.json");
}
