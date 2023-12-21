function loadImages(scene){
    // chargement sprites agathe
    scene.load.spritesheet("agathe", "../../../img/assets/common/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    scene.load.image('tiles', '../../img/TileMapsLv3/platforme.png')
    scene.load.tilemapTiledJSON('tilemap', '../../img/TileMapsLv3/game.json')

    scene.load.image("platforms", "../../img/TileMapsLv3/platforme.png");

    //chargement du theme
    scene.load.audio('theme', '../../sound/lvl3.mp3');
}