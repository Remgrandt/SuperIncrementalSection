class Circle {
    constructor(radius, color, x, y) {
        this.radius = radius;
        this.color = color;
        this.x = x;
        this.y = y;
        this.speedMultiplier = 6;
        this.angle = -90.0 * deg2rad;
    }
    draw() {
        Render.drawCircle(this.x, this.y, this.radius, this.color);
    }
}