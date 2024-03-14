/* eslint-disable no-param-reassign */
<<<<<<< HEAD
function Ship(length) {
=======
function ship(length) {
>>>>>>> ship_module_logic
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

<<<<<<< HEAD
export default Ship;
=======
module.exports = ship;
>>>>>>> ship_module_logic
