$(document).ready(function() {
    Render();
});

function Render() {
    // Request the next frame in advance.
    requestAnimationFrame(Render);

    // Calculate the unix time in milliseconds right now.
    var currentFrame = new Date().getTime();

    // Calculate the time difference between the current and previous frame.
    var td = currentFrame - LastFrame;

    // If the time difference is over one second, just set the time difference to zero.
    // This is because if they tab out we don't want to spin the launcher around a thousand
    // times in one direction as it will take the same amount of time to come back.
    var delta = td < 1000 ? td : 0;

    // Get the canvas.
    var canvas = document.getElementById("canvas");
    var c = canvas.getContext("2d");

    // Set the canvas with and height to the size of the page.
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    // Update the launcher.
    UpdateLauncher(delta, canvas);

    // Update the fireworks.
    UpdateFireworks(delta);

    // Update the particles.
    UpdateParticles(delta);

    // Render the background.
    RenderBackground(c, canvas);

    // Render the particles.
    RenderParticles(c, canvas);

    // Render the fireworks.
    RenderFireworks(c, canvas);

    // Render the launcher.
    RenderLauncher(c, canvas);

    // Set the last frame's time to the time of this frame.
    LastFrame = currentFrame;
}

function RenderBackground(c, canvas) {
    // Draw the black background.
    c.fillStyle = "rgba(0, 0, 0, 1)";
    c.fillRect(0, 0, canvas.width, canvas.height);
}