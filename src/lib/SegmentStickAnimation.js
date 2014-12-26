/**
 *  @file       SegmentStickAnimation.js
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
   *  @class        SegmentStickAnimation
   *
   *  @classdesc    Consecutively lighting up sides of star
   **/ 
  this.SegmentStickAnimation = function (params) {
    StarAnimation.apply(this, arguments);

    Object.defineProperties(this, {
      currentSide: {
        enumerable: false,
        writable: true,
        value: 0
      },
      timePerSide: {
        enumerable: false,
        writable: true,
        value: 1000
      },
      lastSideTime: {
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

  this.SegmentStickAnimation.prototype = Object.create(StarAnimation.prototype, {
    tick: {
      enumerable: true,
      writable: false,
      value: function (t) {
        StarAnimation.prototype.tick.apply(this, arguments);

        var i,
          px,
          timeSinceLastSide = t - this.lastSideTime;

        this.pixels.all_off();
    
        // light current side
        for (i = 0; i < this.pxPerSide; i++) {

          px = this.currentSide * this.pxPerSide + i;
          this.pixels.set_hsv(
            px,
            this.currentHue,
            1.0,
            1.0
          );
        }

        if (timeSinceLastSide >= this.timePerSide) {
          this.currentSide += 1;

          if (this.currentSide >= this.numSides) {
            this.currentSide = 0;
          }

          this.lastSideTime = t;
          this.timePerSide *= 0.9;

          if (this.timePerSide < 0.0001) {
            this.timePerSide = 1000;
          }

          this.currentHue += 0.02;
          if (this.currentHue >= 1.0) {
            this.currentHue = 0.0;
          }
        }
      }
    }
  });
  

  module.exports = this.SegmentStickAnimation;

}).call(this);
