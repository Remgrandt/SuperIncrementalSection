class Arc {
    constructor(radius, color, startAngle, stopAngle, angularVelocity) {
        //this defines the outer most edge
        this.radius = radius;
        // comma seperated list of color values, like "123,3,255"
        this.color = color;
        this.alpha = 1;
        this.startAngle = startAngle;
        this.stopAngle = stopAngle;
        // how fast the arc moves in a circle
        this.angularVelocity = angularVelocity;
        // how fast the arc moves toward the player
        this.velocity = 10;
        this.path = new Path2D();
        this.scored = false;
    }
    update() {
        // move towards player
        this.radius += this.velocity * (this.radius + 1) / squareScreenSize;
        // rotate around the screen
        this.startAngle += this.angularVelocity;
        this.stopAngle += this.angularVelocity;
        // add to the score whenever block is past the player
        if (!this.scored && this.radius > player.radius) {
            this.scored = true;
            arcSurvivedForScore += 1;
            pointRate += 1.5;
        }

    }
    draw() {
        // this is too flickery
        //this.alpha += (Math.random() < 0.5 ? -1 : 1) * .05;
        //this.alpha = Math.min(Math.max(0.5, this.alpha),1);

        this.path = Render.drawArcFromCenter(canvas.width / 2, canvas.height / 2, this.startAngle, this.stopAngle, this.radius * 0.1, this.radius, "rgb(" + this.color + "," + this.alpha + ")");
    }

}