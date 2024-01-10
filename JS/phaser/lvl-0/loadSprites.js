function loadImages(scene)
{
    // chargement sprites agathe
    scene.load.spritesheet("agathe", "../../../img/assets/common/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    // chargement particules neige
    scene.load.image("white-snowflake", "../../../img/assets/lvl0/white-snowflake.png");
    scene.load.image("blue-snowflake", "../../../img/assets/lvl0/blue-snowflake.png");

    // chargement sprites arbres
    scene.load.image("tree-0", "../../../img/assets/lvl0/tree-0.png");
    scene.load.image("tree-1", "../../../img/assets/lvl0/tree-1.png");
    scene.load.image("tree-2", "../../../img/assets/lvl0/tree-2.png");
    scene.load.image("tree-3", "../../../img/assets/lvl0/tree-3.png");

    // chargement sprites cailloux
    scene.load.image("rock-0", "../../../img/assets/lvl0/rock-0.png");
    scene.load.image("rock-1", "../../../img/assets/lvl0/rock-1.png");
    scene.load.image("rock-2", "../../../img/assets/lvl0/rock-2.png");
    scene.load.image("rock-3", "../../../img/assets/lvl0/rock-3.png");

    // chargement bordure du haut
    scene.load.image("border-0", "../../../img/assets/common/border-0.png");
    scene.load.image("border-1", "../../../img/assets/common/border-1.png");
    scene.load.image("border-2", "../../../img/assets/common/border-2.png");

    // chargement de la grotte
    scene.load.image("cave", "../../../img/assets/lvl0/cave.png");

    // chargement de la lampe
    scene.load.image("lampe", "../../../img/assets/lvl0/lamp.png");

    //chargement du theme
    scene.load.audio('theme', '../../sound/lvl0/lvl0.mp3');
}