import Tree from "./Tree.js";

export default class SmallSnowyTree extends Tree {

    // readonly
    static spriteName = "small-snowy-tree";

    constructor(scene, x, y) {
        Tree.spriteName = SmallSnowyTree.spriteName
        super(scene, x, y);
    }

    static preloadSprite(scene) {
        scene.load.image(SmallSnowyTree.spriteName, `../../../../img/sprites/trees/${SmallSnowyTree.spriteName}.png`);
    }
}
