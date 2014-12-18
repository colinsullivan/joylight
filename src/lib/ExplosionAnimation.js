/**
 *  @file       ExplosionAnimation.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2014 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

(function () {
  "use strict";
  
  var LightAnimation = require("./LightAnimation.js"),
    PixelBuffer = require("./PixelBuffer.js");
 
  /**
   *  @class        ExplosionAnimation
   *
   *  @classdesc    Lights start from center and move outwards towards point.
   **/ 
  this.ExplosionAnimation = function (params) {
    LightAnimation.apply(this, arguments);

    var i;

    Object.defineProperties(this, {
      animationPixels: {
        enumerable: false,
        writable: false,
        value: new PixelBuffer({
          numPixels: 8
        })
      }
    });

  };

  this.ExplosionAnimation.prototype = Object.create(LightAnimation.prototype, {
    tick: {
      enumerable: true,
      writable: false,
      value: function (t) {
        LightAnimation.prototype.tick.apply(this, arguments);
    
        var i,
          adjustedTime = t * 0.003,
          x;

        for (i = 0; i < this.animationPixels.length; i++) {
          x = 0.1 * i + adjustedTime;
          this.animationPixels.set_rgb(
            i,
            96 * Math.sin(x),
            96 * Math.sin(x),
            96 * Math.sin(x)
          );
        }

      }
    },
    get_pixel_buffer: {
      enumerable: true,
      writable: false,
      value: function () {
        //LightAnimation.prototype.get_pixel_map.apply(this, arguments);
        
        var i,
          pointIndex,
          numPoints = 5,
          pointStartIndex,
          pointEndIndex,
          internalIndex;

        // for each point
        for (pointIndex = 0; pointIndex < numPoints; pointIndex++) {
          pointStartIndex = pointIndex * 16;
          for (i = 0; i < 8; i++) {
            this.pixels.set_rgb(
              pointStartIndex + i,
              this.animationPixels.get(i)
            );
          }
          pointEndIndex = pointStartIndex + 16;
          for (i = pointEndIndex - 8; i < pointEndIndex; i++) {
            internalIndex = this.animationPixels.length - 1 - (
              i%this.animationPixels.length
            );

            this.pixels.set_rgb(
              i,
              this.animationPixels.get(internalIndex)
            );
          }
        }

        return this.pixels.buffer;
    
        
      }
    }
  });

  module.exports = this.ExplosionAnimation;
  

}).call(this);
