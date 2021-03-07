"use strict";
// import {Game} from ('./memoryGame');
////////////////////////////////////////////
class Game {
  constructor(difficulty = "easy", numCards = 12) {
    this.difficulty = difficulty;
    this.numCards = numCards;
    this.cards = new Array(numCards);
    this.state = Game.gameState.initial;
    this.pairsMatched = 0;
    this.isMatch = false;
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

function loadBoard(level) {
  let col = 0,
    rows = 0;
  switch (level) {
    case "easy":
      col = 4;
      rows = 3;
      break;
    case "medium":
    case "hard":
      col = 5;
      rows = 5;
      break;
  }
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
  }
  }
  console.log("after on click, id: ", card.id, game.state);
}

let game = null;
function restartGame() {
  game = new Game();
}

// TODO: implemnet later
function setDifficulty(level) {}
function main() {
  // import {Game} from './memoryGame'
  game = new Game();
  console.log("Hi there");
  loadBoard("easy");
  let cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.addEventListener("click", onCardClicked));
  let restart = document.querySelector(".restart");
  restart.addEventListener("click", restartGame);
  let level = document.querySelector(".level");
  level.addEventListener("click", setDifficulty(level.value));
}

window.onload = main();
