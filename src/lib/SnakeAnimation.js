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

  var StarAnimation = require("./StarAnimation.js");
  
 
  /**
   *  @class        SnakeAnimation
   *
   *  @classdesc    Lights traversing around edge of star.
   **/ 
  this.SnakeAnimation = function (params) {
    StarAnimation.apply(this, arguments);

    Object.defineProperties(this, {
      headPosition: {
        enumerable: false,
        writable: true,
        value: 0
      },
      snakeLength: {
        enumerable: false,
        writable: false,
        value: 24
      },
      snakeBrightnessCoef: {
        enumerable: false,
        writable: true,
        value: 0
      }
    });

  };

  this.SnakeAnimation.prototype = Object.create(StarAnimation.prototype, {
    tick: {
      enumerable: true,
      writable: false,
      value: function (t) {
        StarAnimation.prototype.tick.apply(this, arguments);
    
        this.headPosition += 0.0000000000001 * t % this.pixels.length;
        this.snakeBrightnessCoef = (Math.PI / this.snakeLength) + this.headPosition;
      }
    },
    get_pixel_buffer: {
      enumerable: true,
      writable: false,
      value: function () {
        var i,
          snakeStartIndex = (
            this.headPosition + (this.snakeLength / 2.0)
          ),
          snakeEndIndex = (
            this.headPosition - (this.snakeLength / 2.0)
          );

        this.pixels.all_off();


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
