
//~ SPRITE AGATHE ~//
function createAgathe(scene)
{
    // ajout d'agathe à la fenêtre
    agathe = scene.physics.add.sprite(10, 300, "agathe")
        .setSize(21, 8)
        .setOffset(5, 40);
}


function createGround(scene){   //Créer le sol
    sol = scene.physics.add.staticGroup();
    sol.create(400, 300, "ground");
}

function createBorderTopBottom(scene){  //Créer les bordures du haut et du bas
    murHorizontale = scene.physics.add.staticGroup();
    borderTopBottom = scene.physics.add.staticGroup();

    borderTopBottom.create(400, 10, "borderTopBottom");
    borderTopBottom.create(400, 590, "borderTopBottom");
}

function createBorderLeftRight(scene){  //Créer les bordures de gauche et de droite
    murVerticale = scene.physics.add.staticGroup();

    for (i = 0; i < 600; i += 28){
        if (i!== 308 && i !== 588){
            murVerticale.create(10, i, "murVerticale");
            murVerticale.create(790, i, "murVerticale");
        }
    }
    murVerticale.create(-20, 310, "murVerticale");
}

function getRandomNb(min = 10, max = 790) {
    return Math.random() * (max - min) + min;
}

function tacheDeSang(scene){    //Rajoute des taches de sang
    blood0 = scene.physics.add.staticGroup();
    blood1 = scene.physics.add.staticGroup();
    

    for (i = 0; i < 600; i += 40){
        getRandomNb(1, 1000) > 500 ? blood0.create(getRandomNb(), i, "blood0") : blood1.create(getRandomNb(), i, "blood1");
    }
}

function labyrinthe(scene) {
    const gap = 28; // Espacement entre les murs
    const passageWidth = 32; // Largeur du passage
    const width = 800; // Largeur totale de la zone
    const height = 600; // Hauteur totale de la zone
    const mazeWidth = Math.floor(width / gap) + 1;
    const mazeHeight = Math.floor(height / gap) + 1;

    // Initialisation du labyrinthe
    const maze = Array.from({ length: mazeHeight }, () => Array(mazeWidth).fill(1));
    const sets = Array.from({ length: Math.floor(height / gap) }, () => Array(Math.floor(width / gap)).fill().map((_, j) => [j + 1, j + 1]));

    const find = (set, cell) => set.find(subset => subset.includes(cell));
    const union = (set, cell1, cell2) => {
        const set1 = find(set, cell1);
        const set2 = find(set, cell2);
        set[set.indexOf(set1)].push(...set2);
        set.splice(set.indexOf(set2), 1);
    };

    // Fonction pour obtenir les voisins d'une cellule
    const getNeighbors = (x, y) => [
        [x - 1, y],
        [x, y - 1],
        [x + 1, y],
        [x, y + 1]
    ].filter(([i, j]) => i >= 0 && j >= 0 && i < maze.length && j < maze[0].length);

    const walls = [];
    for (let y = 0; y < maze.length - 1; y++) {
        for (let x = 0; x < maze[0].length - 1; x++) {
            walls.push([x, y, "h"]);
            walls.push([x, y, "v"]);
        }
    }

    walls.sort(() => Math.random() - 0.5);

    for (const [x, y, direction] of walls) {
        const [i, j] = direction === "h" ? [x, y - 1] : [x - 1, y];

        if (find(sets, [x, y]) !== find(sets, [i, j])) {
            maze[x][y] = 0;

            if (direction === "h") {
                maze[x][y + 1] = 0;
                union(sets, [x, y], [x, y - 1]);
            } else {
                maze[x + 1][y] = 0;
                union(sets, [x, y], [x - 1, y]);
            }
        }
    }

    // Création des murs en fonction du labyrinthe généré
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[0].length; x++) {
            if (maze[y][x] === 1) {
                murHorizontale.create(x * gap, y * gap, "murHorizontale").setScale(15 / 32);
                murVerticale.create(x * gap, y * gap, "murVerticale").setScale(15 / 32);
            }
        }
    }
}