var guy = {

  shape: shape,

  create: function(options) {
    return new this._constructor(options, this);
  },

  _constructor: function Guy(options, that) {
    options.w = CONFIG.guy.width,
    options.h = CONFIG.guy.height
    return shape.constructor.call(this, options);
  }
}

guy._constructor.prototype = new shape.constructor({});
guy._constructor.prototype.missile = missile;

