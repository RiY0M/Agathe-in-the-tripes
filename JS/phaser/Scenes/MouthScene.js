import Scene from "./Scene.js";
import TopAgathe from "../Prefabs/Agathe/TopAgathe.js";
import SpookyTheme from "../Prefabs/Sounds/Musics/SpookyTheme.js";
import StepsOnSand from "../Prefabs/Sounds/Effects/StepsOnSand.js";
import Heart from "../Prefabs/Items/Heart.js";
import Skeleton from "../Prefabs/Obstacles/Skeleton.js";
import DeadRat from "../Prefabs/Obstacles/DeadRat.js";
import BrokenShield from "../Prefabs/Obstacles/BrokenShield.js";
import BrokenSword from "../Prefabs/Obstacles/BrokenSword.js";
import BloodSplat from "../Prefabs/Blood/BloodSplat.js";
import BloodStain from "../Prefabs/Blood/BloodStain.js";
import GumWall from "../Prefabs/Gum/GumWall.js";
import GumSquare from "../Prefabs/Gum/GumSquare.js";
import StaticTooth from "../Prefabs/Teeth/StaticTooth.js";
import MovingTooth from "../Prefabs/Teeth/MovingTooth.js";
import { frameRate } from "../constants.js";
import UIScene from "./UIScene.js";

export default class MouthScene extends Scene {

    static sceneName = "MouthScene";
    nextSceneName = "EsophagusScene";
    idCurrentLvl = 1;
    idNextLvl = 2;
    retractingTeethTickLoop = 0;
    randomDelay = 0;

    constructor() {
        super(MouthScene.sceneName);
    }

    preload() {
        TopAgathe.preloadSprite(this);

        SpookyTheme.preloadSound(this);

        Skeleton.preloadSprite(this);
        DeadRat.preloadSprite(this);
        BrokenShield.preloadSprite(this);
        BrokenSword.preloadSprite(this);

        Heart.preloadSprite(this);

        BloodStain.preloadSprite(this);
        BloodSplat.preloadSprite(this);

        GumWall.preloadSprite(this);
        GumSquare.preloadSprite(this);

        StaticTooth.preloadSprite(this);
        MovingTooth.preloadSprite(this);

        StepsOnSand.preloadSound(this);
    }

    create() {
        super.create();
        this.cameras.main.setBackgroundColor("#d64e45");

        this.music = new SpookyTheme(this);
        this.agathe = new TopAgathe(this, 386, 600, TopAgathe.maxHp, "up");
        this.steps = new StepsOnSand(this);

        this.scene.launch(UIScene.sceneName, {
            scene: this,
            sceneName: MouthScene.sceneName,
            hitPoints: this.agathe.hitPoints
        });
        
        this.createSkeleton(450, 530);
        this.createRat(600, 385);
        this.createBrokenWeapons(290, 85);
        
        this.createHeart(530, 535);
        
        this.loadSpriteVariables();
        this.createGumWallBorder();
        this.staticTeeth = this.physics.add.staticGroup();
        this.createTeethPath();
        this.createBorderTeeth();

        this.createMobileTeethPath();



        this.physics.add.collider(this.agathe, this.staticTeeth, this.collideTeeth);

        this.physics.add.collider(this.agathe, this.movingTeeth1, (args) => {
            if (this.movingTeeth1.children.entries[0].isMovingToothUp) this.collideTeeth(args);
        });
        this.physics.add.collider(this.agathe, this.movingTeeth2, (args) => {
            if (this.movingTeeth2.children.entries[0].isMovingToothUp) this.collideTeeth(args);
        });
        this.physics.add.collider(this.agathe, this.movingTeeth3, (args) => {
            if (this.movingTeeth3.children.entries[0].isMovingToothUp) this.collideTeeth(args);
        });
        this.physics.add.collider(this.agathe, this.movingTeeth4, (args) => {
            if (this.movingTeeth4.children.entries[0].isMovingToothUp) this.collideTeeth(args);
        });
    }

