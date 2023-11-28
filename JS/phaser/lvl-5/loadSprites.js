function loadImages(scene)
{
    // chargement sprites agathe
    scene.load.spritesheet("agathe", "../../../img/assets/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    // bordures du canvas
    scene.load.image("horizontalBorder", "../../../img/assets/horizontal-border.png");
    scene.load.image("verticalBorder", "../../../img/assets/vertical-border.png");

    // background
    scene.load.image("lvl5-bg", "../../../img/assets/lvl5-bg.png");

    // vieux sur le caca
    scene.load.image("old-on-poop", "../../../img/assets/old-on-poop.png");

    // caca
    scene.load.image("flat-poop-0", "../../../img/assets/flat-poop-0.png");
    scene.load.image("flat-poop-1", "../../../img/assets/flat-poop-1.png");

    // sang
    scene.load.image("blood-0", "../../../img/assets/blood-0.png");
    scene.load.image("blood-1", "../../../img/assets/blood-1.png");
}