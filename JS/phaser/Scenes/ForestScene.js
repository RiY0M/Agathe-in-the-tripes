import Scene from "./Scene.js";
import AgatheTop from "../Prefabs/Agathe/AgatheTop.js";
import WhiteSnowflakes from "../Prefabs/Snowflakes/WhiteSnowflakes.js";
import BlueSnowflakes from "../Prefabs/Snowflakes/BlueSnowflakes.js";
import SmallTree from "../Prefabs/Trees/SmallTree.js";
import SmallSnowyTree from "../Prefabs/Trees/SmallSnowyTree.js";
import BigTree from "../Prefabs/Trees/BigTree.js";
import BigSnowyTree from "../Prefabs/Trees/BigSnowyTree.js";
import SmallRock from "../Prefabs/Rocks/SmallRock.js";
import DoubleRock from "../Prefabs/Rocks/DoubleRock.js";
import MediumRock from "../Prefabs/Rocks/MediumRock.js";
import BigRock from "../Prefabs/Rocks/BigRock.js";
import SmallBorder from "../Prefabs/Borders/SmallBorder.js";
import MediumBorder from "../Prefabs/Borders/MediumBorder.js";
import BigBorder from "../Prefabs/Borders/BigBorder.js";
import Cave from "../Prefabs/Cave.js";
import Lamp from "../Prefabs/Items/Lamp.js";

export default class ForestScene extends Scene {

    nextSceneName = "TransitionScene";
    agathe;                 // agathe personnage
    cursors;                // détection clavier
    lastFrame = 8;          // last frame facing afk
    trees;                  // sprites arbres
    rocks;                  // sprites cailloux
    topBorder;              // bordure du haut
    cave;                   // sprite grotte
    hasLight = false;       // taille halo en fonction lampe ou pas
    lamp;                   // lampe
    hole;                   // halo lumineux
    holeRadius = 60;        // rayon du halo de lumière
    holeDiffHeight = 0;     // décalage du halo si lampe
    isMoving = false;       // booleen verif si affi ou non tuto                  
    tutoDeplacement;        // message tutoriel pour apprendre touches
    idCurrentLvl = 0;      // Id du niveau courant
    idNextLvl = 1;         // Id du prochain niveau
    music;
    steps;
    isWalking = false;

    constructor() {
        super();
    }

    preload() {
        //$ ELEMENTS HTML $//
        this.hole = document.querySelector(".hole");
        this.tutoDeplacement = document.querySelector("#tuto-deplacement");


        AgatheTop.preloadSprite(this);

        WhiteSnowflakes.preloadSprite(this);
        BlueSnowflakes.preloadSprite(this);

        SmallTree.preloadSprite(this);
        SmallSnowyTree.preloadSprite(this);
        BigTree.preloadSprite(this);
        BigSnowyTree.preloadSprite(this);

        SmallRock.preloadSprite(this);
        DoubleRock.preloadSprite(this);
        MediumRock.preloadSprite(this);
        BigRock.preloadSprite(this);

        SmallBorder.preloadSprite(this);
        MediumBorder.preloadSprite(this);
        BigBorder.preloadSprite(this);

        Cave.preloadSprite(this);

        Lamp.preloadSprite(this);

        //chargement du theme
        this.load.audio('theme', '../../sound/lvl0/lvl0.mp3');
        this.load.audio('steps', '../../sound/lvl0/stepsOnSnowBetter.mp3');
    }

    create() {

        this.music = this.sound.add("theme");
        this.music.volume -= 0.9;
        this.music.setLoop(true);
        this.music.play();

        //* SPRITE BORDURE DU HAUT *//
        this.createTopBorder(this);

        //* SPRITE GROTTE *//
        this.cave = new Cave(this, 728, 50);

        //* SPRITES ARBRES *//
        this.createTrees(this);

        //* SPRITE LAMPE *//
        this.lamp = new Lamp(this, 90, 155);

        //* SPRITES CAILLOUX *//
        this.createRocks(this);

        //~ SPRITE AGATHE ~//
        this.agathe = new AgatheTop(this, 10, 300);

        //* PARTICULES DE NEIGE *//
        this.whiteSnowflakes = new WhiteSnowflakes(this);
        this.blueSnowflakes = new BlueSnowflakes(this);

        //! COLLISIONS !//
        this.physics.add.collider(this.agathe, this.rocks);
        this.physics.add.collider(this.agathe, this.topBorder);

        //! ACTION RECUP LAMPE !//
        this.physics.add.overlap(this.agathe, this.lamp, this.collectLamp, null, this);
        
        //! DETECTION DU CLAVIER !//
        this.cursors = this.input.keyboard.createCursorKeys();


        // afficheInitialHearts(cookies.hpRemain);
        this.steps = this.sound.add("steps");
        this.steps.setLoop(true);
    }



