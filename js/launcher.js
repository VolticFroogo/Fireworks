function UpdateLauncher(delta, canvas) {
    // Calculate the position of the base of the launcher.
    LauncherBase.x = canvas.width / 2;
    LauncherBase.y = canvas.height;

    // Update our current rotation by speed times delta.
    if (Forwards) {
        Rotation += RotationSpeed * delta;
    } else {
        Rotation -= RotationSpeed * delta;
    }

    // Set the length to a size relative to our canvas size.
    var length = canvas.width / 10;

    // Calculate the edge of the turret from its base position and rotation.
    TurretPosition.x = LauncherBase.x - length * Math.sin(Rotation);
    TurretPosition.y = LauncherBase.y - length * Math.cos(Rotation);

    if (Rotation >= MaxRotation) {
        // Our launcher has hit its max left distance.
        Forwards = false;
    } else if (Rotation <= -MaxRotation) {
        // Our launcher has hit its max right distance.
        Forwards = true;
    }

    // If it's time to launch the next firework:
    if (NextLaunch <= new Date().getTime()) {
        // Setup the time to create the next firework.
        NextLaunch = new Date().getTime() + Random(MaxLaunchTime, MinLaunchTime);

        // Calculate the position of the new firework.
        var position = {
            x: TurretPosition.x,
            y: TurretPosition.y
        };

        // Calculate the velocity of the new firework.
        var velocity = {
            x: (TurretPosition.x - LauncherBase.x) * 2560 / canvas.width,
            y: (TurretPosition.y - LauncherBase.y) * 2560 / canvas.width
        };

        // Create the new firework from the position and velocity.
        var firework = new Firework(position, velocity);

        // Push our new firework to the firework array.
        Fireworks.push(firework);
    }
}

function RenderLauncher(c, canvas) {
    // Set the radius of the turret and stroke relative to our canvas size.
    var radius = canvas.width / 20;
    var stroke = Math.round(canvas.width / 50);

    // Draw our turret line.
    c.strokeStyle = "rgba(200, 200, 200, 1)";
    c.lineWidth = stroke;
    c.beginPath();
    c.moveTo(canvas.width / 2, canvas.height);
    c.lineTo(TurretPosition.x, TurretPosition.y);
    c.stroke();

    // Draw our launcher base.
    c.fillStyle = "rgba(255, 255, 255, 1)";
    c.beginPath();
    c.arc(LauncherBase.x, LauncherBase.y, radius, Math.PI, Math.PI * 2);
    c.fill();
}