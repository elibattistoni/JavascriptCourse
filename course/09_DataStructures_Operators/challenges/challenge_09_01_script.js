"use strict";

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//==============================================================================
//# Coding Challenge #1
//==============================================================================

// task 1
// const players1 = [...game.players[0]];
// const players2 = [...game.players[1]];
// best practice
const [players1, players2] = game.players;
console.log(players1);
console.log(players2);

// task 2
const [gk, ...fieldPlayers] = players1;
console.log(gk);
console.log(fieldPlayers);

// task 3
// const allPlayers = [...game.players[0], ...game.players[1]];
// best practice
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// task 4
const players1Final = [...players1, ...["Thiago", "Coutinho", "Perisic"]];
console.log(players1Final);

// task 5
// const { team1, x: draw, team2 } = { ...game.odds };
const { team1, x: draw, team2 } = game.odds;
// otherwise
// const {
//   odds: { team1, x: draw, team2 },
// } = game;
console.log(team1);
console.log(draw);
console.log(team2);

// task 6
const printGoals = function (...playerNames) {
  console.log(playerNames);
  console.log(playerNames.length);
};

printGoals("Davies", "Muller", "Lewandowski", "Kimmich");
printGoals(...game.scored);

// task 7
let winner = game.team1;
switch (game.odds.team2 > game.odds.team1) {
  case true:
    winner = game.team2;
    break;
}
console.log(winner);
//solution
team1 < team2 && console.log("Team 1 is more likely to win");
team1 > team2 && console.log("Team 2 is more likely to win");

//==============================================================================
//# Coding Challenge #2
//==============================================================================
// task 1
for (const [idx, goal] of game.scored.entries()) {
  console.log(`Goal ${idx + 1}: ${goal}`);
}

// task 2
const calculateAverage = function (...scores) {
  let sum = 0;
  for (const score of scores) {
    sum += score;
  }
  const average = sum / scores.length;
  console.log(average);
  return average;
  // to call it:
  // calculateAverage(1, 2, 3, 4);
  // // calculateAverage(1, 4);
};

const odds = Object.values(game.odds);
calculateAverage(...odds);

// task 3
for (const [key, value] of Object.entries(game.odds)) {
  const str = `Odd of ${key !== "x" ? "victory " : "draw"}${
    key !== "x" ? game[key] : ""
  }: ${value}`;
  console.log(str);
}

// task 4
const countGoals = function (scorer, arrayScorers) {
  let counter = 0;
  for (const goal of arrayScorers) {
    goal === scorer ? (counter += 1) : (counter += 0);
  }
  return counter;
};
const uniqueScorers = [...new Set(game.scored)];
console.log(uniqueScorers);
const scorers = Object.fromEntries(
  uniqueScorers.map((key) => [key, countGoals(key, game.scored)])
);
console.log(scorers);

//==============================================================================
//# Coding Challenge #3
//==============================================================================
const gameEvents = new Map([
  [17, "⚽ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽ GOAL"],
  [80, "⚽ GOAL"],
  [92, "🔶 Yellow card"],
]);
console.log(gameEvents);

// task 1
const events = [...new Set(gameEvents.values())];
console.log(events);

// task 2
gameEvents.delete(64);
console.log(gameEvents);

// task 3
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

// task 4
for (const [key, value] of gameEvents) {
  const [fig, ...str] = value.split(" ");
  const finalStr = `${fig} ${
    key <= 45 ? "[FIRST HALF]" : "[SECOND HALF]"
  } ${key}: ${str.join(" ")}`;
  console.log(finalStr);
}