    update() {
        this.isMoving = this.agathe.createMove(this.cursors);

        // innerWidth = taille écran disponible
        // on divise par 2 pour avoir le milieu
        // on retire le rayon du halo pour être au centre du cercle de 120 ou 200px
        // on ajoute les coordonnées de agathe qui varient de 0 à 800
        // on retire 400 pour avoir une donnée entre -400 et +400 par rapport au centre
        this.hole.style.left = window.innerWidth/2 - this.holeRadius + (this.agathe.x - 400) + "px";
        this.hole.style.top = this.agathe.y - this.holeDiffHeight + "px";


        // on masque le message de tuto si on bouge
        if (this.isMoving) {
            //* Ce code permet de rajouter des bruits de pas. Cpdt, JS lag et donne un résultat qui laisse à désirer. *//
            // this.steps.play();
            this.tutoDeplacement.style.visibility = "hidden";
        } else {
            // this.time.delayedCall(900, () => { // Delai pour 1sec
            //     this.steps.stop();
            // });
        }

        if (this.agathe.y <= 64) {
            this.switchScenes();
            // changeLvl(idCurrentLvl, idNextLvl, startTime);
        }
    }

    //* SPRITE BORDURE DU HAUT *//
    createTopBorder() {
        // affichage bordure depuis (0;0)
        this.topBorder = this.physics.add.staticGroup();
        // bordures permettant d'accéder uniquement à la grotte
        this.topBorder.add(new BigBorder(this, 325, 70));
        this.topBorder.add(new SmallBorder(this, 800, 70));
        this.topBorder.add(new MediumBorder(this, 750, 45));
    }

    //* SPRITES ARBRES *//
    createTrees() {
        this.trees = this.physics.add.group();

        // Contains trees object prototypes
        const treeType = [SmallTree, BigTree, SmallSnowyTree, BigSnowyTree];

        // Coords fixed for the middle trees
        const treeCoords = [
            [310, 190],
            [105, 290],
            [575, 390],
            [725, 320],
            [350, 385],
        ];

        // Create coords for top trees
        for (let i = 0; i < 650; i += 50) {
            const x = Phaser.Math.RND.between(0, 50) + i;
            const y = Phaser.Math.RND.between(0, 10) + 50;
            treeCoords.push([x, y]);
        }

        // Create coords for bottom trees
        for (let i = 0; i < 800; i += 50) {
            const x = Phaser.Math.RND.between(0, 50) + i;
            const y = Phaser.Math.RND.between(0, 10) + 550;
            treeCoords.push([x, y]);
        }

        // Build trees
        for (const [x, y] of treeCoords) {
            const randomType = Phaser.Math.RND.between(0, 3);
            const treePrototype = treeType[randomType];
            const tree = new treePrototype(this, x, y);
            this.trees.add(tree);
        }

        // hidden tree to the left of the cave
        this.trees.add(new BigSnowyTree(this, 675, 55));
    }


    //* SPRITES CAILLOUX *//
    createRocks() {

        this.rocks = this.physics.add.staticGroup();

        const bigRocks = [
            [50, 150],
            [75, 350],
            [100, 200],
            [30, 500],
            [270, 500],
            [320, 425],
            [270, 125],
            [430, 290],
            [465, 215],
            [600, 455],
            [740, 400],
            [695, 335],
            [650, 145],
        ];
        for (const [x, y] of bigRocks) {
            const rock = new BigRock(this, x, y);
            this.rocks.add(rock);
        }

        const doubleRocks = [
            [65, 190],
            [115, 370],
            [670, 300],
            [690, 150],
        ];
        for (const [x, y] of doubleRocks) {
            const rock = new DoubleRock(this, x, y);
            this.rocks.add(rock);
        }

        const mediumRocks = [
            [230, 110],
            [115, 440],
            [430, 195],
            [285, 235],
            [310, 255],
            [315, 500],
            [785, 95],
            [550, 425],
        ];
        for (const [x, y] of mediumRocks) {
            const rock = new MediumRock(this, x, y);
            this.rocks.add(rock);
        }

        const smallRocks = [
            [115, 345],
            [285, 275],
            [230, 135],
            [160, 310],
            [400, 415],
            [565, 445],
            [535, 460],
            [775, 115],
            [660, 325],
            [350, 445],
        ];
        for (const [x, y] of smallRocks) {
            const rock = new SmallRock(this, x, y);
            this.rocks.add(rock);
        }
    }


    collectLamp() {

        // suppression de la lampe
        console.log(this.lamp)
        this.lamp.disableBody(true, true);

        // changement taille cercle de lampe
        this.holeRadius = 100;
        this.holeDiffHeight = 25;
        this.hole.style.width = "200px";
        this.hole.style.height = "200px";
    }
}
