/* eslint-disable no-undef */
const ship = require("../modules/ship");

test("Show Length", () => {
  const myShip = ship(3);
  expect(myShip.length).toBe(3);
});

test("Ship received one hit", () => {
  const myShip = ship(3);
  myShip.hit();
  expect(myShip.hits).toBe(1);
});

test("Ship Sunk", () => {
  const myShip = ship(3);
  myShip.hit();
  myShip.hit();
  myShip.hit();
  expect(myShip.sunk).toBeTruthy();
});
