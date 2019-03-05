// Global arrays:
var Fireworks = [];
var Particles = [];

// Physics constants:
const VelocityAmplifier = 0.005;
const FireworkGravity = 0.2;
const ParticleGravity = 0.03;
const FireworkDrag = 0.9999;
const ParticleDrag = 0.999;

// Firework constants:
const ParticlesFromFirework = 100;

// Particle constants:
const Decay = 0.0005;

// Colours:
const Colours = [
    { // White.
        Red: 255,
        Green: 255,
        Blue: 255
    },
    { // Red.
        Red: 255,
        Green: 0,
        Blue: 0
    },
    { // Green.
        Red: 0,
        Green: 255,
        Blue: 0
    },
    { // Blue.
        Red: 0,
        Green: 0,
        Blue: 255
    },
    { // Cyan.
        Red: 255,
        Green: 255,
        Blue: 0
    },
    { // Dark blue.
        Red: 255,
        Green: 0,
        Blue: 255
    },
    { // Magenta.
        Red: 0,
        Green: 255,
        Blue: 255
    },
];

// Launcher constants:
const RotationSpeed = Math.PI / 3000;
const MinLaunchTime = 200;
const MaxLaunchTime = 500;

// Launcher variables:
var Rotation = 0;
var Forwards = true;
var MaxRotation = Math.PI / 4;
var NextLaunch = new Date().getTime() + Random(MaxLaunchTime, MinLaunchTime);

var LauncherBase = {
    x: 0,
    y: 0
};

var TurretPosition = {
    x: 0,
    y: 0
};

// Render variables:
var LastFrame = new Date().getTime();