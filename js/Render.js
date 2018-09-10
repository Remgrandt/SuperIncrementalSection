class Render {

	static drawArcFromCenter(centerX, centerY, startAngle, stopAngle, arcSize, distance, color) {
		var arcPath = new Path2D();
		arcPath.arc(centerX, centerY, distance + arcSize, startAngle, stopAngle, 1);
		arcPath.lineTo(centerX + Math.cos(stopAngle) * distance, centerY + Math.sin(stopAngle) * distance);
		arcPath.arc(centerX, centerY, distance, stopAngle, startAngle, 0);
		arcPath.lineTo(centerX + Math.cos(startAngle) * (distance - arcSize), centerY + Math.sin(startAngle) * (distance - arcSize));
		if (color != "") {
			ctx.fillStyle = color;
			ctx.fill(arcPath);
		}
		else {
			ctx.stroke(arcPath);
		}
		return arcPath;
	}

	static drawCircle(centerX, centerY, radius, color) {
		var circlePath = new Path2D();
		circlePath.arc(centerX, centerY, radius, 0, 2 * Math.PI);
		if (color != "") {
			ctx.fillStyle = color;
			ctx.fill(circlePath);
		}
		else {
			ctx.strokeStyle = "#93a1a1";//147,161,161,this.alpha
			ctx.stroke(circlePath);
		}
		return circlePath;

	}

	static renderLoadScreen() {
		Hud.drawText("bold " + squareScreenSize / 40 + "px Arial", "#fdf6e3", "middle", "center", "[LOADING ...]", originX, originY);
	}

	static renderTitleScreen() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if (audioLoaded) {
			for (var i = 0; i < stars.length; i++) {
				stars[i].Draw(ctx);
			}
		}
		var top = originY - squareScreenSize * 0.25;
		//calculate "incremental" label size here. do this so that "SUPER" combined with "++" will be centered
		ctx.font = "bold " + squareScreenSize / 10 + "px Arial Black";
		var incrementalText = "++";
		var incrementalTextWidth = ctx.measureText(incrementalText).width;

		ctx.font = "bold " + squareScreenSize / 10 + "px BumpItUp";
		var superText = "SUPER";
		var superTextWidth = ctx.measureText(superText).width;
		var superX = originX - incrementalTextWidth / 2;

		Hud.drawText("bold " + squareScreenSize / 10 + "px BumpItUp", "#b58900", "middle", "center", superText, superX, top);
		Hud.drawText("bold " + squareScreenSize / 10 + "px Arial Black", "#b58900", "bottom", "left", "++", superX + superTextWidth / 2, top);
		Hud.drawText("bold " + squareScreenSize / 10 + "px Arial Black", "#b58900", "middle", "right", "section", superX + superTextWidth / 2 + incrementalTextWidth, top + squareScreenSize / 10);

		if (audioLoaded) {
			if (!Gamepads.checkForGamepad()) {
				Hud.drawText("bold " + squareScreenSize / 40 + "px Arial", "#fdf6e3", "middle", "center", "GAMEPAD RECOMENDED", originX, originY + squareScreenSize / 15 + 1 * (squareScreenSize / 40));
			}
			Hud.drawText("bold " + squareScreenSize / 40 + "px Arial", "#fdf6e3", "middle", "center", "PRESS F11 FOR FULLSCREEN", originX, originY + squareScreenSize / 15 + 3 * (squareScreenSize / 40));
			if (Gamepads.checkForGamepad()) {
				Hud.drawText("bold " + squareScreenSize / 40 + "px Arial", "#fdf6e3", "middle", "center", "PRESS START TO PLAY", originX, originY + squareScreenSize / 15 + 5 * (squareScreenSize / 40));
			}
			else {
				Hud.drawText("bold " + squareScreenSize / 40 + "px Arial", "#fdf6e3", "middle", "center", "PRESS SPACE TO PLAY", originX, originY + squareScreenSize / 15 + 5 * (squareScreenSize / 40));
			}
		}
	}

	static endGame() {
		// endGame is not called in a loop like most render functions, this is because it does not clear the screen. drawing on top of itself creates some ugly visual artifacts.
		// because of this, it will not update the UI hint if a gamepad is connected or disconnected after a gameover. The controls for both gamepad and keyboard will still function however
		//console.log("Game Over!");
		Hud.drawText("bold " + squareScreenSize / 10 + "px BumpItUp", "#b58900", "middle", "center", "GAME OVER", originX, originY);

		if (Gamepads.checkForGamepad()) {
			Hud.drawText("bold " + squareScreenSize / 40 + "px Arial", "#fdf6e3", "middle", "center", "PRESS BACK TO BUY UPGRADES", originX, originY + squareScreenSize / 10);
		}
		else {
			Hud.drawText("bold " + squareScreenSize / 40 + "px Arial", "#fdf6e3", "middle", "center", "PRESS BACKSPACE TO BUY UPGRADES", originX, originY + squareScreenSize / 10);
		}
		if (Gamepads.checkForGamepad()) {
			Hud.drawText("bold " + squareScreenSize / 40 + "px Arial", "#fdf6e3", "middle", "center", "PRESS START TO RESTART", originX, originY + squareScreenSize / 10 + squareScreenSize / 40);
		}
		else {
			Hud.drawText("bold " + squareScreenSize / 40 + "px Arial", "#fdf6e3", "middle", "center", "PRESS SPACE TO RESTART", originX, originY + squareScreenSize / 10 + squareScreenSize / 40);
		}
	}

	static drawStars() {
		for (var i = 0; i < stars.length; i++) {
			stars[i].Draw(ctx);
		}
	}

	static renderPurchaseScreen() {
		purchaseScreen = true;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		Render.drawStars();
		if (Gamepads.checkForGamepad()) {
			Hud.drawText("bold " + squareScreenSize / 40 + "px Arial", "#fdf6e3", "middle", "center", "PRESS START TO RESTART", originX, originY);
		}
		else {
			Hud.drawText("bold " + squareScreenSize / 40 + "px Arial", "#fdf6e3", "middle", "center", "PRESS SPACE TO RESTART", originX, originY);
		}

		Hud.drawText("bold " + squareScreenSize / 40 + "px Arial", "#b58900", "middle", "center", "PRESS X : " + Math.floor(savedData['shieldProgress']) + "/" + shieldUpgradeCost + " NEW SHIELD", originX, originY + squareScreenSize / 10);

		if (player.angularVelocity / (deg2rad) >= 2) {
			Hud.drawText("bold " + squareScreenSize / 40 + "px Arial", "#b58900", "middle", "center", "SPEED MAXED OUT!!!", originX, originY + (squareScreenSize / 10) + (squareScreenSize / 40));
		}
		else {
			Hud.drawText("bold " + squareScreenSize / 40 + "px Arial", "#b58900", "middle", "center", "PRESS A : " + Math.floor(savedData['playerAngularSpeed']) + "/" + playerAngularSpeedUpgradeCost + " " + (player.angularVelocity / (deg2rad) + 0.1) + "x SPEED", originX, originY + (squareScreenSize / 10) + (squareScreenSize / 40));
		}
		Hud.drawScore();
	}

	static drawGuideGrid() {
		for (var i = 0; i < rings.length; i++) {
			rings[i].draw();
		}

		var r = window.innerWidth + window.innerHeight;
		for (var i = 0; i <= 12; i++) {
			var theta = i * 30.0 * deg2rad;
			ctx.beginPath();
			ctx.moveTo(originX + rings[0].radius * Math.cos(theta), originY + rings[0].radius * Math.sin(theta));
			ctx.lineTo(originX + r * Math.cos(theta), originY + r * Math.sin(theta));
			ctx.closePath();
			ctx.stroke();
		}
	}

	static render(refreshTime) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//draw everything that needs drawing, in z order
		Render.drawStars();

		//Render.drawGuideGrid();

		player.draw();
		for (var i = 0; i < arcs.length; i++) {
			arcs[i].draw();
		}

		Hud.drawScore();
		Hud.drawWave();
		Hud.drawShields();
		//Hud.drawFPS(refreshTime);
	}

}