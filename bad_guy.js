var badGuy = {

  guy: guy,

  shape: shape,

  window: gameWindow,

  create: function(options) {
    return new this._constructor(options, this);
  },

  createAll: function() {
    this.all = new Array(CONFIG.badGuy.startingNum);
    this.heading = "right";
    var x = 0 - CONFIG.guy.width,
        y = CONFIG.badGuy.ySpacing;
    for (var i = 0; i < this.all.length; i++) {
      if (x > CONFIG.canvas.width / 2) {
        x = CONFIG.badGuy.xSpacing;
        y += CONFIG.guy.height + CONFIG.badGuy.ySpacing;
      } else {
        x = x + CONFIG.badGuy.xSpacing + CONFIG.guy.width;
      }
      this.all[i] = this.create({
        x: x,
        y: y
      });
    }
  },

  drawAll: function() {
    this.all.forEach(function(guy) {
      guy.draw();
    });
  },

  attackWithAll: async function() {
    while (this.all.length > 0) {
      await helpers.sleep(CONFIG.badGuy.speed);
      if (this._atEdge()){
        this._moveAllDown();
        this._switchHeading();
      } else {
        this._moveAllSideways();
      }
    }
  },

  _atEdge: function() {
    if (this.heading === "right") {
      return this._outermost().x + CONFIG.guy.width + CONFIG.badGuy.xSpacing >= CONFIG.canvas.width;
    } else {
      return this._innermost().x <= 0;
    }
  },

  _outermost: function() {
    var outermost = { x: -1 };
    this.all.forEach(function(guy){
      if (guy.x > outermost.x) {
        outermost = guy;
      }
    });
    return outermost;
  },

  _innermost: function() {
    var innermost = { x: CONFIG.canvas.width + 100 };
    this.all.forEach(function(guy) {
      if (guy.x < innermost.x) {
        innermost = guy;
      }
    });
    return innermost;
  },

  _switchHeading: function() {
    this.heading = this.heading === "right" ? "left" : "right";
  },

  _moveAllSideways: function() {
    var change = this.heading === "right" ? 1 : -1;
    this.all.forEach(function(guy) {
      guy.x += change;
      guy.clear();
      guy.draw();
    });
    this.window.badGuys = this.all;
  },

  _moveAllDown: function() {
    this.all.forEach(function(guy) {
      guy.clear();
      guy.y += CONFIG.badGuy.ySpacing;
      guy.draw();
    });
    this.window.badGuys = this.all;
  },

  _constructor: function BadGuy(options, that) {
    var badGuy;
    options.w = CONFIG.guy.width,
    options.h = CONFIG.guy.height
    options.fill = CONFIG.badGuy.fill;
    options.window = that.window;
    badGuy = that.guy._constructor.call(this, options, that);
    that.window.badGuys.push(badGuy);
    return badGuy;
  }
}

badGuy._constructor.prototype = new guy._constructor({}, shape);