    update() {
        if (this.retractingTeethTickLoop == 1000) this.retractingTeethTickLoop = 0;
        this.retractingTeethTickLoop++;

        if (this.agathe.invincibleTime > 0) {
            this.agathe.invincibleTime--;
        }

        this.movingTeeth1.children.entries.forEach(tooth => {
            tooth.update(this.retractingTeethTickLoop, frameRate * 2);
        });
        this.movingTeeth2.children.entries.forEach(tooth => {
            tooth.update(this.retractingTeethTickLoop, frameRate * 2, frameRate);
        });
        this.movingTeeth3.children.entries.forEach(tooth => {
            tooth.update(this.retractingTeethTickLoop, frameRate);
        });
        // It seems too sync with the other tooth
        this.randomDelay = Math.floor(Math.random() * (frameRate * 5 - frameRate + 1) + frameRate);
        this.movingTeeth4.children.entries.forEach(tooth => {
            tooth.update(this.retractingTeethTickLoop, this.randomDelay);
        });

        this.isMoving = this.agathe.createMove(this.cursors);

        if (this.isMoving) {
            this.steps.play();
        } else {
            this.steps.stop();
        }

        if (this.agathe.y <= 15) {
            this.switchScenes();
        }
    }

    loadSpriteVariables() {
        this.movingTeeth1 = this.physics.add.staticGroup();
        this.movingTeeth2 = this.physics.add.staticGroup();
        this.movingTeeth3 = this.physics.add.staticGroup();
        this.movingTeeth4 = this.physics.add.staticGroup();
    }

    createGumWallBorder() {
        // left
        for (let y = 0; y < 800; y += 100) {
            new GumWall(this, 20, y).setAngle(90);
        }

        // right
        for (let y = 0; y < 800; y += 100) {
            new GumWall(this, 780, y).setAngle(-90);
        }

        let y = 580;
        // bottom left
        new GumWall(this, 80, y);
        new GumWall(this, 220, y);
        new GumWall(this, 273, y).setFlipX(true);

        // bottom right
        new GumWall(this, 508, y);
        new GumWall(this, 650, y).setFlipX(true);
        new GumWall(this, 750, y);

        y = 20;
        // top left
        new GumWall(this, 80, y).setFlipY(true);
        new GumWall(this, 220, y).setFlipY(true);
        new GumWall(this, 273, y).setFlipX(true).setFlipY(true);

        // top right
        new GumWall(this, 508, y).setFlipY(true);
        new GumWall(this, 650, y).setFlipX(true).setFlipY(true);
        new GumWall(this, 750, y).setFlipY(true);
    }

    createBorderTeeth() {
        const staticTeethSpace = 35;
        let y = 25;
        // top left
        for (let x = 75; x < 350; x+=staticTeethSpace) {
            this.staticTeeth.add(new StaticTooth(this, x, y).setFlipY(true));
        }

        // top right
        for (let x = 450; x < 750; x+=staticTeethSpace) {
            this.staticTeeth.add(new StaticTooth(this, x, y).setFlipY(true));
        }

        y = 575;

        // bottom left
        for (let x = 50; x < 350; x+=staticTeethSpace) {
            this.staticTeeth.add(
                new StaticTooth(this, x, y).setSize(45, 46).setOffset(-9, 5)
            );
        }

        // bottom right
        for (let x = 450; x < 750; x+=staticTeethSpace) {
            this.staticTeeth.add(
                new StaticTooth(this, x, y).setSize(45, 46).setOffset(9, 5)
            );
        }

        // left
        for (let y = 25; y < 575; y+=staticTeethSpace) {
            this.staticTeeth.add(new StaticTooth(this, 25, y).setAngle(90));
        }

        // right
        for (let y = 25; y < 575; y+=staticTeethSpace) {
            this.staticTeeth.add(new StaticTooth(this, 775, y).setAngle(-90));
        }
    }

