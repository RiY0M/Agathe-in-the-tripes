function loadImages(scene){
    // chargement sprites agathe
    scene.load.spritesheet("agathe", "../../img/assets/common/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    //chargement du theme
    scene.load.audio('theme', '../../sound/lvl7/lvl7.mp3');

    // scene.load.image("lvl6-bg", "../../img/assets/lvl6/lvl6-bg.png");  
    
    // invisible road
    scene.load.image("road", "../../img/assets/lvl7/road.png");

}