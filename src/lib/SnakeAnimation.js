/**
 *  @file       SnakeAnimation.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2014 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

(function () {
  "use strict";

  var StarAnimation = require("./StarAnimation.js"),
    PixelBuffer = require("./PixelBuffer.js");
  
 
  /**
   *  @class        SnakeAnimation
   *
   *  @classdesc    Lights traversing around edge of star.
   **/ 
  this.SnakeAnimation = function (params) {
    StarAnimation.apply(this, arguments);

    var i;

    Object.defineProperties(this, {
      headPosition: {
        enumerable: false,
        writable: true,
        value: 0
      },
      snakeBrightness: {
        enumerable: false,
        writable: false,
        value: new Array(24)
      }
    });

    this.snakeBrightnessCoef = (Math.PI / this.snakeLength);

    for (i = 0; i < this.snakeBrightness.length; i++) {
      this.snakeBrightness[i] = (Math.sin(
        (1.0 - (i / this.snakeBrightness.length)) * Math.PI + (Math.PI/2.0)
      ) * 0.5 + 0.5);
    }

  };

  this.SnakeAnimation.prototype = Object.create(StarAnimation.prototype, {
    tick: {
      enumerable: true,
      writable: false,
      value: function (t) {
        StarAnimation.prototype.tick.apply(this, arguments);

        var i;
    
        this.headPosition += 0.000000000001 * t;

        /*for (i = 0; i < this.snakePixels.length; i++) {
          this.snakePixels.set_hsv(
            i,
            1.0,
            1.0,
            Math.sin(this.snakeBrightnessCoef * (i / this.snakePixels.length))
          );
        }*/

      }
    },
    get_pixel_buffer: {
      enumerable: true,
      writable: false,
      value: function () {
        var i;

        this.pixels.all_off();

        for (i = 0; i < this.snakeBrightness.length; i++) {
          this.pixels.set_hsv(
            this.pixels.wrap_index(Math.round(this.headPosition) + i),
            1.0,
            1.0,
            this.snakeBrightness[i]
          );
        }
        /*var i,
          snakeTopPosition = (
            this.headPosition + (this.snakeLength / 2.0)
          ),
          snakeBottomPosition = (
            this.headPosition - (this.snakeLength / 2.0)
          );

        this.pixels.all_off();

        for (i = 0; i < this.snakeLength; i++) {
          this.pixels.set_hsv(
            this.pixels.wrap_index(snakeBottomPosition + i),
            1.0,
            1.0,
            Math.sin(this.snakeBrightnessCoef * (i / this.snakeLength))
          );
        }*/



        /*var i,
          headIndex = Math.floor(this.headPosition) % this.pixels.length,
          halfPi = Math.PI/2.0,
          perc,
          pixelIndex;


        for (i = 0; i < this.snakeLength; i++) {
          perc = (i / this.snakeLength);
        }

        // tail
        for (i = 0; i < this.tailWidth; i++) {
          pixelIndex = (
            headIndex - this.tailWidth + i
          );
          if (pixelIndex < 0) {
            pixelIndex += this.pixels.length;
          }
          this.pixels.set_hsv(
            pixelIndex,
            1.0,
            1.0,
            Math.sin(halfPi * (i / this.tailWidth))
          );
        }

        // the head
        this.pixels.set_hsv(
          headIndex,
          1.0,
          1.0,
          1.0
        );

        for (i = 0; i < this.headWidth; i++) {
          pixelIndex = (
            headIndex + i - 1
          );

          if (pixelIndex < 0) {
            pixelIndex += this.pixels.length;
          } else {
            pixelIndex = pixelIndex % this.pixels.length;
          }

          this.pixels.set_hsv(
            pixelIndex,
            1.0,
            1.0,
            Math.sin(halfPi + halfPi * (i / this.headWidth))
          );
        }*/


        return this.pixels.buffer;

      }
    }
  });
  

  module.exports = this.SnakeAnimation;

}).call(this);
