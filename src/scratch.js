#!/usr/bin/env node

// Simple red/blue fade with Node and opc.js

var OPC = new require('./lib/opc')
var client = new OPC('localhost', 7890);

function draw() {
    var t = new Date().getTime() * 0.003;

    for (var pixel = 0; pixel < 8; pixel++)
    {
        t = pixel * 0.1 + t;
        //var red = 128 + 96 * Math.sin(t);
        //var green = 128 + 20 * Math.sin(t + 0.1);
        //var blue = 128 + 96 * Math.sin(t + 0.9);
        var red = 96 * Math.sin(t);
        var green = 96 * Math.sin(t);
        var blue = 96 * Math.sin(t);

        client.setPixel(pixel, red, green, blue);
    }
    client.writePixels();
}

setInterval(draw, 30);
