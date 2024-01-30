class LittleWorm
{
    _scene;
    _x;

    constructor(scene, x) {
        this._scene = scene;
        this._x = x;
    }

    get x () {
        return this._x;
    }

    set x (newX) {
        this._x = newX;
    }

    //^ ANIMATIONS ^//

    createOutAnim()
    {
        this._scene.anims.create({
            key: "outAnim",
            frames: scene.anims.generateFrameNumbers("out", { start: 0, end: 7 }),
            frameRate: 10,
        });
    }

    createAttackAnim()
    {
        this._scene.anims.create({
            key: "attackAnim",
            frames: scene.anims.generateFrameNumbers("attack", { start: 0, end: 5 }),
            frameRate: 10,
        });
    }

    createInAnim()
    {
        this._scene.anims.create({
            key: "inAnim",
            frames: scene.anims.generateFrameNumbers("in", { start: 0, end: 7 }),
            frameRate: 10,
        });
    }
}