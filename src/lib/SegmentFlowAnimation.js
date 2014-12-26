/**
 *  @file       SegmentFlowAnimation.js
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
   *  @class        SegmentFlowAnimation
   *
   *  @classdesc    Consecutively lighting up the points of the star.
   **/ 
  this.SegmentFlowAnimation = function (params) {
    StarAnimation.apply(this, arguments);

    var i;

    Object.defineProperties(this, {
      /**
       *  Point that we are currently animating 
       **/
      currentPoint: {
        enumerable: false,
        writable: true,
        value: 0
      },
      /**
       *  Amount of time to animate between each point
       **/
      timePerPoint: {
        enumerable: true,
        writable: true,
        value: 1000
      },
      /**
       *  Time last point was activated
       **/
      lastPointTime: {
        enumerable: false,
        writable: true,
        value: 0
      },
      pointHues: {
        enumerable: false,
        writable: false,
        value: new Array(this.numPoints)
      },
      /**
       *  difference in hue from one point to the next.
       **/
      pointHueDifference: {
        enumerable: false,
        writable: false,
        value: 0.04
      }
    });

    for (i = 0; i < this.pointHues.length; i++) {
      this.pointHues[i] = i * this.pointHueDifference;
    }

  };

  this.SegmentFlowAnimation.prototype = Object.create(StarAnimation.prototype, {
    tick: {
      enumerable: true,
      writable: false,
      value: function (t) {
        StarAnimation.prototype.tick.apply(this, arguments);

        var render_points = function () {
          
        };

        /*var s,
          p,
          timeSinceLastPoint = t - this.lastPointTime,
          pointIndex,
          pixelIndex,
          i;*/

        // light up all previous points
        /*for (s = 0; s < this.currentPoint; s++) {
          for (p = 0; p < this.pxPerPoint; p++) {
            pixelIndex = this.pixels.wrap_index(
              this.firstPointIndex + s  * this.pxPerPoint + p
            );
            this.pixels.set_hsv(
              pixelIndex,
              this.pointHues[s],
              1.0,
              1.0
            );
          }
        }*/

        // light up current point
        /*for (p = 0; p < this.pxperpoint; p++) {
          pixelindex = this.pixels.wrap_index(
            this.firstpointindex + this.currentpoint * this.pxperpoint + p
          );
          this.pixels.set_hsv(
            pixelIndex,
            this.pointHues[this.currentPoint],
            1.0,
            1.0
          );
        }*/

        var p,
          i,
          pointHue,
          timeSinceLastPoint = t - this.lastPointTime,
          pixelIndex;

        // advance side
        if (timeSinceLastPoint > this.timePerPoint) {
          this.currentPoint += 1;
          if (this.currentPoint >= this.numPoints) {
            this.currentPoint = 0;

            // advance hues when gone around full circle
            for (i = 0; i < this.pointHues.length; i++) {
              this.pointHues[i] += this.pointHueDifference;

              if (this.pointHues[i] > 1.0) {
                this.pointHues[i] = 0.0;
              }
            }

            // map hues to star points
            for (p = 0; p < this.numPoints; p++) {
              console.log("point " + p);
              pointHue = this.pointHues[p];
              console.log("pointHue");
              console.log(pointHue);
              for (i = 0; i < this.pxPerPoint; i++) {
                pixelIndex = this.pixels.wrap_index(
                  this.firstPointIndex + (p * this.pxPerPoint) + i
                );
                this.pixels.set_hsv(
                  pixelIndex,
                  pointHue,
                  1.0,
                  1.0
                );
              }
            }
            
          }
          this.lastPointTime = t;

          this.timePerPoint *= 0.95;

        }

      }
    }
  });
  

  module.exports = this.SegmentFlowAnimation;

}).call(this);
