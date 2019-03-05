function Random(min, max) {
    return Math.floor(Math.random() * Math.floor(max - min)) + min;
}

function RandomColour() {
    // Pick a random colour ID from the length of the colours.
    var colourID = Random(0, Colours.length);

    // Get the colour from the colour ID.
    var colour = Colours[colourID];

    // Return this colour.
    return colour;
}