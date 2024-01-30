function loadImages(scene){
    // chargement sprites agathe
    scene.load.spritesheet("agathe", "../../../img/assets/common/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    scene.load.image('tiles', '../../img/assets/TileMapsLvl3/platforme.png')
    scene.load.tilemapTiledJSON('tilemap', '../../img/assets/TileMapsLvl3/game.json')

    scene.load.image("platforms", "../../img/assets/TileMapsLvl3/platforme.png");

    //chargement du theme
    scene.load.audio('theme', '../../sound/lvl3/lvl3.mp3');

    scene.load.image('wall', '../../img/assets/TileMapsLvl3/wall.png')
    scene.load.image("squeletton-heart", "../../img/assets/common/heart.png");
    scene.load.image("blood-1", "../../img/assets/common/blood-1.png");

    // bg
    scene.load.image('background', '../../img/assets/TileMapsLvl3/lvl-3-bg.png');
    scene.load.image('background-reversed', '../../img/assets/TileMapsLvl3/lvl-3-bg-reversed.png');
    scene.load.image('flesh-wall', '../../img/assets/TileMapsLvl3/flesh-wall.png');

    // dégât
    scene.load.audio('damage', '../../sound/common/damage.mp3');
    scene.load.audio('newHeart', "../../sound/common/newHeart.mp3");
}