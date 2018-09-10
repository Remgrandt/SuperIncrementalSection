class ArcFactory {

    /* 
    // An arc that will always kill the player. turns out the game seems to be hard enough without this
    static deathArc() {
        arcs.push(new Arc(0, "#dc322f", 360.0 * deg2rad, 0.0 * deg2rad, (Math.random() < 0.5 ? -1 : 1) * speedDifficulty * deg2rad));
    }
    */

    // make a sort of random arc
    static random() {
        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        // limit the art to be near the previous arc. pure randomness makes the game impossible
        var startAngle = plusOrMinus * ArcFactory.previousStartAngle + Math.random() * ArcFactory.clusterDifficulty + ArcFactory.minimumShift;
        // limit the size of the arc. don't want it to be too big or too small
        var stopAngle = startAngle - (Math.random() * ArcFactory.clusterDifficulty + ArcFactory.minimumShift);

        arcs.push(new Arc(0, "220, 50, 47", startAngle, stopAngle, (Math.random() < 0.5 ? -1 : 1) * ArcFactory.speedDifficulty * deg2rad));
        ArcFactory.previousStartAngle = startAngle;
        ArcFactory.previousStopAngle = stopAngle;
    }

    static arcGeneration() {
        ArcFactory.framesSinceArc += 1;
        if (ArcFactory.framesSinceArc > ArcFactory.arcInterval) {
            ArcFactory.framesSinceArc = 0;
            arcsSurvived += 1;
            if (arcsSurvived % 100 == 0) {
                //ArcFactory.deathArc();
                ArcFactory.speedDifficulty += .1
            }
            ArcFactory.random();
        }
    }
}
ArcFactory.arcInterval = 30;
ArcFactory.framesSinceArc = 0;
ArcFactory.minimumShift = 60.0 * deg2rad;
ArcFactory.clusterDifficulty = 60.0 * deg2rad; //scaled 0 to 360, determines the randomness of the arc location.
ArcFactory.previousStartAngle = Math.random() * Math.PI * 2;
ArcFactory.previousStopAngle = ArcFactory.previousStartAngle - ArcFactory.clusterDifficulty;
ArcFactory.speedDifficulty = .1; //0 is no movement, 1 is moving 1 degree per frame. no limit.