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
       *  Number of points on the star.
       **/
      numPoints: {
        enumerable: true,
        writable: false,
        value: 5
      },
      /**
       *  Number of pixels along each side of the star.
       **/
      pxPerSide: {
        enumerable: true,
        writable: false,
        value: 8
      },
      pixels: {
        enumerable: true,
        writable: false,
        value: new PixelBuffer({
          numPixels: 80
        })
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
