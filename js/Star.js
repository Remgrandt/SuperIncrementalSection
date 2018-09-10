// https://codepen.io/HowToDevCode/pen/XjgZxG

class Star {
    constructor() {
        this.x = canvas.width * Math.random();
        this.y = canvas.height * Math.random();
        this.z = Star.maxZ * Math.random();
        this.accX = 0;
        this.accY = 0;
        this.c = Math.floor(Math.random() * 128) + 128;
        this.color = "rgb(" + this.c + "," + this.c + "," + this.c + ")";
    }
    GetColorMagnitude() {
        var m = 1 - (this.z / Star.maxZ);
        var r = Math.ceil(this.c * m);
        return "rgb(" + r + "," + r + "," + r + ")";
    }
    Draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 2, 2);
    }
    Update() {
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.z = Star.maxZ;
            this.accX = 0;
            this.accY = 0;
            this.x = canvas.width * Math.random();
            this.y = canvas.height * Math.random();
        }
        // update this number to change star speed. 1 is the fastest.
        var starSpeed = 150;
        var dx = (this.x - originX) / starSpeed;
        var dy = (this.y - originY) / starSpeed;
        this.accX += dx / dy;
        this.accY += dy / dx;
        this.x += dx;
        this.y += dy;
        this.z -= (Math.abs(dx) + Math.abs(dy));
        if (this.z < 0)
            this.z = 0;
        this.color = this.GetColorMagnitude();
    }
}

Star.num_stars = 1000;
Star.maxZ = 200;