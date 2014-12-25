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

        var i,
          absoluteIndex,
          hue;
    
        this.headPosition += 0.000000000001 * t;

        this.pixels.all_off();

        for (i = 0; i < this.snakeBrightness.length; i++) {
          absoluteIndex = this.pixels.wrap_index(Math.round(this.headPosition) + i);
          if (absoluteIndex % 2) {
            hue = (140.0/360.0);
          } else {
            hue = 1.0;
          }

          this.pixels.set_hsv(
            absoluteIndex,
            hue,
            1.0,
            this.snakeBrightness[i]
          );
        }

      }
    }
  });
  

  module.exports = this.SnakeAnimation;

}).call(this);
