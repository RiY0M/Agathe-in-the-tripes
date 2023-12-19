function loadImages(scene){
    // chargement sprites agathe
    scene.load.spritesheet("agathe", "../../img/assets/common/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    scene.load.image("blood1", "../../img/assets/common/blood-1.png");
    scene.load.image("blood0", "../../img/assets/common/blood-0.png");

    scene.load.image('tiles', '../../img/TileMapsLv4/Mur32x32.png')
    scene.load.tilemapTiledJSON('tilemap', '../../img/TileMapsLv4/game.json')

    //chargement du theme
    scene.load.audio('theme', '../../sound/lvl4.mp3');

}