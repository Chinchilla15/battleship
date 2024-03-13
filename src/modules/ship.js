/* eslint-disable no-param-reassign */
function ship(length) {
  this.length = length;
  this.hits = 0;
  this.sunk = false;

  function hit() {
    this.hits += 1;
    this.isSunk();
  }

  function isSunk() {
    if (this.length === this.hits) {
      this.sunk = true;
      return true;
    }
    return false;
  }

  return {
    length,
    hits: this.hits,
    sunk: this.sunk,
    hit,
    isSunk,
  };
}

module.exports = ship;
