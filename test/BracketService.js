var assert = require("chai").assert

describe("BracketService", function(){

  it("_pair", function(){
    assert.deepEqual(
      BracketService._pair(["a", "b", "c", "d"]),
      [ ["a", "d"], ["b", "c"] ],
      "checks simple 4-item array")

    assert.deepEqual(
      BracketService._pair([ ["a", "d"], ["b", "c"] ]),
      [ [ ["a", "d"], ["b", "c"] ] ],
      "checks layered 4-item array")

  })

  it("_seed", function(){
    assert.deepEqual(
      BracketService._seed(8),
      [0, 7, 3, 4, 1, 6, 2, 5],
      "checks 8-entrant bracket")

    assert.deepEqual(
      BracketService._seed(5),
      [0, undefined, 3, 4, 1, undefined, 2, undefined],
      "checks 5-entrant bracket")

    assert.deepEqual(
      BracketService._seed(2),
      [0, 1],
      "checks 2-entrant bracket")

    assert.deepEqual(
      BracketService._seed(14),
      [0, undefined, 7, 8, 3, 12, 4, 11, 1, undefined, 6, 9, 2, 13, 5, 10],
      "checks 14-entrant bracket")
  })

  it("_mapEntries", function(){

    assert.deepEqual(
      BracketService._mapEntries(["a", "b", "c", "d"], [0, 3, 1, 2]),
      ["a", "d", "b", "c"],
      "checks 4-entrant array")

    assert.deepEqual(
      BracketService._mapEntries(["a", "b", "c", "d", "e", "f"], [0, undefined, 3, 4, 1, undefined, 2, 5]),
      ["a", undefined, "d", "e", "b", undefined, "c", "f"],
      "checks 6-entrant array")

  })

  it("generate", function(){

    assert.deepEqual(
      BracketService.generate(["A", "B", "C"]),
      [
        { home: "A", round: 1, bye: true },
        { home: "B", away: "C", round: 1, game: 1 },
        { home: "A", away_from: 1, round: 2, game: 2 }
      ],
      "checks 3-entrant tournament")

    assert.deepEqual(
      BracketService.generate(["A", "B", "C", "D"]),
      [
        { home: "A", away: "D", round: 1, game: 1 },
        { home: "B", away: "C", round: 1, game: 2 },
        { home_from: 1, away_from: 2, round: 2, game: 3 }
      ],
      "checks 4-entrant tournament")

    assert.deepEqual(
      BracketService.generate(["A", "B", "C", "D", "E", "F"]),
      [
        { home: "A", round: 1, bye: true },
        { home: "D", away: "E", round: 1, game: 1 },
        { home: "B", round: 1, bye: true },
        { home: "C", away: "F", round: 1, game: 2 },
        { home: "A", away_from: 1, round: 2, game: 3 },
        { home: "B", away_from: 2, round: 2, game: 4 },
        { home_from: 3, away_from: 4, round: 3, game: 5 }
      ],
      "checks 6-entrant tournament")

    assert.deepEqual(
      BracketService.generate(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"]),
      [
        { home: "A", away: "P", round: 1, game: 1 },
        { home: "H", away: "I", round: 1, game: 2 },
        { home: "D", away: "M", round: 1, game: 3 },
        { home: "E", away: "L", round: 1, game: 4 },
        { home: "B", away: "O", round: 1, game: 5 },
        { home: "G", away: "J", round: 1, game: 6 },
        { home: "C", away: "N", round: 1, game: 7 },
        { home: "F", away: "K", round: 1, game: 8 },
        { home_from: 1, away_from: 2, round: 2, game: 9 },
        { home_from: 3, away_from: 4, round: 2, game: 10 },
        { home_from: 5, away_from: 6, round: 2, game: 11 },
        { home_from: 7, away_from: 8, round: 2, game: 12 },
        { home_from: 9, away_from: 10, round: 3, game: 13 },
        { home_from: 11, away_from: 12, round: 3, game: 14 },
        { home_from: 13, away_from: 14, round: 4, game: 15 }
      ],
      "checks 6-entrant tournament")

  })

})