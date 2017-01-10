var gameWindow = {
  badGuys: [],

  missileCount: 0,

  collide: function(missile) {
    var hit = false;
    for (var i = 0; i < this.badGuys.length; i++) {
      var guy = this.badGuys[i];
      if (missile.touches(guy)) {
        guy.clear();
        this.badGuys.splice(i, 1);
        hit = guy;
      }
    }
    return hit;
  },

  minusMissile: function() {
    this.missileCount--;
  },

  plusMissile: function() {
    this.missileCount++;
  }
}