var goodGuy = {

  guy: guy,

  shape: shape,

  window: gameWindow,

  create: function() {
    var good = new this._constructor(this);
    good.move = function(mouseX) {
      if (mouseX < CONFIG.canvas.width - CONFIG.guy.width / 2 && mouseX > CONFIG.guy.width / 2) {
        this.clear(this.ctx);
        this.x = mouseX - CONFIG.guy.width / 2;
        this.draw(this.ctx)
      }
    };
    return good;
  },

  _constructor: function GoodGuy(that) {
    var options = {}, goodGuy;
    options.x = (CONFIG.canvas.width / 2) - (CONFIG.guy.width / 2);
    options.y = CONFIG.canvas.height - CONFIG.guy.height - 5;
    options.fill = CONFIG.guy.fill;
    goodGuy = that.guy._constructor.call(this, options, that)
    that.window.goodGuy = goodGuy;
    return goodGuy;
  }
}

goodGuy._constructor.prototype = new guy._constructor({}, shape);

goodGuy._constructor.prototype.shoot = function() {
  if (this.window.missileCount < 4){
    var missile = this.missile.create(this);
    missile.fire()
  }
};