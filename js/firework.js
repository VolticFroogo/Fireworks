class Firework {
    constructor(position, velocity) {
        // Set the class variables from the constructor variables.
        this.Position = position;
        this.Velocity = velocity;

        // Generate a random power multiply the velocity by from 80% to 100%.
        var power = Random(80, 100) / 100;

        // Change the velocity relative to the power.
        this.Velocity.x *= power;
        this.Velocity.y *= power;

        // Generate a random explode time.
        this.ExplodeTime = new Date().getTime() + Random(1000, 1500);
    }

    Update(delta, index) {
        // If it's time to explode the firework or we are about to hit the edge of the page:
        if (this.ExplodeTime <= new Date().getTime() || this.Position.x < 50 || this.Position.x > canvas.width - 50) {
            // Explode the firework.
            this.Explode();

            // Remove the firework from the Fireworks array.
            Fireworks.splice(index, 1);

            // Return as we don't need to do anything else with this firework.
            return;
        }

        // Update the firework's position using the velocity and delta.
        this.Position.x += this.Velocity.x * delta * VelocityAmplifier;
        this.Position.y += this.Velocity.y * delta * VelocityAmplifier;

        // Add gravity to the firework.
        this.Velocity.y += FireworkGravity * delta;
    
        // Add drag to the firework.
        for (var i = 0; i < delta; i++) {
            this.Velocity.x *= FireworkDrag;
            this.Velocity.y *= FireworkDrag;
        }
    }

    Render(c, canvas) {
        // Calculate the radius relative to the page width.
        var radius = canvas.width / 100;

        // Draw the firework.
        c.fillStyle = "rgba(255, 255, 255, 1)";
        c.beginPath();
        c.arc(this.Position.x, this.Position.y, radius, 0, Math.PI * 2);
        c.fill();
    }

    Explode() {
        // Generate a random colour for the particles to be.
        var colour = RandomColour();

        // Run for every particle we should make:
        for (var i = 0; i < ParticlesFromFirework; i++) {
            // Push the the particle array our new particle.
            Particles.push(new Particle({
                x: this.Position.x,
                y: this.Position.y
            },

            colour));
        }
    }
}

function UpdateFireworks(delta) {
    // Iterate through every firework:
    Fireworks.forEach(function(firework, index) {
        // Update the firework.
        firework.Update(delta, index);
    });
}

function RenderFireworks(c, canvas) {
    // Iterate through every firework:
    Fireworks.forEach(function(firework) {
        // Render the firework.
        firework.Render(c, canvas);
    });
}