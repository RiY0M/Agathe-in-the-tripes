// configuration de la taille de l'écran, du type de jeu et des fonctions par défaut
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#FFFFFF",
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
    // this.load.audio('theme', '../../sound/Undertale.mp3');
    //$ ELEMENTS HTML $//
    hole = document.querySelector(".hole");
    tutoDeplacement = document.querySelector("#tuto-deplacement");

    // chargement de tous les sprites
    loadImages(this);
}

function create()
{
    music = this.sound.add("theme");
    music.play();

    //* SPRITE BORDURE DU HAUT *//
    createTopBorder(this);


    //* SPRITE GROTTE *//
    createCave(this);


    //* SPRITES ARBRES HAUT *//
    createTopTrees(this);


    //* SPRITE LAMPE *//
    createLamp(this);


    //* SPRITES CAILLOUX *//
    createRocks(this);    


    //~ SPRITE AGATHE ~//
    createAgathe(this);    


    //* SPRITES ARBRES MIDDLE *//
    createMiddleTrees();    


    //* SPRITES ARBRES BAS *//
    createBottomTrees();    


    //* PARTICULES DE NEIGE *//
    createWhiteParticles(this); // BLANCHES
    createBlueParticles(this);  // BLEUES
    


    //! COLLISIONS !//
    this.physics.add.collider(agathe, rocks);
    this.physics.add.collider(agathe, topBorder);

    //! ACTION RECUP LAMPE !//
    this.physics.add.overlap(agathe, lamp, collectLamp, null, this);

    
    //! DETECTION DU CLAVIER !//
    cursors = this.input.keyboard.createCursorKeys();


    //^ ANIMATIONS AGATHE (SPRITES) ^//

    //? MOVING ANIMS ?//
    createAnims(this);
    
    //? AFK ANIMS ?//
    createAFK(this);

    // afficheInitialHearts(cookies.hpRemain);
}

function update()
{
    //^ ANIMATIONS AGATHE (CLAVIER) ^//
    tab = createMove(agathe, cursors, lastFrame);
    lastFrame = tab[0];
    hasMoved = tab[1];

    // innerWidth = taille écran disponible
    // on divise par 2 pour avoir le milieu
    // on retire le rayon du halo pour être au centre du cercle de 120 ou 200px
    // on ajoute les coordonnées de agathe qui varient de 0 à 800
    // on retire 400 pour avoir une donnée entre -400 et +400 par rapport au centre
    hole.style.left = window.innerWidth/2 - holeRadius + (agathe.x - 400) + "px";
    hole.style.top = agathe.y - holeDiffHeight + "px";


    // on masque le message de tuto si on bouge
    if (hasMoved) tutoDeplacement.style.visibility = "hidden";

    if (agathe.y <= 64) {
        // changement map
        changeLvl(idCurrentLvl, idNextLvl, startTime);
    }
}



function collectLamp(agathe, lamp) {

    // suppression de la lampe
    lamp.disableBody(true, true);

    // changement taille cercle de lampe
    holeRadius = 100;
    holeDiffHeight = 25;
    hole.style.width = "200px";
    hole.style.height = "200px";
}