    createTeethPath() {
        const staticTeethSpace = 35;
        for (let y = 145; y < 475; y+=staticTeethSpace) {
            new GumSquare(this, 140, y).setAngle(90);
        }
        for (let y = 150; y < 450; y+=staticTeethSpace) {
            this.staticTeeth.add(new StaticTooth(this, 150, y).setAngle(90));
        }

        for (let x = 144; x < 700; x+=staticTeethSpace) {
            new GumSquare(this, x, 485);
        }
        new GumSquare(this, 680, 485);
        for (let x = 150; x < 700; x+=staticTeethSpace) {
            this.staticTeeth.add(new StaticTooth(this, x, 475).setSize(45, 46).setOffset(-9, 5));
        }

        for (let y = 145; y < 375; y+=staticTeethSpace) {
            new GumSquare(this, 290, y).setAngle(90);
        }
        for (let y = 150; y < 350; y+=staticTeethSpace) {
            this.staticTeeth.add(new StaticTooth(this, 300, y).setAngle(90));
        }

        for (let x = 294; x < 550; x+=staticTeethSpace) {
            new GumSquare(this, x, 380);
        }
        new GumSquare(this, 550, 380);
        for (let x = 300; x < 550; x+=staticTeethSpace) {
            this.staticTeeth.add(new StaticTooth(this, x, 370));
        }

        for (let y = 145; y < 375; y+=staticTeethSpace) {
            new GumSquare(this, 660, y).setAngle(-90);
        }
        new GumSquare(this, 660, 365).setAngle(-90);
        for (let y = 150; y < 375; y+=staticTeethSpace) {
            this.staticTeeth.add(new StaticTooth(this, 650, y).setAngle(-90));
        }

        for (let y = 45; y < 275; y+=staticTeethSpace) {
            new GumSquare(this, 447, y).setAngle(-90);
        }
        for (let y = 70; y < 275; y+=staticTeethSpace) {
            this.staticTeeth.add(new StaticTooth(this, 437, y).setAngle(-90));
        }

    }

    createMobileTeethPath() {
        // 1 -> 3
        for (let y = 150; y <= 450; y+=150) {
            this.movingTeeth1.add(new MovingTooth(this, 85, y).setSize(44, 40).setOffset(18, 20));
        }

        // 4
        this.movingTeeth2.add(new MovingTooth(this, 148, 80).setSize(44, 40).setOffset(18, 20));

        // 5
        this.movingTeeth3.add(new MovingTooth(this, 215, 250).setSize(70, 40).setOffset(18, 20));

        // 6
        this.movingTeeth3.add(new MovingTooth(this, 215, 300).setSize(70, 40).setOffset(15, 20));

        // 7
        this.movingTeeth1.add(new MovingTooth(this, 215, 350).setSize(70, 40).setOffset(15, 20));
        
        // 8 -> 9
        for (let y = 370; y <= 420; y+=50) {
            this.movingTeeth1.add(new MovingTooth(this, 715, y).setSize(44, 40).setOffset(18, 20));
        }

        // 10
        this.movingTeeth2.add(new MovingTooth(this, 715, 250).setSize(44, 40).setOffset(18, 20));

        // 11 -> 12
        for (let y = 90; y <= 140; y+=50) {
            this.movingTeeth3.add(new MovingTooth(this, 715, y).setSize(44, 40).setOffset(18, 20));
        }


        // 19 -> 20
        for (let y = 150; y <= 300; y+=100) {
            this.movingTeeth3.add(new MovingTooth(this, 370, y).setSize(60, 40).setOffset(10, 20));
        }
    }

    createSkeleton(x, y) {
        new BloodStain(this, x, y);
        const skeleton = new Skeleton(this, x + 15, y + 5);

        this.physics.add.collider(this.agathe, skeleton);
    }

    createRat(x, y) {
        new BloodSplat(this, x, y).setScale(0.5).setAngle(15);

        this.rat = new DeadRat(this, x, y - 5).setScale(0.8).setAngle(-20);

        this.physics.add.collider(this.agathe, this.rat);
    }

    createBrokenWeapons(x, y) {
        new BloodSplat(this, x, y).setScale(0.9).setAngle(15);

        const shield = new BrokenShield(this, x, y - 10).setScale(0.9).setAngle(-15);
        const sword = new BrokenSword(this, x + 15, y + 5).setScale(1.2).setAngle(25);

        this.physics.add.collider(this.agathe, shield);
        this.physics.add.collider(this.agathe, sword);
    }

    createHeart(x, y) {
        new BloodSplat(this, x, y).setScale(0.5);

        const heart = new Heart(this, x, y).setScale(0.7).setAngle(25);

        this.physics.add.overlap(this.agathe, heart, this.collectHeart, null, this);
    }

    collideTeeth(agathe, tooth) {
        agathe.getHit(1);

        // reloadNbHearts(agathe.hitPoints);
    }

    collectHeart(agathe, heart) {

        heart.disableBody(true, true);
        agathe.getItem(heart);
        agathe.recover(1);
        // reloadNbHearts(agathe.hitPoints);
    }
}
