function loadImages(scene)
{
    // chargement sprites agathe
    scene.load.spritesheet("agathe", "../../../img/assets/common/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    // chargement squelette mort
    scene.load.image("squeletton", "../../../img/assets/lvl1/dead-squeletton.png");

    // chargement coeur mort
    scene.load.image("squeletton-heart", "../../../img/assets/lvl1/squeletton-heart.png");

    // chargement rat mort
    scene.load.image("rat", "../../../img/assets/lvl1/dead-rat.png");

    // chargement sang
    scene.load.image("blood-0", "../../../img/assets/common/blood-0.png");
    scene.load.image("blood-1", "../../../img/assets/common/blood-1.png");

    // bouclier cassé
    scene.load.image("shield", "../../../img/assets/lvl1/broken-shield.png");

    // épée cassé
    scene.load.image("sword", "../../../img/assets/lvl1/broken-sword.png");

    // chargement mur de sang
    scene.load.image("flesh-wall", "../../../img/assets/lvl1/flesh-wall.png");

    // chargement gencive
    scene.load.image("gencive", "../../../img/assets/lvl1/gum.png");
    scene.load.image("moving-gum", "../../../img/assets/lvl1/moving-gum.png");

    // chargement dent
    scene.load.image("tooth", "../../../img/assets/lvl1/tooth.png");
    scene.load.image("moving-teeth-up", "../../../img/assets/lvl1/moving-teeth-up.png");
    scene.load.image("moving-teeth-down", "../../../img/assets/lvl1/moving-teeth-down.png");

    // dégât
    scene.load.audio('damage', "../../sound/common/damage.mp3");

    //chargement du theme
    scene.load.audio('theme', '../../sound/lvl1/lvl1.mp3');
    scene.load.audio('teeth', "../../sound/lvl1/teeth.mp3");
}