import Tree from "./Tree.js";

export default class SmallTree extends Tree {

    // readonly
    static spriteName = "small-tree";

    constructor(scene, x, y) {
        Tree.spriteName = SmallTree.spriteName
        super(scene, x, y);
    }

    static preloadSprite(scene) {
        scene.load.image(SmallTree.spriteName, "../../../../img/sprites/trees/small-tree.png");
    }
}
