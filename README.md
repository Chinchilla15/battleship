# Battleship! 🚢

Battleship game project to play in the browser. Project part of The Odin Project, JavaScript Course.

The main object of the project was to put in practice TDD(Test Driven Development), using the Jest framework and the TDD workflow. 03/12/2024

- Live Site URL: [Battleship](https://chinchilla15.github.io/battleship/)

Have fun!

### Built with 🛠️

- HTML5
- CSS
- JavaScript
- Webpack
- Jest for Unit Testing

### Thirdparty tools used 🌐

- Google Fonts
- Font Awesome Icons
- ESLint
- Prettier

## About ℹ️

Battleship Game. Player vs AI

A complete battleship game with a retro design, inspired in retro arcades for the color pallete and fonts.

You play against the computer which makes random shots to your board. UI is visually rich and dynamic by showing the different states of the game and ships on each board.

You are able to place ships randomly and the game starts as soon as you click the Start Game button. Once the game ends you can play another round immediately.

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

or you can run indivual tests for the different class modules with the following commands:

```bash
npm test -- ship.test.js
```

```bash
npm test -- player.test.js
```

```bash
npm test -- gameboard.test.js
```

## Screenshots

![Main Screen](images/init-screen.png?raw=true)

![Ships placed](images/board-ready.png?raw=true)

![Board shows hits and misses](images/ships-hit.png?raw=true)

![Various ships sunk and hit](images/mid-game.png?raw=true)

![Game over!](images/game-over.png?raw=true)

## Lessons Learned

- Test Driven Development is a great way to ensure high quality code and a more efficient development for the whole proyect.

- Making your own AI for the game is not as hard as it sounds, but its challenge to implement it effectively and make it actually good in the game.

- Unit testing is a good way to plan ahead and have a good idea on what you want your code to do before writing it.

- Implementing UI based on your logic ensures a smooth game experience as long as the logic works good.

- UI should be interactive and informative to the user, making sure it shows what is happening in real time and is easy to understand.
