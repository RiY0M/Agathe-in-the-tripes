let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#ffffff",
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
let agathe;
let music;
let size_chargement = 800;
let Vitesse_de_Chargement = 0.001; 
let game = new Phaser.Game(config);

function preload() {}

function create() {
    this.chargement = this.add.graphics(); // Ajout du chargement
}

function update() {
    this.chargement.clear();

    this.chargement.fillStyle(0x2d2d2d); // Couleur du chargement
    // Inversion de la hauteur et des coordonnées y pour commencer de bas en haut
    let chargementY = 800 - (size_chargement * Vitesse_de_Chargement);
    let chargementHeight = size_chargement * Vitesse_de_Chargement;
    this.chargement.fillRect(0, chargementY, 800, chargementHeight); // Taille du chargement

    this.chargement.fillStyle(0x2dff2d); // Couleur de barre remplie

    if (Vitesse_de_Chargement < 1) {
        Vitesse_de_Chargement += 0.002; // Vitesse de chargement
    }
    // Inversion de la hauteur de la barre remplie pour correspondre à l'inversion du chargement
    let filledHeight = size_chargement * Vitesse_de_Chargement;
    this.chargement.fillRect(0, 800 - filledHeight, 800, filledHeight); // Chargement de la barre
}