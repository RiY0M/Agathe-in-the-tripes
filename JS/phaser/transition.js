let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#241F21",
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
let agathe;
let music;
let img_fond;
let size_chargement = 672;
let Vitesse_de_Chargement = 0.002; 
let game = new Phaser.Game(config);

function preload() {
    this.load.spritesheet("agathe", "../../img/assets/TransitionAgathe.png", { frameWidth: 32, frameHeight: 48 });
    this.load.image("fond-img", "../../img/TransitionBouche.png");

    this.load.audio('theme', '../../sound/LippsInc.mp3');

}

function create() {
    this.add.image(410, 295, 'fond-img').setScale(1.8);

    agathe = this.add.sprite(400, 300, "agathe"); //Sprite d'Agathe
    agathe.setScale(3);
    
    this.anims.create({ 
        key: "rotate",
        frames: this.anims.generateFrameNumbers("agathe", { start: 0, end: 15 }),
        frameRate: 14, // Ajustez la vitesse de rotation selon vos besoins
        repeat: -1, //Repeter 3 fois
    });

    agathe.anims.play("rotate"); //Lancer l'animation
    this.chargement = this.add.graphics(); //Ajout du chargement

    //? AFK ?//
    
    // bas
    this.anims.create({
        key: "afk-0",
        frames: [ { key: "agathe", frame: 0 } ],
        frameRate: 20
    });
    music = this.sound.add("theme");
    music.play();
}

function update (){
    this.chargement.clear();

    this.chargement.fillStyle(0x2d2d2d); //Couleur du chargement
    this.chargement.fillRect(64, 64, size_chargement, 50); //Taille du chargement

    this.chargement.fillStyle(0x2dff2d); // Couleur de barre remplie


    if (Vitesse_de_Chargement < 1) {
        Vitesse_de_Chargement += 0.004; //Vitesse de chargement
    }
    else{
        agathe.anims.play("afk-" + 0);
        music.stop();
    }
    this.chargement.fillRect(64, 64, size_chargement * Vitesse_de_Chargement, 48); //Chargement de la barre
}