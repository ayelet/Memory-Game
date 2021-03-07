"use strict";
// import {Game} from ('./memoryGame');

////////////////////////////////////////////
class Game {
  constructor(numCards = 12) {
    // this.difficulty = difficulty;
    this.numCards = numCards;
    this.cards = new Array(numCards);
    this.state = Game.gameState.initial;
    this.pairsMatched = 0;
    this.isMatch = false;
    this.numAttempts = 0; // number of wrong moves
    // fill the array
    for (let i = 0; i < numCards / 2; i += 1) {
      this.cards[i] = i;
      this.cards[i + numCards / 2] = i;
    }
    console.log(this.cards);
    this.firstCard = -1;
    this.secondCard = -1;
    console.log("game created", this.difficulty, this.numCards);
  }
  static level = { easy: 0, medium: 1, hard: 2 };

  pickCard(id) {
    if (this.state === Game.gameState.initial) this.firstCard = id;
    if (this.state === Game.gameState.oneCard) this.secondCard = id;

    this.changeState();

    console.log(
      `pickCard(${id}: ${this.firstCard} ${this.secondCard}), ${this.state}`
    );
  }

  releaseCards() {
    this.firstCard = this.secondCard = -1;
  }
  // check for a match between 2 cards
  checkMatch() {
    if (this.firstCard === -1 || this.secondCard === -1) this.isMatch = false;
    let a = this.cards[this.firstCard];
    let b = this.cards[this.secondCard];
    console.log("checkMatch: current, previous:", a, b);
    // this.releaseCards();
    // if (this.state !== Game.gameState.twoCards) return false;
    if (a === b) {
      this.pairsMatched += 1;
      console.log("match!, num pairs matched: ", this.pairsMatched);
      this.isMatch = true;
      return;
    }
    console.log("No match");
    this.isMatch = false;
    this.numAttempts++;
    this.changeState();
  }

  shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  //handle the new state of the game
  onChangeState(cardId) {
    switch (this.state) {
      case Game.gameState.initial:
        break;
      case Game.gameState.oneCard:
        break;
      case Game.gameState.twoCards:
        this.checkMatch();

        break;
    }
  }
  ////////////////////////////
  changeState(cardId) {
    console.log("**** changing state: from ", this.state);
    switch (this.state) {
      case Game.gameState.initial:
        this.state = Game.gameState.oneCard;
        break;
      case Game.gameState.oneCard:
        this.state = Game.gameState.twoCards;
        console.log("9999 cards picked: ", this.firstCard, this.secondCard);
        break;
      case Game.gameState.twoCards:
        this.state = Game.gameState.initial;
        break;
    }
    this.onChangeState(cardId);
    console.log("### state changed to ", this.state);
  }

  static gameState = {
    initial: "noPick",
    oneCard: "OnePicked",
    twoCards: "TwoPicked",
  };
}
//////////////////end of Class Game

function loadBoard(rows, col) {
  //   let col = 0,
  //     rows = 0;
  //   switch (level) {
  //     case level.easy:
  //       col = 4;
  //       rows = 3;
  //       break;
  //     case level.medium:
  //         col = 6;
  //         rows = 3;
  //     case level.hard:
  //       col = 6;
  //       rows = 4;
  //       break;
  //   }
  let board = document.querySelector(".board");
  board.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < col; j++) {
      let card = document.createElement("div");
      card.classList.add("card");
      card.classList.add("flipped");
      card.id = i * col + j;

      board.appendChild(card);
    }
  }
}

function removeBoard() {
  let cards = document.querySelectorAll(".card");
  let board = document.querySelector(".board");
  cards.forEach((child) => board.removeChild(child));
}
/////////////////////////////////
function flip(card) {
  let list = card.classList;

  // Toggle states
  if (list.contains("flipped")) {
    list.remove("flipped");
    list.add("shown");
    card.innerHTML = game.cards[card.id];
  } else {
    list.add("flipped");
    list.remove("shown");
    card.innerHTML = "";
  }
  //   console.log("aftr flip: ", list);
}
/////////////////////////////////////
function freeze(card) {
  card.removeEventListener("click", onCardClicked);
}

function unfreeze(card) {
  card.addEventListener("click", onCardClicked);
}
//////////////////////
function onCardClicked(e) {
  let card = e.currentTarget;
  flip(card);
  freeze(card);

  game.pickCard(card.id);

  if (game.state === Game.gameState.initial) {
    if (!game.isMatch) {
      setTimeout(() => {
        console.log("first id: ", this.firstCard);
        console.log("2nd id: ", this.secondCard);
        let firstCard = document.getElementById(`${game.firstCard}`);
        let secondCard = document.getElementById(`${game.secondCard}`);
        flip(firstCard);
        flip(secondCard);
        unfreeze(firstCard);
        unfreeze(secondCard);
      }, 1500);
    } else {
    }
  }
  setTimeout(() => {
    document.querySelector(
      ".matches"
    ).innerHTML = `Matches: ${game.pairsMatched}`;
    document.querySelector(".moves").innerHTML = `Guesses: ${game.numAttempts}`;
  }, 1000);

  // document.querySelector('.moves').innerHTML = "howdie";
  //   console.log("after on click, id: ", card.id, game.state);
}

////////////////////////////////////////////
let tMin = document.querySelector(".min");
SecurityPolicyViolationEvent;
let tSec = document.querySelector(".sec");
let counter = 0;
function displayClock(timeStamp) {
  counter++;

  let sec = Math.floor(counter % 60);
  let min = Math.floor(counter / 60);
  tSec.innerHTML = sec > 9 ? sec : `0${sec}`;
  tMin.innerHTML = min > 9 ? min : `0${min}`;
}
///////////////////////////////////////
let game = null;
// let startSW = document.querySelector('.start');
// let stopSW = document.querySelector('.stop');

// let tMilS = document.querySelector(".millisec");
let timer = 0; // timer id

function newGame() {
    let val = document.querySelector(".select").value;
    let level = Game.level[val.toLowerCase()];
    console.log("level selected ", level);

    restartGame(level);
}

function restartGame(level) {
//   if (isNaN(level)) {
//     // call is from a click on "new game"
//     let e = document.querySelector(".select");
//     setDifficulty(e);
//     return;
//   }
  let rows = 0,
    cols = 0;
  switch (level) {
    case Game.level.easy:
      rows = 3;
      cols = 4;
      break;
    case Game.level.medium:
      rows = 3;
      cols = 6;
      break;
    case Game.level.hard:
      rows = 4;
      cols = 6;
  }
  game = new Game(rows * cols);
  removeBoard();
  window.clearInterval(timer);
  loadGame(rows, cols);
}

function loadGame(rows, cols) {
  // import {Game} from './memoryGame'
  game = new Game(rows * cols);
  loadBoard(rows, cols);
  let cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.addEventListener("click", onCardClicked));
  let restart = document.querySelector(".restart");
  restart.addEventListener("click", newGame);
  let level = document.querySelector(".level");
  level.addEventListener("change", setDifficulty);
  document.querySelector(".moves").innerHTML = "Guesses: 0";
  counter = 0;
  timer = window.setInterval(displayClock, 1000);
}
// TODO: implemnet later
function setDifficulty(e) {
  let level = e.currentTarget.value;
  switch (level) {
    case "Easy":
      restartGame(Game.level.easy);
      break;
    case "Medium":
      restartGame(Game.level.medium);
      break;
    case "Hard":
      restartGame(Game.level.hard);
      break;
  }
}

function main() {
  loadGame(3, 4);
}

window.onload = main();
