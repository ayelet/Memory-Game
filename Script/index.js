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
    // fill the array
    for (let i = 0; i < numCards / 2; i += 1) {
      this.cards[i] = i;
      this.cards[i + numCards / 2] = i;
    }
    console.log(this.cards);
    this.currentCard = -1;
    this.previousCard = -1;
    console.log("game created", this.difficulty, this.numCards);
  }
  level = { easy: "easy", medium: "medium", hard: "hard" };
  pickCard(id) {
    this.previousCard = this.currentCard;
    this.currentCard = id;
  }
  isMatch() {
      if (this.state !== Game.gameState.twoCards) return false;

    if (this.currentCard === this.previousCard) {
      console.log("match!");
      this.pairsMatched += 1;
      return true;
    }
    console.log("No match");
    return false;
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
        this.state = Game.gameState.oneCard;
        this.previousCard = this.currentCard = -1;
        break;
      case Game.gameState.oneCard:
        this.currentCard = cardId;
        break;
      case Game.gameState.twoCards:
          this.previousCard = this.currentCard;
          this.currentCard = cardId;
        break;
      case Game.gameState.match:
      case Game.gameState.noMatch:
          this.currentCard = this.previousCard = -1;
        break;
    }
  }
  ////////////////////////////
  changeState(cardId) {
    switch (this.state) {
      case Game.gameState.initial:
        this.state = Game.gameState.oneCard;
        break;
      case Game.gameState.oneCard:
        this.state = Game.gameState.twoCards;
        break;
      case Game.gameState.twoCards:
        if (this.isMatch) this.state = Game.gameState.match;
        else this.state = Game.gameState.noMatch;
        break;
      case Game.gameState.match:
      case Game.gameState.noMatch:
        this.state = Game.gameState.initial;
        break;
    }
    this.onChangeState(cardId);
  }

  static gameState = {
    initial: "Initial",
    oneCard: "OnePicked",
    twoCards: "TwoPicked",
    match: "Match",
    noMatch: "NoMatch",
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
//   game.changeState(card.id);
  // Toggle states
  let list = card.classList;
  console.log("b4 flip:", list);
  if (list.contains("flipped")) {
      list.remove("flipped");
      list.add("shown");
      card.innerHTML = game.cards[card.id];
    } else {
        list.add("flipped");
        list.remove("shown");
        card.innerHTML = "";
    }
    console.log("aftr flip: ", list);
}
/////////////////////////////////////
function freeze(card) {
  card.removeEventListener("click", onCardClicked);
}

function unfreeze(card) {
  card.addEventListener("click", onCardClicked);
}

function freezeAll() {

}
function onCardClicked(e) {
    let card = e.currentTarget;
    // game.changeState();
    console.log("before onClick:", game.state);
 if ((game.state === Game.gameState.initial) || 
 (game.state === Game.gameState.oneCard))
  {
    flip(card);
    freeze(card);
    game.changeState(e);
   
}
if (game.state === Game.gameState.twoCards) {
    game.changeState();
    let match = game.isMatch();
    if (match) {
        // freezeBothCards()
    } else {
        //unflip both cards
        // flip(card);
    }
}

console.log("after on click", game.state);
}
function onCardClicked1(e) {
  let card = e.currentTarget;
  // see what index was clicked
  flip(card);
  freeze(card);
  //   if (game.isMatch()) {
  //       game.changeState();
  //       console.log("match");
  //     } else {
  //         unfreeze(card);
  //         console.log("no match");
  //         //   unfreeze(prevCard);
  //     }
    //   game.changeState();
  console.log("clicked", card.id, game.state);
  if (game.state === Game.gameState.noMatch) {
    // flip back both cards
    setTimeout(() => {
      flip(card);
      let previousCard = document.getElementById(`${game.previousCard}`);
      flip(previousCard);
      unfreeze(card);
      unfreeze(previousCard);
    }, 1500);
    document.querySelector(".result").innerHTML = "No match";
  } else if (game.state === Game.gameState.match) {
    document.querySelector(".result").innerHTML = "Match";
    // remove event listeners from both cards
    freeze(card);

    //    freeze(previousCard);
  }
}
let game = null;
function main() {
  // import {Game} from './memoryGame'
  game = new Game();
  console.log("Hi there");
  loadBoard("easy");
  let cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.addEventListener("click", onCardClicked));
}
window.onload = main();
