/**
 *  @file       TwinkleAnimation.js
 *
 *
 *  @author     Jonathan Lee Marcus
 *
 * 
 *  @license    Licensed under the MIT license.
 **/

(function () {
  "use strict";

  var StarAnimation = require("./StarAnimation.js");
  
 
  /**
   *  @class        TwinkleAnimation
   *
   *  @classdesc    Twlinky animation that Jonathan made.
   **/ 
  this.TwinkleAnimation = function (params) {
    StarAnimation.apply(this, arguments);

    var numberOfTwinkles = 20;

    Object.defineProperties(this, {
      twink: {
        enumerable: false,
        writable: false,
        value: new Array(numberOfTwinkles)
      }
    });
    
    for (var i=0; i<this.twink.length; i++)
    {
      //for each twinkle, set a random location and initialize the birthtime to a random time within the last 1000 millisieconds
      this.twink[i] = {"pixLoc":Math.floor(Math.random()*80), 
            "birthTime":(new Date().getTime() - (Math.random()*2000)),
            "aliveTime":2000.0};

    // for future potential twinkle rotation! <3
    //			twink[i] = {"pixLoc":Math.floor(Math.random()*80), 
    //						"birthTime":(new Date().getTime() - (Math.random()*2000)),
    //						"aliveTime":2000.0,
    //						"rotationSpeed":Math.floor((Math.random()*60)-30)};

    }

  };

  this.TwinkleAnimation.prototype = Object.create(StarAnimation.prototype, {
    tick: {
      enumerable: true,
      writable: false,
      value: function (timeNow) {
        StarAnimation.prototype.tick.apply(this, arguments);
        //zero the pixels before each draw!
        for (var i=0; i<80; i++)
        {
          this.pixels.set_rgb(i, 0, 0, 0);
        }

          //var timeNow = new Date().getTime();

        for (var i=0; i<this.twink.length; i++)
          {
              
          var age = timeNow - this.twink[i].birthTime;
          
          var luminosity = 255 * Math.sin((age/this.twink[i].aliveTime)*2*Math.PI);		
          
          // future potential twinkle rotation! <3
          //var shift = parseInt((age/twink[i].aliveTime)*twink[i].rotationSpeed);		
          //console.log(shift);
             
          this.pixels.set_rgb(this.twink[i].pixLoc, luminosity, luminosity, luminosity);
              //client.setPixel(twink[i].pixLoc, luminosity, luminosity, luminosity);
          
          // future potential twinkle rotation! <3
          // client.setPixel((twink[i].pixLoc+shift+80)%80, luminosity, luminosity, luminosity);
            
          if(age>=this.twink[i].aliveTime)
          {
            this.twink[i].pixLoc = Math.floor(Math.random()*80);
            this.twink[i].birthTime = timeNow;
            this.twink[i].aliveTime = Math.random()*2000+3000;
          }
          
        }
      }
    }
  });
  

  module.exports = this.TwinkleAnimation;

}).call(this);
