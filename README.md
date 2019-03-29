Simple voting game by Duc and Maudy

## Getting Started

- npm i in both client/ and server/
- docker start some-postgres (password: secret)
- run server on: npm run dev
- run client on: npm run start

## How to get connected to play the game
- in file constants.js change the ip adress to your own.
- in file db.ts change the ip adress to you own.
- share http://youripadresshere:3000 with people to play multiplayer

## How the game works
- sign up
- sign in
- create game
- other people can join your game
- get a random question
- vote what answer you like
- results will show when all parties have submitted their answers
