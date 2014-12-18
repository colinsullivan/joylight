/**
 *  @file       EachLightAnimation.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2014 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

(function () {
  "use strict";

  var LightAnimation = require("./LightAnimation.js");

  /**
   *  @class        EachLightAnimation
   *
   *  @classdesc    Simply iterate over each light in order.
   **/ 
  this.EachLightAnimation = function (params) {
    LightAnimation.apply(this, arguments);

    var i;

    Object.defineProperties(this, {
      currentPixelIndex: {
        enumerable: false,
        writable: true,
        value: 0
      },
      currentPixelOnTime: {
        enumerable: false,
        writable: true,
        value: null
      }
    });

  };

  this.EachLightAnimation.prototype = Object.create(LightAnimation.prototype, {

    tick: {
      enumerable: true,
      writable: false,
      value: function (t) {
        LightAnimation.prototype.tick.apply(this, arguments);

        var i,
          timeSincePixelOn;
        
        timeSincePixelOn = t - this.currentPixelOnTime;
        if (this.currentPixelOnTime === null || timeSincePixelOn > 500) {
          for (i = 0; i < this.pixels.length; i++) {

            if (i === this.currentPixelIndex) {
              this.pixels.set_rgb(i, 255, 255, 255);
              this.currentPixelOnTime = t;
            } else {
              this.pixels.set_rgb(i, 0, 0, 0);
            }

          }
          this.currentPixelIndex = this.currentPixelIndex + 1;
        }
      }
    }

  });

  module.exports = this.EachLightAnimation;
  

}).call(this);
