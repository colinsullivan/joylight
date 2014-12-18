#!/usr/bin/env node

// Simple red/blue fade with Node and opc.js

var OPC = new require('./lib/opc')
var client = new OPC('localhost', 7890);

function draw() {
    var millis = new Date().getTime();

    for (var pixel = 0; pixel < 80; pixel++)
    {
        var t = pixel * 0.2 + millis * 0.002;
        var red = 128 + 96 * Math.sin(t);
        var green = 128 + 20 * Math.sin(t + 0.1);
        var blue = 128 + 96 * Math.sin(t + 0.9);

        client.setPixel(pixel, red, green, blue);
    }
    client.writePixels();
}

setInterval(draw, 30);
