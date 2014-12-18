/**
 *  @file       PixelBuffer.js
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2014 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

(function () {
  "use strict";

  var _ = require("underscore");
  
 
  /**
   *  @class        PixelBuffer
   *
   *  @classdesc    A self-initializing buffer of pixels whose values can be
   *  set with rgb or hsv.
   **/ 
  this.PixelBuffer = function (params) {
    params = params || {};

    var i;

    if (_.isUndefined(params.numPixels) || _.isNull(params.numPixels)) {
      throw new Error("params.numPixels is undefined");
    }

    Object.defineProperties(this, {
      _buffer: {
        enumerable: false,
        writable: false,
        value: []
      },
      _numPixels: {
        enumerable: false,
        writable: false,
        value: params.numPixels
      }
    });

    for (i = 0; i < this._numPixels; i++) {
      this._buffer[i] = [0, 0, 0];
    }

  };

  this.PixelBuffer.prototype = Object.create(null, {
    buffer: {
      enumerable: true,
      get: function () {
        return this._buffer;
      }
    },
    length: {
      enumerable: true,
      get: function () {
        return this._buffer.length;
      }
    },
    get: {
      enumerable: true,
      writable: false,
      value: function (i) {

        return this._buffer[i];
    
        
      }
    },
    /**
     *  Set the value of a single pixel to the given RGB values.
     **/
    set_rgb: {
      enumerable: true,
      writable: false,
      value: function (i, r, g, b) {
        if (_.isArray(r)) {
          g = r[1];
          b = r[2];
          r = r[0];
        }

        this._buffer[i][0] = r;
        this._buffer[i][1] = g;
        this._buffer[i][2] = b;
      }
    },

    /*all_off: {
      enumerable: true,
      writable: false,
      value: function () {
        var i;

        for (i = 0; i < this._numPixels; i++) {
          this._buffer[i][0] = 0;
          this._buffer[i][1] = 0;
          this._buffer[i][2] = 0;
        }
        
      }
    }*/
  });

  module.exports = this.PixelBuffer;

}).call(this);
