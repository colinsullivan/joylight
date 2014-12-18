/**
 *  @file       LightAnimation.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2014 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

(function () {
  "use strict";
  
 
  /**
   *  @class        LightAnimation
   *
   *  @classdesc    Base functionality for each lighting animation.
   **/ 
  this.LightAnimation = function (params) {
    params = params || {};

    Object.defineProperties(this, {
      pixels: {
        enumerable: true,
        writable: false,
        value: []
      }
    });

  };

  this.LightAnimation.prototype = Object.create(null, {
    tick: {
      enumerable: true,
      writable: false,
      value: function (t) {
        
      }
    }
  });

  module.exports = this.LightAnimation;
  

}).call(this);
