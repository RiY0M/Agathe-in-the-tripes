function loadImages(scene)
{
    // chargement sprites agathe
    scene.load.spritesheet("agathe", "../../../img/assets/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });

    // chargement particules neige
    scene.load.image("white-snowflake", "../../../img/assets/white-snowflake.png");
    scene.load.image("blue-snowflake", "../../../img/assets/blue-snowflake.png");

    // chargement sprites arbres
    scene.load.image("tree-0", "../../../img/assets/tree-0.png");
    scene.load.image("tree-1", "../../../img/assets/tree-1.png");
    scene.load.image("tree-2", "../../../img/assets/tree-2.png");
    scene.load.image("tree-3", "../../../img/assets/tree-3.png");

    // chargement sprites cailloux
    scene.load.image("rock-0", "../../../img/assets/rock-0.png");
    scene.load.image("rock-1", "../../../img/assets/rock-1.png");
    scene.load.image("rock-2", "../../../img/assets/rock-2.png");
    scene.load.image("rock-3", "../../../img/assets/rock-3.png");

    // chargement bordure du haut
    scene.load.image("border-0", "../../../img/assets/border-0.png");
    scene.load.image("border-1", "../../../img/assets/border-1.png");
    scene.load.image("border-2", "../../../img/assets/border-2.png");

    // chargement de la grotte
    scene.load.image("cave", "../../../img/assets/cave.png");

    // chargement de la lampe
    scene.load.image("lampe", "../../../img/assets/lamp.png");
}