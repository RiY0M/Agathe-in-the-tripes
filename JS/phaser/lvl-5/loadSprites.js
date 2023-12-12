function loadImages(scene)
{
    // chargement sprites agathe
    scene.load.spritesheet("agathe", "../../../img/assets/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    // bordures du canvas
    scene.load.image("horizontalBorder", "../../../img/assets/horizontal-border.png");
    scene.load.image("verticalBorderLeft", "../../../img/assets/vertical-border-left.png");
    scene.load.image("verticalBorderRight", "../../../img/assets/vertical-border-right.png");

    // background
    scene.load.image("lvl5-bg", "../../../img/assets/lvl5-bg.png");

    // vieux sur le caca
    scene.load.image("old-on-poop", "../../../img/assets/old-on-poop.png");

    // mineur fou
    scene.load.image("angry-minor-pickaxe", "../../../img/assets/angry-minor-pickaxe.png");

    // pierre étrange
    scene.load.image("powder-rock", "../../../img/assets/powder-rock.png");

    // poudre à canon
    scene.load.image("powder", "../../../img/assets/gunpowder.png");

    // caca
    scene.load.image("flat-poop-0", "../../../img/assets/flat-poop-0.png");
    scene.load.image("flat-poop-1", "../../../img/assets/flat-poop-1.png");

    // sang
    scene.load.image("blood-0", "../../../img/assets/blood-0.png");
    scene.load.image("blood-1", "../../../img/assets/blood-1.png");

    // cailloux de sang
    scene.load.image("blood-rock-0", "../../../img/assets/blood-rock-0.png");
    scene.load.image("blood-rock-1", "../../../img/assets/blood-rock-1.png");
    scene.load.image("blood-rock-2", "../../../img/assets/blood-rock-2.png");

    // squelette mort
    scene.load.image("squeleton-sit", "../../../img/assets/dead-squeleton-sit.png");

    // bâton dynamite
    scene.load.image("stick", "../../../img/assets/stick.png");
}