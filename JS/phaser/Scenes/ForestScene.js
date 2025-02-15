import Scene from "./Scene.js";
import TopAgathe from "../Prefabs/Agathe/TopAgathe.js";
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
import DarkOverlay from "../Prefabs/Lighting/DarkOverlay.js";
import TopLight from "../Prefabs/Lighting/Lights/TopLight.js";
import TotallyNotSnowy from "../Prefabs/Sounds/Musics/TotallyNotSnowy.js";
import StepsOnSnow from "../Prefabs/Sounds/Effects/StepsOnSnow.js";
import TutoKeys from "../Prefabs/HUDs/TutoKeys.js";

// TODO : Play the steps when agathe is walking
// TODO : fix the HUB problem (will probably be fixed when rework of lvl 5 complete)

export default class ForestScene extends Scene {

    static sceneName = "ForestScene";
    nextSceneName = "TransitionScene";
    isMoving = false;       // booleen verif si affi ou non tuto
    idCurrentLvl = 0;      // Id du niveau courant
    idNextLvl = 1;         // Id du prochain niveau

    constructor() {
        super(ForestScene.sceneName);
    }

    preload() {
        TopAgathe.preloadSprite(this);

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

        TutoKeys.preloadSprite(this);

        TotallyNotSnowy.preloadSound(this);
        StepsOnSnow.preloadSound(this);
    }

    create() {
        super.create();

        this.music = new TotallyNotSnowy(this);

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
        this.agathe = new TopAgathe(this, 10, 300);

        //* PARTICULES DE NEIGE *//
        this.whiteSnowflakes = new WhiteSnowflakes(this);
        this.blueSnowflakes = new BlueSnowflakes(this);

        this.steps = new StepsOnSnow(this);

        this.tutoKeys = new TutoKeys(this);
        
        this.topLight = new TopLight(this, this.agathe.x, this.agathe.y, 60);
        this.darkOverlay = new DarkOverlay(this, this.topLight.mask);
        
        //* Code to add HUD in front of the dark overlay, not working *//
        // const maskTexture = this.make.renderTexture({
        //     width: this.width,
        //     height: this.height,
        // }, false);

        // maskTexture.scaleY = -1;
        // maskTexture.y = this.height;
        // const masks = [this.topLight, this.tutoKeys]
        // masks.forEach(mask => console.log(mask));
        // masks.forEach(mask => maskTexture.draw(mask));
        
        // const compositeMask = new Phaser.Display.Masks.BitmapMask(this, maskTexture);
        // compositeMask.invertAlpha = true;
        
        // const compositeMask = new Phaser.Display.Masks.BitmapMask(scene, maskTexture);
        // compositeMask.invertAlpha = true;
        // this.darkOverlay = new DarkOverlay(this, compositeMask);
        
        //! COLLISIONS !//
        this.physics.add.collider(this.agathe, this.rocks);
        this.physics.add.collider(this.agathe, this.topBorder);

        //! ACTION RECUP LAMPE !//
        this.physics.add.overlap(this.agathe, this.lamp, this.collectLamp, null, this);

        // afficheInitialHearts(cookies.hpRemain);
    }



    update() {
        this.isMoving = this.agathe.createMove(this.cursors);
        this.topLight.setPosition(this.agathe.x, this.agathe.y);

        if (this.isMoving) {
            this.steps.play();
            this.tutoKeys.destroy();
        } else {
            this.steps.stop();
        }

        if (this.agathe.y <= 64) {
            this.switchScenes();
        }
    }

    //* SPRITE BORDURE DU HAUT *//
    createTopBorder() {
        this.topBorder = this.physics.add.staticGroup();

        this.topBorder.add(new SmallBorder(this, 800, 70));
        this.topBorder.add(new MediumBorder(this, 750, 45));
        this.topBorder.add(new BigBorder(this, 325, 70));
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

        // Delete the lamp
        this.lamp.disableBody(true, true);
        this.agathe.getItem(this.lamp);
        this.topLight.setRadius(100);
    }
}
