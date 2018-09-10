class Player {
	constructor() {
		this.alpha = 1;
		this.alphaDown = false;
		this.invincibilityTime = 0.05;
		this.color = "rgb(38,139,210," + this.alpha + ")";
		this.radius = bigCircleRadius;
		this.angularWidth = 6 * deg2rad;
		this.startAngle = 90.0 * deg2rad + this.angularWidth / 2;
		this.stopAngle = this.startAngle - this.angularWidth;
		this.angularVelocity = 1 * deg2rad;
		this.shields = maxShields;
		this.path = new Path2D();
	}
	update() {
		if (this.alpha == 1) {
			for (var x = 0; x < arcs.length; x++) {
				if (GameState.isPlayerTouchingArc(this, arcs[x])) {
					if (this.shields <= 0) {
						arcadeAudio.play('death');
						gameOver = true;
					}
					else {
						arcadeAudio.play('shield');
						this.shields -= 1;
						this.alphaDown = true;
						this.alpha -= this.invincibilityTime;
					}
				}
			}
		}
		else // invincibility frames
		{
			if (this.alphaDown) {
				if (this.alpha <= 0) {
					this.alphaDown = false;
					this.alpha = 0;
				}
				this.alpha -= this.invincibilityTime;
			}
			if (!this.alphaDown) {
				this.alpha += this.invincibilityTime;
				if (this.alpha >= 1) {
					this.alpha = 1;
				}
			}
			this.color = "rgb(38,139,210," + this.alpha + ")";
		}
	}
	draw() {
		this.path = Render.drawArcFromCenter(originX, originY, this.startAngle, this.stopAngle, this.radius * 0.1, this.radius, this.color);
	}
	move(angle) {
		var delta = this.startAngle - angle;
		var angleChange = Math.min(this.angularVelocity, Math.abs(delta));
		if (delta > 0) {
			if (delta > Math.PI) {
				this.startAngle += angleChange;
			}
			else {
				this.startAngle -= angleChange;
			}
		}
		else if (delta < 0) {
			if (delta < -Math.PI) {
				this.startAngle -= angleChange;
			}
			else {
				this.startAngle += angleChange;
			}
		}
		if (this.startAngle < -Math.PI) {
			this.startAngle += 2 * Math.PI;
		}
		else if (this.startAngle > Math.PI) {
			this.startAngle -= 2 * Math.PI;
		}
		this.stopAngle = this.startAngle - this.angularWidth;
	}
}