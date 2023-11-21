function loadImages(scene)
{
    // chargement sprites agathe
    scene.load.spritesheet("agathe", "../../img/assets/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    scene.load.image("blood1", "../../img/assets/blood-1.png");
    scene.load.image("blood0", "../../img/assets/blood-0.png");

    scene.load.image('tiles', '../../../img/TileMaps/MurEtSol32x32.png')
    scene.load.tilemapTiledJSON('tilemap', '../../img/TileMaps/game.json')

    scene.load.image("ground", "../../img/TileMaps/ground.png");
}
