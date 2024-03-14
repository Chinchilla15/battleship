/* eslint-disable no-undef */
import Ship from "../modules/ship";

test("Show Length", () => {
  const myShip = new Ship(3);
  expect(myShip.length).toBe(3);
});

test("Ship received one hit", () => {
  const myShip = new Ship(3);
  myShip.hit();
  expect(myShip.hits).toBe(1);
});

test("Ship Sunk", () => {
  const myShip = new Ship(3);
  myShip.hit();
  myShip.hit();
  myShip.hit();
  expect(myShip.sunk).toBeTruthy();
});
