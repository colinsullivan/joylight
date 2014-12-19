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
      numPoints: {
        enumerable: true,
        writable: false,
        value: 5
      },
      pxPerSide: {
        enumerable: true,
        writable: false,
        value: 8
      }
    });

    Object.defineProperties(this, {
      /**
       *  Brightness along the star point
       **/
      brightnessAnimation: {
        enumerable: false,
        writable: false,
        value: new Array(this.pxPerSide)
      },


      /**
       *  Hue for each star point
       **/
      hueAnimation: {
        enumerable: false,
        writable: false,
        value: new Array(this.numPoints)
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
          x;

        // move the brightness animation along, creating the "outward" motion
        // effect
        for (i = 0; i < this.pxPerSide; i++) {
          x = 0.1 * i + t * 0.003;
          this.brightnessAnimation[i] = Math.sin(x);
        }

        // hue of each star point
        for (i = 0; i < this.numPoints; i++) {
          x = (i / this.numPoints) + t * 0.001;
          this.hueAnimation[i] = 0.5 * Math.sin(x) + 0.5;
        }
      }
    },
    get_pixel_buffer: {
      enumerable: true,
      writable: false,
      value: function () {
        var i,
          p,
          pointTopLeftIndex,
          pointTopRightIndex,
          pointEndIndex,
          internalIndex;

        // for each point
        for (p = 0; p < this.numPoints; p++) {
          pointTopLeftIndex = (
            p * this.pxPerSide * 2.0
          );
          pointTopRightIndex = (pointTopLeftIndex - 1);
          if (pointTopRightIndex < 0) {
            pointTopRightIndex += this.pixels.length;
          }

          for (i = 0; i < this.pxPerSide; i++) {
            
            // left side of point
            this.pixels.set_hsv(
              pointTopLeftIndex + i,
              this.hueAnimation[p],
              1.0,
              this.brightnessAnimation[i]
            );

            // right side of point
            this.pixels.set_hsv(
              pointTopRightIndex - this.pxPerSide + i + 1,
              this.hueAnimation[p],
              1.0,
              this.brightnessAnimation[
                this.brightnessAnimation.length - 1 - i
              ]
            );

          }

        }

        return this.pixels.buffer;
    
        
      }
    }
  });

  module.exports = this.ExplosionAnimation;
  

}).call(this);
