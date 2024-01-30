function loadImages(scene){
    // chargement sprites agathe
    scene.load.spritesheet("agathe", "../../img/assets/common/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    // chargement sprite boss
    scene.load.image("boss", "../../img/assets/lvl7/worm.png");

    // chargement sprites vomitball
    scene.load.spritesheet("vomitball", "../../img/assets/lvl7/vomitball.png", { frameWidth: 100, frameHeight: 42 });

    //chargement du theme
    scene.load.audio('theme', '../../sound/lvl7/lvl7.mp3');
    
    // invisible road
    scene.load.image("road", "../../img/assets/lvl7/road.png");

    scene.load.spritesheet("boss", "../../img/assets/common/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    // dégât
    scene.load.audio('damage', "../../sound/common/damage.mp3");

    // chargement front-map
    scene.load.image("front-map", "../../img/assets/lvl7/front-map.png");

    // chargement back-map
    scene.load.image("back-map", "../../img/assets/lvl7/back-map.png");
}