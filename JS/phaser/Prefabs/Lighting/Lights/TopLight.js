import Light from "./Light.js"

export default class TopLight extends Light {

    static spriteName = "top-light";

    constructor(scene, x, y, radius) {
        super(scene, x, y);
        this.setRadius(radius);
    }

    drawLight() {
        this.clear();
        this.fillStyle(this.fillColor);
        this.fillCircle(0, 0, this.radius);

        this.generateTexture(TopLight.spriteName, this.radius * 2, this.radius * 2)
    }

    setRadius(radius) {
        this.radius = radius;
        this.drawLight();
    }
}
