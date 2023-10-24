let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let size_chargement = 672;
let Vitesse_de_Chargement = 0.01; 
let game = new Phaser.Game(config);

function preload() {
    this.load.spritesheet("agathe", "../../img/assets/agathe_sprite.png", { frameWidth: 32, frameHeight: 48 });
}

let agathe;
function create() {
    agathe = this.add.sprite(400, 300, "agathe"); //Sprite d'Agathe
    agathe.setScale(5);
    
    this.anims.create({ 
        key: "rotate",
        frames: this.anims.generateFrameNumbers("agathe", { start: 0, end: 15 }),
        frameRate: 14, // Ajustez la vitesse de rotation selon vos besoins
        repeat: 3, //Repeter 3 fois
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
}

function update (){
    this.chargement.clear();

    this.chargement.fillStyle(0x2d2d2d); //Couleur du chargement
    this.chargement.fillRect(64, 64, size_chargement, 50); //Taille du chargement

    this.chargement.fillStyle(0x2dff2d); // Couleur de barre remplie


    if (Vitesse_de_Chargement < 1) {
        Vitesse_de_Chargement += 0.01; //Vitesse de chargement
    }
    else{
        agathe.anims.play("afk-" + 0);
    }
    this.chargement.fillRect(64, 64, size_chargement * Vitesse_de_Chargement, 48); //Chargement de la barre
}