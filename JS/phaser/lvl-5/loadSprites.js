function loadImages(scene)
{
    // chargement sprites agathe
    scene.load.spritesheet("agathe", "../../../img/assets/common/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    // chargement sprites rat
    scene.load.spritesheet("rat", "../../../img/assets/lvl5/rat_sprite.png", { frameWidth: 50, frameHeight: 50 });

    // bordures du canvas
    scene.load.image("horizontalBorder", "../../../img/assets/lvl5/horizontal-border.png");
    scene.load.image("verticalBorderLeft", "../../../img/assets/lvl5/vertical-border-left.png");
    scene.load.image("verticalBorderRight", "../../../img/assets/lvl5/vertical-border-right.png");
    scene.load.image("blackBorders", "../../../img/assets/common/border-0.png");

    // background
    scene.load.image("lvl5-bg", "../../../img/assets/lvl5/lvl5-bg.png");

    // vieux sur le caca
    scene.load.image("old-on-poop", "../../../img/assets/lvl5/old-on-poop.png");

    // mineur fou
    scene.load.image("angry-minor-pickaxe", "../../../img/assets/lvl5/angry-minor-pickaxe.png");
    scene.load.image("angry-minor", "../../../img/assets/lvl5/angry-minor.png");

    // pierre étrange
    scene.load.image("powder-rock", "../../../img/assets/lvl5/powder-rock.png");

    // poudre à canon
    scene.load.image("powder", "../../../img/assets/lvl5/gunpowder.png");

    // caca
    scene.load.image("flat-poop-0", "../../../img/assets/lvl5/flat-poop-0.png");
    scene.load.image("flat-poop-1", "../../../img/assets/lvl5/flat-poop-1.png");
    scene.load.image("flat-poop-2", "../../../img/assets/lvl5/flat-poop-2.png");

    scene.load.image("poop-0", "../../../img/assets/lvl5/poop-0.png");
    scene.load.image("poop-1", "../../../img/assets/lvl5/poop-1.png");
    scene.load.image("poop-2", "../../../img/assets/lvl5/poop-2.png");

    scene.load.image("poop-door", "../../../img/assets/lvl5/poop-door.png");

    // sang
    scene.load.image("blood-0", "../../../img/assets/common/blood-0.png");
    scene.load.image("blood-1", "../../../img/assets/common/blood-1.png");

    // cailloux de sang
    scene.load.image("blood-rock-0", "../../../img/assets/lvl5/blood-rock-0.png");
    scene.load.image("blood-rock-1", "../../../img/assets/lvl5/blood-rock-1.png");
    scene.load.image("blood-rock-2", "../../../img/assets/lvl5/blood-rock-2.png");

    // squelette mort
    scene.load.image("squeleton-sit", "../../../img/assets/lvl5/dead-squeleton-sit.png");
    scene.load.image("bones-pile", "../../../img/assets/lvl5/bones-pile.png");

    // bâton dynamite
    scene.load.image("stick", "../../../img/assets/lvl5/stick.png");
}