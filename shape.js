var shape = {

  setContext: function(ctx) {
    this.ctx = ctx;
  },

  setWindow: function(gameWindow) {
    this.window = gameWindow;
  },

  create: function(options) {
    return new this.constructor(options);
  },

  constructor: function Shape(options) {
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.w = options.w || 1;
    this.h = options.h || 1;
    this.fill = options.fill || "#AAAAAA";
    this.ctx = shape.ctx;
    this.window = shape.window;
    return this;
  }
};

shape.constructor.prototype.draw = function() {
  this.ctx.fillStyle = this.fill;
  this.ctx.fillRect(this.x, this.y, this.w, this.h);
};

shape.constructor.prototype.clear = function() {
  this.ctx.clearRect(this.x - 1, this.y - 1, this.w + 2, this.h + 2);
};

shape.constructor.prototype.touches = function(target) {
  return this.x < target.x + target.w &&
         this.x + this.w > target.x &&
         this.y < target.y + target.h &&
         this.h + this.y > target.y
};
