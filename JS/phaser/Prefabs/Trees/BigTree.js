import Tree from "./Tree.js";

export default class BigTree extends Tree {

    // readonly
    static spriteName = "big-tree";

    constructor(scene, x, y) {
        Tree.spriteName = BigTree.spriteName;
        super(scene, x, y);
    }

    static preloadSprite(scene) {
        scene.load.image(BigTree.spriteName, "../../../../img/sprites/trees/big-tree.png");
    }
}
