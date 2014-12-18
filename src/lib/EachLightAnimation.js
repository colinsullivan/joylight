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
      numPixels: {
        enumerable: true,
        writable: false,
        value: 80
      },
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

    for (i = 0; i < this.numPixels; i++) {
      this.pixels.push([0, 0, 0]);
    }

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
        if (this.timeSincePixelOn === null || timeSincePixelOn > 500) {
          for (i = 0; i < this.pixels.length; i++) {

            if (i === this.currentPixelIndex) {
              this.pixels[i][0] = 255;
              this.pixels[i][1] = 255;
              this.pixels[i][2] = 255;
              this.currentPixelOnTime = t;
            } else {
              this.pixels[i][0] = 0;
              this.pixels[i][1] = 0;
              this.pixels[i][2] = 0;
            }

          }
          this.currentPixelIndex = this.currentPixelIndex + 1;
        }


        
      }
    }

  });

  module.exports = this.EachLightAnimation;
  

}).call(this);
