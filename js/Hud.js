class Hud {

    static drawText(font, color, baseline, align, text, x, y) {
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.textBaseline = baseline;
        ctx.textAlign = align;
        ctx.fillText(text, x, y);
    }

    static updateScore() {
        score += pointRate;
    }

    static drawScore() {
        var x = canvas.width > squareScreenSize ? (canvas.width - squareScreenSize) / 2 : 0;
        Hud.drawText("bold " + squareScreenSize / 40 + "px Arial", "#b58900", "top", "left", "SCORE " + Math.floor(score), x, 0)

        var hi_x = canvas.width > squareScreenSize ? canvas.width - (canvas.width - squareScreenSize) / 2 : canvas.width;
        Hud.drawText("bold " + squareScreenSize / 40 + "px Arial", "#b58900", "top", "right", "HIGH SCORE " + Math.floor(savedData['highScore']), hi_x, 0);
    }

    static drawWave() {
        Hud.drawText("bold " + squareScreenSize / 40 + "px Arial", "#b58900", "top", "left", "WAVE " + arcSurvivedForScore, (canvas.width - squareScreenSize) / 2, squareScreenSize / 40);
    }

    static drawFPS(refreshTime) {
        var fps = Math.floor(1 / (refreshTime / 1000));
        Hud.drawText("bold " + squareScreenSize / 40 + "px Arial", "#b58900", "top", "left", "FPS " + fps, (canvas.width - squareScreenSize) / 2, (squareScreenSize / 40) * 4);
    }

    static drawPause() {

        Hud.drawText("bold " + squareScreenSize / 10 + "px BumpItUp", "#b58900", "middle", "center", "PAUSE", originX, originY);
    }

    static drawShields() {
        ctx.fillStyle = "rgb(38,139,210)";
        var shieldSize = squareScreenSize / 40;
        ctx.fillRect((canvas.width - squareScreenSize) / 2, (squareScreenSize / 40) * 2, shieldSize, shieldSize);
        Hud.drawText("bold " + squareScreenSize / 40 + "px Arial", "#b58900", "top", "left",player.shields, (canvas.width - squareScreenSize) / 2 + shieldSize * 1.1, (squareScreenSize / 40) * 2);
    }
}