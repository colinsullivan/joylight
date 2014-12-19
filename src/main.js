#!/usr/bin/env node

var OPC = new require('./lib/opc'),
  client = new OPC('localhost', 7890),
  EachLightAnimation = require("./lib/EachLightAnimation.js"),
  ExplosionAnimation = require("./lib/ExplosionAnimation.js");;

// The star has 80 pixels.
var currentAnimation,
  pixel_map;

// for testing
//currentAnimation = new EachLightAnimation();
currentAnimation = new ExplosionAnimation();

pixel_map = function (pixel) {
  var led = pixel;

  return led;
};

// main animation loop
function draw () {
  var t = new Date().getTime();

  currentAnimation.tick(t);

  client.mapPixels(pixel_map, currentAnimation.get_pixel_buffer());
}
setInterval(draw, 30);
