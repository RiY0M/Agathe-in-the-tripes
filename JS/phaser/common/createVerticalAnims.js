function createVerticalAnims(scene)
{
    scene.anims.create({
        key: "left",
        frames: scene.anims.generateFrameNumbers("agathe", { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: "right",
        frames: scene.anims.generateFrameNumbers("agathe", { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1
    });
}