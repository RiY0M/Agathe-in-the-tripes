
//~ SPRITE AGATHE ~//
function createAgathe(scene)
{
    // ajout d'agathe à la fenêtre
    agathe = scene.physics.add.sprite(10, 300, "agathe")
        .setSize(21, 8)
        .setOffset(5, 40);
}

// function createMap(scene){
//     // chargement de la map
//     map = scene.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });
//     tileset = map.addTilesetImage('tiles', null, 16, 16, 1, 2);
//     scene.layer = map.createLayer(0, tileset, 0, 0);
// }

function setupCollisions(scene) {
    const map = scene.make.tilemap({ key: 'map' });
    const mursLayer = map.getLayer('Murs');
    
    // Activer les collisions pour la couche des murs
    map.setCollisionBetween(1, 338, true, 'Murs');

    // Configurer les collisions avec le joueur (agathe)
    scene.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    scene.physics.add.collider(agathe, mursLayer);
}