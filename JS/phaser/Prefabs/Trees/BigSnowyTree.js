import Tree from "./Tree.js";

export default class BigSnowyTree extends Tree {

    // readonly
    static spriteName = "big-snowy-tree";

    constructor(scene, x, y) {
        Tree.spriteName = BigSnowyTree.spriteName
        super(scene, x, y);
    }

    static preloadSprite(scene) {
        scene.load.image(BigSnowyTree.spriteName, `../../../../img/sprites/trees/${BigSnowyTree.spriteName}.png`);
    }
}
