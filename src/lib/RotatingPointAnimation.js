/**
 *  @file       RotatingPointAnimation.js
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
   *  @class        RotatingPointAnimation
   *
   *  @classdesc    Consecutively lighting up sides of star
   **/ 
  this.RotatingPointAnimation = function (params) {
    StarAnimation.apply(this, arguments);

    Object.defineProperties(this, {
      currentPoint: {
        enumerable: false,
        writable: true,
        value: 0
      },
      timePerPoint: {
        enumerable: false,
        writable: true,
        value: 1000
      },
      lastPointTime: {
        enumerable: false,
        writable: true,
        value: 0
      },
      currentHue: {
        enumerable: false,
        writable: true,
        value: 0.0
      }
    });

  };

  this.RotatingPointAnimation.prototype = Object.create(StarAnimation.prototype, {
    tick: {
      enumerable: true,
      writable: false,
      value: function (t) {
        StarAnimation.prototype.tick.apply(this, arguments);

        var i,
          px,
          timeSinceLastPoint = t - this.lastPointTime;

        this.pixels.all_off();
    
        // light current side
        for (i = 0; i < this.pxPerPoint; i++) {

          px = this.pixels.wrap_index(
            this.firstPointIndex + (this.currentPoint * this.pxPerPoint) + i
          );
          this.pixels.set_hsv(
            px,
            this.currentHue,
            1.0,
            1.0
          );
        }

        if (timeSinceLastPoint >= this.timePerPoint) {
          this.currentPoint += 1;

          if (this.currentPoint >= this.numPoints) {
            this.currentPoint = 0;
          }

          this.lastPointTime = t;
          this.timePerPoint *= 0.9;

          if (this.timePerPoint < 0.0001) {
            this.timePerPoint = 1000;
          }

          this.currentHue += 0.02;
          if (this.currentHue >= 1.0) {
            this.currentHue = 0.0;
          }
        }
      }
    }
  });
  

  module.exports = this.RotatingPointAnimation;

}).call(this);
