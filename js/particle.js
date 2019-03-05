class Particle {
    constructor(position, colour) {
        this.Position = position;

        var direction = Random(1, 360);
        var power = Random(1, 100);

        this.Velocity = {
            x: power * Math.sin(direction * Math.PI / 180),
            y: power * Math.cos(direction * Math.PI / 180)
        };

        this.Alpha = Random(100, 80) / 100;
        this.Colour = colour;
    }

    Update(delta, index) {
        // Decay the particle.
        this.Alpha -= Decay * delta;

        // If we are invisble:
        if (this.Alpha <= 0) {
            // Remove this particle from the particle array.
            Particles.splice(index, 1);

            // Return as we don't need to do anything else with this particle.
            return;
        }

        // Update the particle's position using the velocity and delta.
        this.Position.x += this.Velocity.x * delta * VelocityAmplifier;
        this.Position.y += this.Velocity.y * delta * VelocityAmplifier;

        // Add gravity to the particle.
        this.Velocity.y += ParticleGravity * delta;
    
        // Add drag to the particle.
        for (var i = 0; i < delta; i++) {
            this.Velocity.x *= ParticleDrag;
            this.Velocity.y *= ParticleDrag;
        }
    }

    Render(c, canvas) {
        // Calculate the radius relative to the page width.
        var radius = canvas.width / 500;

        // Draw the particle.
        c.fillStyle = "rgba(" + this.Colour.Red + ", " + this.Colour.Green + ", " + this.Colour.Blue + ", " + this.Alpha + ")";
        c.beginPath();
        c.arc(this.Position.x, this.Position.y, radius, 0, Math.PI * 2);
        c.fill();
    }
}

function UpdateParticles(delta) {
    // Iterate through every particle:
    Particles.forEach(function(particle, index) {
        // Update the particle.
        particle.Update(delta, index);
    });
}

function RenderParticles(c, canvas) {
    // Iterate through every particle:
    Particles.forEach(function(particle) {
        // Render the particle.
        particle.Render(c, canvas);
    });
}