function loadImages(scene){
    // chargement sprites agathe
    scene.load.spritesheet("agathe", "../../img/assets/common/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    // chargement sprite boss
    scene.load.image("boss", "../../img/assets/lvl7/worm.png");

    // chargement sprite petits vers
    scene.load.spritesheet("little-worms", "../../img/assets/lvl7/little-worms.png", { frameWidth: 32, frameHeight: 32 });

    // chargement sprites vomitball
    scene.load.spritesheet("vomitball", "../../img/assets/lvl7/vomitball.png", { frameWidth: 100, frameHeight: 42 });

    //chargement du theme
    scene.load.audio('theme', '../../sound/lvl7/lvl7.mp3');
    
    // invisible road
    scene.load.image("road", "../../img/assets/lvl7/road.png");

    // dégât
    scene.load.audio('damage', "../../sound/common/damage.mp3");

    // chargement front-map
    scene.load.image("front-map", "../../img/assets/lvl7/front-map.png");
    scene.load.image("front-map-back", "../../img/assets/lvl7/front-map-back.png");
    scene.load.image("front-map-front", "../../img/assets/lvl7/front-map-front.png");

    // chargement back-map
    scene.load.image("back-map", "../../img/assets/lvl7/back-map.png");
}