// init stuff here that will be held overfrom game to game, or otherwise should not be reinitialized
var showTitleScreen = true;
var fontLoaded = false;
var pauseButtonHeld = false;
var backButtonHeld = false;
var maxShields = 0;
var shieldUpgradeCost = 10000;
var savedData = [];
var arcadeAudio = new ArcadeAudio();
var audioLoaded = false;

document.fonts.onloadingdone = function (fontFaceSetEvent) {
	fontLoaded = true;
};

//localStorage.clear(); //debug
loadAllSavedData();

function loadAllSavedData() {
	loadSavedData('shieldProgress');
	if (savedData['shieldProgress']) {
		GameState.buyShieldProgress(savedData['shieldProgress']);
	}
	loadSavedData('highScore');
	loadSavedData('playerAngularSpeed');
	// buy angular speed later, need to initialize player first
}

function loadSavedData(name) {
	if (localStorage.getItem('sis_' + name)) {
		savedData[name] = parseFloat(localStorage.getItem('sis_' + name));
	}
	if (!savedData[name]) {
		savedData[name] = 0;
	}
}

function createStars() {
	stars = [];
	for (var i = 0; i < Star.num_stars; i++)
		stars.push(new Star());
}

function loadArcadeAudio() {
	arcadeAudio.add('shield', 6,
		[
			[0, , 0.1391, , 0.4246, 0.2962, , 0.1894, , 0.6843, 0.4998, , , 0.5776, , , , , 1, , , , , 0.5],
			[0, , 0.1391, , 0.4246, 0.3287, , 0.2121, , 0.6843, 0.4998, , , 0.5284, , 0.0276, , , 1, , 0.0338, , , 0.5],
			[0, , 0.1239, , 0.45, 0.3337, , 0.2601, , 0.6647, 0.4563, , , 0.5284, , 0.0109, , -0.0277, 0.97, , , , 0.0327, 0.5],
			[0, , 0.1239, , 0.45, 0.3825, , 0.2394, , 0.6647, 0.4983, -0.0222, , 0.5284, , 0.035, 0.0236, -0.0277, 0.97, -0.0408, , , 0.0327, 0.5],
			[0, , 0.1239, , 0.45, 0.3825, 0.0446, 0.2394, , 0.6872, 0.4983, -0.0222, , 0.5698, -0.0235, 0.035, 0.0236, -0.0277, 0.97, -0.0408, , , 0.079, 0.5],
			[0, , 0.1239, 0.0474, 0.4273, 0.3736, 0.0576, 0.2394, 0.0205, 0.6872, 0.4983, -0.0222, 0.0166, 0.5448, 0.0151, 0.0747, -0.0096, -0.0105, 0.97, -0.0408, , 0.0199, 0.079, 0.5]
		]
	);
	arcadeAudio.add('kaching', 6,
		[
			[0, , 0.01, 0.553, 0.4411, 0.49, , , , , , 0.4888, 0.5724, , , , , , 1, , , , , 0.5],
			[0, , 0.01, 0.553, 0.4737, 0.5071, , , , 0.0354, , 0.521, 0.5832, 0.0301, 0.0344, , , , 1, , 0.0469, , 0.0169, 0.5],
			[0, , 0.0706, 0.5879, 0.3273, 0.4824, , , , , , 0.5697, 0.6166, , , , , , 1, , , , , 0.5],
			[0, , 0.0224, 0.5969, 0.4737, 0.5215, , , , 0.0354, , 0.5276, 0.6124, 0.0469, 0.0344, , 0.0402, -0.0232, 1, 0.0351, 0.0469, 0.0204, 0.0191, 0.5],
			[0, , 0.0706, 0.5768, 0.3273, 0.4553, 0.0437, , , , 0.0449, 0.5498, 0.6166, , -0.0385, , , 0.0044, 0.9627, , , , -0.0252, 0.5],
			[0, , 0.0429, 0.5376, 0.2421, 0.4712, 0.0601, , 0.0082, , 0.0661, 0.5498, 0.6373, , 0.0049, 0.0376, -0.0783, 0.0139, 0.9265, -0.0445, 0.0019, , -0.0442, 0.5]
		]
	);
	arcadeAudio.add('death', 6,
		[
			[3, , 0.49, 0.2396, 0.3102, 0.2594, , -0.206, , , , 0.4424, 0.775, , , , , , 1, , , , , 0.5],
			[3, , 0.2796, 0.7691, 0.4747, 0.2201, , , , , , -0.5287, 0.7516, , , , , , 1, , , , , 0.5],
			[3, , 0.3432, 0.2947, 0.2427, 0.1607, , -0.2947, , , , , , , , , , , 1, , , , , 0.5],
			[3, , 0.3655, 0.4749, 0.4298, 0.1258, , , , , , 0.3784, 0.6993, , , , , , 1, , , , , 0.5],
			[3, , 0.3673, 0.5131, 0.392, 0.1482, , , 0.0175, , 0.0152, 0.415, 0.688, , , , , -0.029, 1, , , , 0.0173, 0.5],
			[3, , 0.2051, 0.6893, 0.4565, 0.0543, , 0.0069, , , , , , , , , , , 1, , , , , 0.5]
		]
	);
	audioLoaded = true;
}

