var game = {
  goodGuy: goodGuy,

  badGuy: badGuy,

  window: gameWindow, 

  init: function() {
    var canvas = document.getElementById('canvas'),
        $canvas = $('#canvas'),
        ctx = canvas.getContext("2d"),
        mouseX;
    shape.setContext(ctx);
    shape.setWindow(this.window);
    var goodGuy = this.goodGuy.create();
    $canvas.width(CONFIG.canvas.width);
    $canvas.height(CONFIG.canvas.height);
    canvas.width = CONFIG.canvas.width;
    canvas.height = CONFIG.canvas.height;
    this.badGuy.createAll();
    this.badGuy.drawAll();
    this.badGuy.attackWithAll();
    goodGuy.draw(ctx);
    $canvas.mousemove(function(e) {
      mouseX = e.clientX - canvas.offsetLeft;
      goodGuy.move(mouseX)
    });
    $canvas.click(function() {
      goodGuy.shoot();
    })
  }
}