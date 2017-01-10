var missile = {

  shape: shape,

  window: gameWindow,

  create: function(guy) {
    return new this._constructor(guy, this);
  },

  _constructor: function Missile(guy, that) {
    var options = {}, missile;
    options.x = guy.x + guy.w / 2 - CONFIG.missile.width / 2;
    options.y = guy.y - 5 - CONFIG.missile.height;
    options.w = CONFIG.missile.width;
    options.h = CONFIG.missile.height;
    options.fill = CONFIG.missile.fill;
    options.window = that.window;
    that.window.plusMissile();
    missile = that.shape.constructor.call(this, options);
    return missile;
  }
}

missile._constructor.prototype = new shape.constructor({});

missile._constructor.prototype.fire = async function() { 
  var collided = false;
  while (this.y > 0 - this.h && !collided) {
    await helpers.sleep(1);
    this.clear();
    this.y--;
    this.draw();
    if (this.collide()) {
      collided = true;
      this.clear();
    }
  }
  this.window.minusMissile()
  this.clear();
}

missile._constructor.prototype.collide = function (){
  return this.window.collide(this) 
}