function createGuideRings() {
	rings = [];
	for (var i = 5; i >= 0; i--)
		rings.push(new Circle(bigCircleRadius * 1 / Math.pow(2, i), "", originX, originY));
}


function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	originX = canvas.width / 2;
	originY = canvas.height / 2;
	squareScreenSize = Math.min(window.innerWidth, window.innerHeight);
	edgeMargin = squareScreenSize * .05; //5% of screen size
	bigCircleRadius = squareScreenSize / 2 - edgeMargin;
	createGuideRings();
}

window.addEventListener("resize", function (e) { resizeCanvas(); }, false);

function init() {
	// init stuff here that gets reinitialized every game
	lastScreenTime = Date.now();
	currentScreenTime = Date.now();
	refreshTime = currentScreenTime - lastScreenTime;
	squareScreenSize = Math.min(window.innerWidth, window.innerHeight);
	edgeMargin = squareScreenSize * .05; //5% of screen size
	bigCircleRadius = squareScreenSize / 2 - edgeMargin; // this is the track the player moves along
	player = new Player();
	arcs = [];
	canvas = document.getElementById('canvas');
	canvas.style.fontFamily = "BumpItUp";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx = canvas.getContext('2d');
	originX = canvas.width / 2;
	originY = canvas.height / 2;
	gameOver = false;
	gamePaused = false;
	restart = false;
	createStars();
	createGuideRings();
	score = 0;
	pointRate = 1;
	arcSurvivedForScore = 0;
	playerAngularSpeedUpgradeCost = 10000;
	purchaseScreen = false;
	arcsSurvived = 0;
}

init();
GameState.buyPlayerAngularSpeed(savedData['playerAngularSpeed']);

function mod(n, m) {
	//https://jsperf.com/negative-modulo/2

	//javascript built-in mod returns negative numbers, so I need this to fix that
	return ((n % m) + m) % m;
}

function isBetween(start, end, mid) {
	//https://math.stackexchange.com/q/1044922
	start *= rad2deg;
	end *= rad2deg;
	mid *= rad2deg;
	start = mod(start, 360);
	end = mod(end, 360);
	mid = mod(mid, 360);
	end = (end - start) < 0.0 ? end - start + 360.0 : end - start;
	mid = (mid - start) < 0.0 ? mid - start + 360.0 : mid - start;
	return (mid < end);
}

function animationLoop() {

	currentScreenTime = Date.now();
	refreshTime = currentScreenTime - lastScreenTime; //milliseconds
	lastScreenTime = currentScreenTime;

	if (showTitleScreen) {
		Render.renderLoadScreen();
		if (fontLoaded) { // wait for font assets to get loaded
			if (!audioLoaded) {
				loadArcadeAudio();
			}
			else { // don't do this until the game is ready to play (font and audio loaded)
				Render.renderTitleScreen();
				GameState.updateStars();
				GameState.checkForRestart();
				if (restart) {
					showTitleScreen = false;
					init();
					if (savedData['playerAngularSpeed']) {
						GameState.buyPlayerAngularSpeed(savedData['playerAngularSpeed']);
					}
				}
			}
		}
	}
	else {
		if (gamePaused) {
			Hud.drawPause();
			GameState.checkForUnpause();
		}
		else {
			if (gameOver) {


				GameState.checkForPurchase();
				if (purchaseScreen) {
					GameState.handlePurchases();
					Render.renderPurchaseScreen();
				}
				GameState.checkForRestart();
				if (restart) {
					init();
					if (savedData['playerAngularSpeed']) {
						GameState.buyPlayerAngularSpeed(savedData['playerAngularSpeed']);
					}
				}
			} else {
				GameState.update(); //entire game state

				Render.render(refreshTime); //update graphics now
				if (gameOver) {
					if (score > savedData['highScore']) {
						savedData['highScore'] = score;
						localStorage.setItem('sis_highScore', savedData['highScore']);
					}
					Render.endGame();
				}
			}
		}
	}

	requestAnimationFrame(animationLoop);

}

// start the game
animationLoop();