function loadImages(scene)
{
    // chargement sprites agathe
    scene.load.spritesheet("agathe", "../../../img/assets/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    // chargement squelette mort
    scene.load.image("squeletton", "../../../img/assets/dead-squeletton.png");

    // chargement coeur mort
    scene.load.image("squeletton-heart", "../../../img/assets/squeletton-heart.png");

    // chargement rat mort
    scene.load.image("rat", "../../../img/assets/dead-rat.png");

    // chargement sang
    scene.load.image("blood-0", "../../../img/assets/blood-0.png");
    scene.load.image("blood-1", "../../../img/assets/blood-1.png");

    // bouclier cassé
    scene.load.image("shield", "../../../img/assets/broken-shield.png");

    // épée cassé
    scene.load.image("sword", "../../../img/assets/broken-sword.png");

    // chargement mur de sang
    scene.load.image("flesh-wall", "../../../img/assets/flesh-wall.png");

    // chargement gencive
    scene.load.image("gencive", "../../../img/assets/gum.png");

    // chargement dent
    scene.load.image("tooth", "../../../img/assets/tooth.png");
}