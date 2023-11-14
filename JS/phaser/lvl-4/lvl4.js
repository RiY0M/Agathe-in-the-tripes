// configuration de la taille de l'écran, du type de jeu et des fonctions par défaut
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: { default: 'arcade' },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


//$ CREATION FENETRE PHASER $//
let game = new Phaser.Game(config);


function preload()
{
    //$ ELEMENTS HTML $//
    // hole = document.querySelector(".hole");
    console.log("before preload");
    // chargement de tous les sprites
    loadImages(this);
    this.load.tilemapTiledJSON("map", "../../img/TileMaps/map.json");
    this.load.image("cave", "../../img/TileMaps/cave.png");
    this.load.image("flesh-floor", "../../img/TileMaps/flesh-floor.png");

    console.log("after preload");
}

function create(){
    //~ SPRITE AGATHE ~//
    createAgathe(this);    

    //* MAP *//

    // Configurez les collisions avec les murs
    // setupCollisions(this);

    console.log("in setup collisions");
    const map = this.make.tilemap({ key: "map" });

    console.log("tile map construite");

    const tileset1 = map.addTilesetImage("cave", "../../img/TileMaps/cave.png");
    console.log("ajout tileset 1");

    const tileset2 = map.addTilesetImage("flesh-floor", "../../img/TileMaps/flesh-floor.png");
    console.log("ajout tileset 2");

    const walls = map.createStaticLayer("Murs", tileset1);
    console.log("creation walls");

    const ground = map.createStaticLayer("Sol", tileset2);
    console.log("creation ground");


    //! COLLISIONS !//


    
    //! DETECTION DU CLAVIER !//
    cursors = this.input.keyboard.createCursorKeys();


    //^ ANIMATIONS AGATHE (SPRITES) ^//

    //? MOVING ANIMS ?//
    createAnims(this);
    
    //? AFK ANIMS ?//
    createAFK(this);    
}

function update(){
    //^ ANIMATIONS AGATHE (CLAVIER) ^//

    /* GAUCHE */
    if (cursors.left.isDown && cursors.right.isUp && cursors.up.isUp && cursors.down.isUp)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityX(-160);
        // animation sprite
        agathe.anims.play("left", true);
        // last frame facing afk
        lastFrame = 4;

    }

    /* DROITE */
    else if (cursors.right.isDown && cursors.left.isUp && cursors.up.isUp && cursors.down.isUp)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityX(160);
        // animation sprite
        agathe.anims.play("right", true);
        // last frame facing afk
        lastFrame = 8;

        // on indique qu'on a appuyé sur une touche pour supprimer le message de tuto
        hasMoved = true;
    }

    /* HAUT */
    else if (cursors.up.isDown && cursors.down.isUp && cursors.left.isUp && cursors.right.isUp)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityY(-160);
        // animation sprite
        agathe.anims.play("up", true);
        // last frame facing afk
        lastFrame = 12;
        
        // si agathe rentre dans la grotte (y = coordonnées du point d'entrée)
        // if (agathe.y == 64) {
        //     // changement map
        //     // window.alert("Dans la grotte !");
        //     window.location.replace("./lvl1.html");
        // }

        // on indique qu'on a appuyé sur une touche pour supprimer le message de tuto
        hasMoved = true;
    }

    /* BAS */
    else if (cursors.down.isDown && cursors.up.isUp && cursors.left.isUp && cursors.right.isUp)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityY(160);
        // animation sprite
        agathe.anims.play("down", true);
        // last frame facing afk
        lastFrame = 0;

        // on indique qu'on a appuyé sur une touche pour supprimer le message de tuto
        hasMoved = true;
    }

    /* AFK */
    else
    {
        // si aucune touche du clavier n'est appuyée : on arrête agathe
        agathe.setVelocityX(0);
        agathe.setVelocityY(0);
        // pose du joueur selon la dernière touche (gauche/droite/haut/bas)
        agathe.anims.play("afk-" + lastFrame);
    }

    // innerWidth = taille écran disponible
    // on divise par 2 pour avoir le milieu
    // on retire le rayon du halo pour être au centre du cercle de 120 ou 200px
    // on ajoute les coordonnées de agathe qui varient de 0 à 800
    // on retire 400 pour avoir une donnée entre -400 et +400 par rapport au centre
    // hole.style.left = window.innerWidth/2 - holeRadius + (agathe.x - 400) + "px";
    // hole.style.top = agathe.y - holeDiffHeight + "px";

}

