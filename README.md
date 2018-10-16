# foxes
a turn-based hunting multiplayer game.

---

## General
This project's main objective is to implement a game idea I had with some friends during a class activity. This is by no means a closed project and you are free to use, modify and distribute this software as you want.

Idea by Lucas Valente, Felipe Martins and Davi Oliveira. Implementation by Lucas Valente.

### Main goals:
- Explore unit testing and TDD using [mocha](http://mochajs.org);
- Explore RESTful API concepts using [express](http://expressjs.com);
- Explore modeling and texturing using [blender](http://blender.org);
- Explore game programming concepts using WebGL;
- Explore game design concepts and have cool ideas;
- Have fun! :D

---

## Game
A brief description of the game's rules.

### Board
The board consists of a 7x7 hexagonal grid. The game starts with all players evenly spaced out across its edges and a bunny in the center hexagon.

### Cards
There are different types of cards which can be used to affect board tiles, other players or the bunny. Each player has a 20-card deck which is built by themselves according to their strategy and preferences.

Whenever a player uses a card, it should be _discarded_.

All cards can be sorted into 2 categories: effect and mana cards.

#### Mana cards
