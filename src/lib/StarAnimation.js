/**
 *  @file       StarAnimation.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2014 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

(function () {
  "use strict";

  var PixelBuffer = require("./PixelBuffer.js");
  
 
  /**
   *  @class        StarAnimation
   *
   *  @classdesc    Base functionality for each lighting animation.
   **/ 
  this.StarAnimation = function (params) {
    params = params || {};

    Object.defineProperties(this, {
      /**
       *  Number of pixels along each side of the star.
       **/
      pxPerSide: {
        enumerable: true,
        writable: false,
        value: 8
      },
      /**
       *  Number of side segments in star
       **/
      numSides: {
        enumerable: true,
        writable: false,
        value: 10
      },
      pixels: {
        enumerable: true,
        writable: false,
        value: new PixelBuffer({
          numPixels: 80
        })
      }
    });

    Object.defineProperties(this, {
      /**
       *  Number of points on the star.
       **/
      numPoints: {
        enumerable: true,
        writable: false,
        value: 5
      },
      pxPerPoint: {
        enumerable: true,
        writable: false,
        value: this.pxPerSide * 2
      },
      firstPointIndex: {
        enumerable: true,
        writable: false,
        value: this.pixels.length - this.pxPerSide
      }
    });

  };

  this.StarAnimation.prototype = Object.create(null, {
    tick: {
      enumerable: true,
      writable: false,
      value: function (t) {
        
      }
    },
    get_pixel_buffer: {
      enumerable: true,
      writable: false,
      value: function () {
        return this.pixels.buffer;
      }
    }
  });

  module.exports = this.StarAnimation;
  

}).call(this);
