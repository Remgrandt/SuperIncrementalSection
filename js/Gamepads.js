// https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API

class Gamepads {
    static gamepadHandler(event, connecting) {
        var gamepad = event.gamepad;
        // Note:
        // gamepad === navigator.getGamepads()[gamepad.index]

        if (connecting) {
            gamepads[gamepad.index] = gamepad;
        } else {
            delete gamepads[gamepad.index];
        }
    }

    static checkForGamepad() {
        var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
        return (gamepads && gamepads[0]);
    }

    static buttonPressed(b) {
        if (typeof (b) == "object") {
            return b.pressed;
        }
        return b == 1.0;
    }
}

window.addEventListener("gamepadconnected", function (e) { Gamepads.gamepadHandler(e, true); }, false);

window.addEventListener("gamepaddisconnected", function (e) { Gamepads.gamepadHandler(e, false); }, false);

var gamepads = {};