function loadImages(scene)
{
    // chargement sprites agathe
    scene.load.spritesheet("agathe", "../../img/assets/common/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    // background
    scene.load.image("lvl6-bg", "../../img/assets/lvl6/lvl6-bg.png");  
    
    // invisible road
    scene.load.image("road", "../../img/assets/lvl6/road.png");

    // pont rouge
    scene.load.image("bridge", "../../img/assets/lvl6/bridge.png");

    // coline
    scene.load.image("cliff-1", "../../img/assets/lvl6/cliff-1.png");

    // soleil
    scene.load.image("sun", "../../img/assets/lvl6/sun.png");

    // worm tail
    scene.load.image("worm-tail", "../../img/assets/lvl6/worm-tail.png");

    // home sign
    scene.load.image("sign", "../../img/assets/lvl6/sign.png");

    // heal potion
    scene.load.image("heal", "../../img/assets/lvl6/heal.png");
}