//? MOVING ANIMS ?//
function createRatAnims(scene)
{
    scene.anims.create({
        key: "left-rat",
        frames: scene.anims.generateFrameNumbers("rat", { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: "right-rat",
        frames: scene.anims.generateFrameNumbers("rat", { start: 6, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: "up-rat",
        frames: scene.anims.generateFrameNumbers("rat", { start: 9, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: "down-rat",
        frames: scene.anims.generateFrameNumbers("rat", { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });
}