class GameState {

	static checkInput() {
		var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
		var gamepadFound = (gamepads && gamepads[0]);

		// movement
		var gp = gamepads[0];
		var x = 0;
		var y = 0;
		var deadZone = 0.2;
		if (gamepadFound) {
			if (Math.abs(gp.axes[0]) > deadZone) {
				//console.log("axis x: %f", gp.axes[0]);
				x = gp.axes[0];
			}
			if (Math.abs(gp.axes[1]) > deadZone) {
				//console.log("axis y: %f", gp.axes[1]);
				y = gp.axes[1];
			}
			if (x != 0 || y != 0) {
				x = 100 * x;
				y = 100 * y;
				var angle = Math.atan2(y, x);
				//console.log("x: %f, y: %f", x, y)
				//console.log("Angle: %f%", angle * 180 / Math.PI);
				player.move(angle);
			}
		} else { //prefer gamepad over keyboard
			x = GameState.keyPressed[65] ? 1 : 0; //'a', clockwise
			x = GameState.keyPressed[68] ? x - 1 : x; //'d', counterclockwise
			player.move(player.startAngle + x);
		}
		if (!pauseButtonHeld) {
			if ((gamepadFound && gp.buttons[9].pressed) || GameState.keyPressed[32]) {
				//console.log("pause");
				gamePaused = true;
				pauseButtonHeld = true;
			}
		} else {
			pauseButtonHeld = (gamepadFound && gp.buttons[9].pressed) || GameState.keyPressed[32];
		}
	}

	static checkForUnpause() {
		var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
		var gamepadFound = (gamepads && gamepads[0]);

		// movement
		var gp = gamepads[0];

		if (!pauseButtonHeld) {
			if ((gamepadFound && gp.buttons[9].pressed) || GameState.keyPressed[32]) {
				//console.log("unpause");
				gamePaused = false;
				pauseButtonHeld = true;
			}

		}
		else {
			pauseButtonHeld = (gamepadFound && gp.buttons[9].pressed) || GameState.keyPressed[32];
		}
	}

	static checkForPurchase() {
		var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
		var gamepadFound = (gamepads && gamepads[0]);


		var gp = gamepads[0];

		if (!backButtonHeld) {
			if ((gamepadFound && gp.buttons[8].pressed) || GameState.keyPressed[8]) {	// 'backspace'
				//console.log("purchase");
				purchaseScreen = true;
				backButtonHeld = true;
			}
		}
		else {
			backButtonHeld = (gamepadFound && gp.buttons[8].pressed) || GameState.keyPressed[8];
		}
	}

	static buyPlayerAngularSpeed(amount) {
		var scoreDecrement;
		if (player.angularVelocity < 2 * deg2rad) {
			if (!amount && amount != 0) { //buying with score
				amount = Math.min(score, playerAngularSpeedUpgradeCost * 0.01); //don't spend more score than you have
				score -= amount; //spend that score
				savedData['playerAngularSpeed'] = savedData['playerAngularSpeed'] + amount; //track progress
				localStorage.setItem('sis_playerAngularSpeed', savedData['playerAngularSpeed']);
				if (savedData['playerAngularSpeed'] > playerAngularSpeedUpgradeCost) {
					arcadeAudio.play('kaching');
					player.angularVelocity += .1 * deg2rad;
					playerAngularSpeedUpgradeCost *= 10;
				}
			}
			else {
				while (amount > 0) {
					scoreDecrement = Math.min(amount, playerAngularSpeedUpgradeCost);
					if (amount > playerAngularSpeedUpgradeCost) {
						player.angularVelocity += .1 * deg2rad;
						playerAngularSpeedUpgradeCost *= 10;
					}
					amount -= scoreDecrement;
				}
			}
		}
	}

	static handlePurchases() {
		var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
		var gamepadFound = (gamepads && gamepads[0]);

		var gp = gamepads[0];
		if ((gamepadFound && gp.buttons[2].pressed) || GameState.keyPressed[88]) {
			//console.log("buy shield");
			GameState.buyShieldProgress();
		}
		if ((gamepadFound && gp.buttons[0].pressed) || GameState.keyPressed[65]) {
			//console.log("buy player angular speed");
			GameState.buyPlayerAngularSpeed();
		}
	}

	static buyShieldProgress(amount) {
		var scoreDecrement;
		if (!amount && amount != 0) { //buying with score
			amount = Math.min(score, shieldUpgradeCost * 0.01); //don't spend more score than you have
			score -= amount; //spend those score
			savedData['shieldProgress'] = savedData['shieldProgress'] + amount; //track progress
			localStorage.setItem('sis_shieldProgress', savedData['shieldProgress']);
			if (savedData['shieldProgress'] > shieldUpgradeCost) {
				arcadeAudio.play('kaching');
				maxShields += 1;
				shieldUpgradeCost *= 10;
			}
		}
		else {
			while (amount > 0) {
				scoreDecrement = Math.min(amount, shieldUpgradeCost);
				if (amount > shieldUpgradeCost) {
					maxShields += 1;
					shieldUpgradeCost *= 10;
				}
				amount -= scoreDecrement;
			}
		}
	}

	static checkForRestart() {
		var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
		var gamepadFound = (gamepads && gamepads[0]);

		var gp = gamepads[0];

		if (!pauseButtonHeld) {
			if ((gamepadFound && gp.buttons[9].pressed) || GameState.keyPressed[32]) {
				//console.log("restart");
				restart = true;
				pauseButtonHeld = true;
			}
		}
		else {
			pauseButtonHeld = (gamepadFound && gp.buttons[9].pressed) || GameState.keyPressed[32];
		}
	}

	static isPlayerTouchingArc(player, arc) {
		if (((arc.radius <= player.radius && player.radius <= arc.radius * 1.1) || (arc.radius <= player.radius * 1.1 && player.radius * 1.1 <= arc.radius * 1.1)) &&
			(isBetween(arc.stopAngle, arc.startAngle, player.startAngle) || isBetween(arc.stopAngle, arc.startAngle, player.stopAngle))) {
			return true;
		}
		return false;
	}

	static updateStars() {
		for (var i = 0; i < stars.length; i++) {
			stars[i].Update();
		}
	}

	static update() {
		GameState.checkInput();
		ArcFactory.arcGeneration();

		GameState.updateStars();

		player.update(refreshTime);

		Hud.updateScore();

		var i = arcs.length;
		while (i--) {
			arcs[i].update();
			if ((arcs[i].radius * 0.95) > Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height)) {
				arcs.splice(i, 1);
			}
		}
	}
}

GameState.keyPressed = {};
window.onkeydown = function (e) {
	e = e || window.event;
	GameState.keyPressed[e.keyCode] = true;
}

window.onkeyup = function (e) {
	e = e || window.event;
	delete GameState.keyPressed[e.keyCode];
}