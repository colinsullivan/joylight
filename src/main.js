#!/usr/bin/env node

var OPC = new require('./lib/opc'),
  _ = require("underscore"),
  client = new OPC('localhost', 7890),
  EachLightAnimation = require("./lib/EachLightAnimation.js"),
  ExplosionAnimation = require("./lib/ExplosionAnimation.js"),
  SnakeAnimation = require("./lib/SnakeAnimation.js"),
  SegmentFlowAnimation = require("./lib/SegmentFlowAnimation.js"),
  RotatingPointAnimation = require("./lib/RotatingPointAnimation.js");

// The star has 80 pixels.
var currentAnimation,
  availableAnimations = [],
  pixel_map,
  actual_pixels = [],
  i;

for (i = 0; i < 80; i++) {
  actual_pixels.push([0, 0, 0]);
}

// for testing
//currentAnimation = new EachLightAnimation();
//currentAnimation = new ExplosionAnimation();
currentAnimation = new SnakeAnimation();

availableAnimations = [
  new ExplosionAnimation(),
  new SnakeAnimation(),
  //new SegmentFlowAnimation(),
  new RotatingPointAnimation()
];


pixel_map = function (pixel) {
  var led = pixel;

  return led;
};

// main animation loop
function draw () {
  var t = new Date().getTime(),
    pixels,
    i;

  currentAnimation.tick(t);
  pixels = currentAnimation.get_pixel_buffer();

  for (i = 0; i < 40; i++) {
    actual_pixels[i][0] = pixels[i][0];
    actual_pixels[i][1] = pixels[i][1];
    actual_pixels[i][2] = pixels[i][2];
  }

  for (i = 40; i < 80; i++) {
    actual_pixels[i][0] = pixels[79 - i + 40][0];
    actual_pixels[i][1] = pixels[79 - i + 40][1];
    actual_pixels[i][2] = pixels[79 - i + 40][2];
  }

  if (process.env.SIMULATOR) {
    client.mapPixels(
      pixel_map,
      pixels
    );
  } else {
    client.mapPixels(
      pixel_map,
      actual_pixels
    );
    
  }

}

function change_animation () {

  nextAnimation = _.sample(availableAnimations);

  currentAnimation = nextAnimation;
  // debugging a single animation
  //currentAnimation = _.last(availableAnimations);

  setTimeout(change_animation, 5000);
  
}
change_animation();
setInterval(draw, 30);
