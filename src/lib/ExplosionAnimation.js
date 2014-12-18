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
  
  var LightAnimation = require("./LightAnimation.js");
 
  /**
   *  @class        ExplosionAnimation
   *
   *  @classdesc    Lights start from center and move outwards towards point.
   **/ 
  this.ExplosionAnimation = function (params) {
    LightAnimation.apply(this, arguments);

    var i;

    Object.defineProperties(this, {
      numPixels: {
        enumerable: true,
        writable: false,
        value: 8
      }
    });

    for (i = 0; i < this.numPixels; i++) {
      this.pixels.push([0, 0, 0]);
    }

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
        for (i = 0; i < this.pixels.length; i++) {
          x = 0.1 * i + adjustedTime;
          this.pixels[i][0] = 96 * Math.sin(x);
          this.pixels[i][1] = 96 * Math.sin(x);
          this.pixels[i][2] = 96 * Math.sin(x);
        }

      }
    },
    get_pixel_map: {
      enumerable: true,
      writable: false,
      value: function () {
        //LightAnimation.prototype.get_pixel_map.apply(this, arguments);
        
        var i,
          numPixels = 80,
          numPoints = 5,
          pixelMap = [];

        // initialize all pixels
        for (i = 0; i < numPixels; i++) {
          pixelMap.push([0, 0, 0]);
        }


        // first point
        for (i = 0; i < 8; i++) {
          pixelMap[i][0] = this.pixels[i][0];
          pixelMap[i][1] = this.pixels[i][1];
          pixelMap[i][2] = this.pixels[i][2];
        }
        var internalIndex;
        for (i = numPixels - 8; i < numPixels; i++) {
          internalIndex = this.numPixels - 1 - (i%this.numPixels);
          console.log("internalIndex");
          console.log(internalIndex);
          pixelMap[i][0] = this.pixels[internalIndex][0];
          pixelMap[i][1] = this.pixels[internalIndex][1];
          pixelMap[i][2] = this.pixels[internalIndex][2];
        }

        return pixelMap;
    
        
      }
    }
  });

  module.exports = this.ExplosionAnimation;
  

}).call(this);
