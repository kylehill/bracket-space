var assert = require("chai").assert

describe("SingleEliminationService", function(){

  describe("Results", function(){

    var t
    beforeEach(function(){
      t = SingleEliminationService.generate({
        participants: [ "A", "B", "C", "D", "E", "F", "G" ]
      })
    })

    it("private.flatten", function(){
      assert.deepEqual(
        SingleEliminationService.private.flatten(t.phases[0].rounds),
        [
          { round: 1, bye: true },
          { round: 1, id: 1, home: 4, away: 5, winner_to: 4 },
          { round: 1, id: 2, home: 2, away: 7, winner_to: 5 },
          { round: 1, id: 3, home: 3, away: 6, winner_to: 5 },
          { round: 2, id: 4, home: 1, away_from: 1, winner_to: 6 },
          { round: 2, id: 5, home_from: 2, away_from: 3, winner_to: 6 },
          { round: 3, id: 6, home_from: 4, away_from: 5 }
        ],
        "check flatten")

      t.phases[0].rounds = SingleEliminationService.private.flatten(t.phases[0].rounds)
      assert.deepEqual(
        t.phases[0].rounds,
        [
          { round: 1, bye: true },
          { round: 1, id: 1, home: 4, away: 5, winner_to: 4 },
          { round: 1, id: 2, home: 2, away: 7, winner_to: 5 },
          { round: 1, id: 3, home: 3, away: 6, winner_to: 5 },
          { round: 2, id: 4, home: 1, away_from: 1, winner_to: 6 },
          { round: 2, id: 5, home_from: 2, away_from: 3, winner_to: 6 },
          { round: 3, id: 6, home_from: 4, away_from: 5 }
        ],
        "check reference")
    })

    it("private.inflate", function(){

      t.phases[0].rounds = SingleEliminationService.private.flatten(t.phases[0].rounds)
      assert.deepEqual(
        SingleEliminationService.private.inflate(t.phases[0].rounds),
        [
          {
            title: "Round 1",
            round: 1,
            games: [
              { round: 1, bye: true },
              { home: 4, away: 5, id: 1, round: 1, winner_to: 4 },
              { round: 1, home: 2, away: 7, id: 2, winner_to: 5 },
              { home: 3, away: 6, id: 3, round: 1, winner_to: 5 }
            ]
          },
          {
            title: "Round 2",
            round: 2,
            games: [
              { home: 1, away_from: 1, id: 4, round: 2, winner_to: 6 },
              { home_from: 2, away_from: 3, id: 5, round: 2, winner_to: 6 }
            ]
          },
          {
            title: "Round 3",
            round: 3,
            games: [
              { home_from: 4, away_from: 5, id: 6, round: 3 }
            ]
          }
        ],
        "check inflate")

        t.phases[0].rounds = SingleEliminationService.private.inflate(t.phases[0].rounds)

        assert.deepEqual(
          t.phases[0].rounds,
          [
            {
              title: "Round 1",
              round: 1,
              games: [
                { round: 1, bye: true },
                { home: 4, away: 5, id: 1, round: 1, winner_to: 4 },
                { round: 1, home: 2, away: 7, id: 2, winner_to: 5 },
                { home: 3, away: 6, id: 3, round: 1, winner_to: 5 }
              ]
            },
            {
              title: "Round 2",
              round: 2,
              games: [
                { home: 1, away_from: 1, id: 4, round: 2, winner_to: 6 },
                { home_from: 2, away_from: 3, id: 5, round: 2, winner_to: 6 }
              ]
            },
            {
              title: "Round 3",
              round: 3,
              games: [
                { home_from: 4, away_from: 5, id: 6, round: 3 }
              ]
            }
          ],
          "check reference")
    })

    it("private.setResult - home", function(){

      assert.deepEqual(
        SingleEliminationService.private.setResult(t.phases[0], 1, "home", 10, 5),
        {
          config: {
            track_score: false,
            type: "bracket"
          },
          phase: 1,
          state: "open",
          title: "Bracket",
          controller: "SingleElimBracketController",
          participants: [
            { name: "A", id: 1 },
            { name: "B", id: 2 },
            { name: "C", id: 3 },
            { name: "D", id: 4 },
            { name: "E", id: 5 },
            { name: "F", id: 6 },
            { name: "G", id: 7 }
          ],
          rounds: [
            {
              title: "Round 1",
              round: 1,
              games: [
                { round: 1, bye: true },
                { home: 4, away: 5, id: 1, round: 1, winner_to: 4, home_score: 10, away_score: 5, result: "home" },
                { round: 1, home: 2, away: 7, id: 2, winner_to: 5 },
                { home: 3, away: 6, id: 3, round: 1, winner_to: 5 }
              ]
            },
            {
              title: "Round 2",
              round: 2,
              games: [
                { home: 1, away_from: 1, away: 4, id: 4, round: 2, winner_to: 6 },
                { home_from: 2, away_from: 3, id: 5, round: 2, winner_to: 6 }
              ]
            },
            {
              title: "Round 3",
              round: 3,
              games: [
                { home_from: 4, away_from: 5, id: 6, round: 3 }
              ]
            }
          ]
        },
        "sets home result")

    })

    it("private.setResult - away", function(){

      assert.deepEqual(
        SingleEliminationService.private.setResult(t.phases[0], 1, "away", 5, 10),
        {
          config: {
            track_score: false,
            type: "bracket"
          },
          phase: 1,
          state: "open",
          title: "Bracket",
          controller: "SingleElimBracketController",
          participants: [
            { name: "A", id: 1 },
            { name: "B", id: 2 },
            { name: "C", id: 3 },
            { name: "D", id: 4 },
            { name: "E", id: 5 },
            { name: "F", id: 6 },
            { name: "G", id: 7 }
          ],
          rounds: [
            {
              title: "Round 1",
              round: 1,
              games: [
                { round: 1, bye: true },
                { home: 4, away: 5, id: 1, round: 1, winner_to: 4, home_score: 5, away_score: 10, result: "away" },
                { round: 1, home: 2, away: 7, id: 2, winner_to: 5 },
                { home: 3, away: 6, id: 3, round: 1, winner_to: 5 }
              ]
            },
            {
              title: "Round 2",
              round: 2,
              games: [
                { home: 1, away_from: 1, away: 5, id: 4, round: 2, winner_to: 6 },
                { home_from: 2, away_from: 3, id: 5, round: 2, winner_to: 6 }
              ]
            },
            {
              title: "Round 3",
              round: 3,
              games: [
                { home_from: 4, away_from: 5, id: 6, round: 3 }
              ]
            }
          ]
        },
        "sets away result")

    })
    
    it("private.setResult - undefined", function(){

      assert.deepEqual(
        SingleEliminationService.private.setResult(t.phases[0], 1, ""),
        {
          config: {
            track_score: false,
            type: "bracket"
          },
          phase: 1,
          state: "open",
          title: "Bracket",
          controller: "SingleElimBracketController",
          participants: [
            { name: "A", id: 1 },
            { name: "B", id: 2 },
            { name: "C", id: 3 },
            { name: "D", id: 4 },
            { name: "E", id: 5 },
            { name: "F", id: 6 },
            { name: "G", id: 7 }
          ],
          rounds: [
            {
              title: "Round 1",
              round: 1,
              games: [
                { round: 1, bye: true },
                { home: 4, away: 5, id: 1, round: 1, winner_to: 4 },
                { round: 1, home: 2, away: 7, id: 2, winner_to: 5 },
                { home: 3, away: 6, id: 3, round: 1, winner_to: 5 }
              ]
            },
            {
              title: "Round 2",
              round: 2,
              games: [
                { home: 1, away_from: 1, id: 4, round: 2, winner_to: 6 },
                { home_from: 2, away_from: 3, id: 5, round: 2, winner_to: 6 }
              ]
            },
            {
              title: "Round 3",
              round: 3,
              games: [
                { home_from: 4, away_from: 5, id: 6, round: 3 }
              ]
            }
          ]
        },
        "sets null result")

    })

    it("private.setResult - recursive undefined", function(){

      SingleEliminationService.private.setResult(t.phases[0], 1, "home", 10, 5)
      SingleEliminationService.private.setResult(t.phases[0], 4, "home", 10, 7)

      assert.deepEqual(
        t.phases[0],
        {
          config: {
            track_score: false,
            type: "bracket"
          },
          phase: 1,
          state: "open",
          title: "Bracket",
          controller: "SingleElimBracketController",
          participants: [
            { name: "A", id: 1 },
            { name: "B", id: 2 },
            { name: "C", id: 3 },
            { name: "D", id: 4 },
            { name: "E", id: 5 },
            { name: "F", id: 6 },
            { name: "G", id: 7 }
          ],
          rounds: [
            {
              title: "Round 1",
              round: 1,
              games: [
                { round: 1, bye: true },
                { home: 4, away: 5, id: 1, round: 1, winner_to: 4, home_score: 10, away_score: 5, result: "home" },
                { round: 1, home: 2, away: 7, id: 2, winner_to: 5 },
                { home: 3, away: 6, id: 3, round: 1, winner_to: 5 }
              ]
            },
            {
              title: "Round 2",
              round: 2,
              games: [
                { home: 1, away_from: 1, away: 4, id: 4, round: 2, winner_to: 6, home_score: 10, away_score: 7, result: "home" },
                { home_from: 2, away_from: 3, id: 5, round: 2, winner_to: 6 }
              ]
            },
            {
              title: "Round 3",
              round: 3,
              games: [
                { home_from: 4, home: 1, away_from: 5, id: 6, round: 3 }
              ]
            }
          ]
        },
        "sets several results")

      SingleEliminationService.private.setResult(t.phases[0], 1, "")
      assert.deepEqual(
        t.phases[0],
        {
          config: {
            track_score: false,
            type: "bracket"
          },
          phase: 1,
          state: "open",
          title: "Bracket",
          controller: "SingleElimBracketController",
          participants: [
            { name: "A", id: 1 },
            { name: "B", id: 2 },
            { name: "C", id: 3 },
            { name: "D", id: 4 },
            { name: "E", id: 5 },
            { name: "F", id: 6 },
            { name: "G", id: 7 }
          ],
          rounds: [
            {
              title: "Round 1",
              round: 1,
              games: [
                { round: 1, bye: true },
                { home: 4, away: 5, id: 1, round: 1, winner_to: 4 },
                { round: 1, home: 2, away: 7, id: 2, winner_to: 5 },
                { home: 3, away: 6, id: 3, round: 1, winner_to: 5 }
              ]
            },
            {
              title: "Round 2",
              round: 2,
              games: [
                { home: 1, away_from: 1, id: 4, round: 2, winner_to: 6 },
                { home_from: 2, away_from: 3, id: 5, round: 2, winner_to: 6 }
              ]
            },
            {
              title: "Round 3",
              round: 3,
              games: [
                { home_from: 4, away_from: 5, id: 6, round: 3 }
              ]
            }
          ]
        },
        "sets undefined results recursively")

    })


    it("private.setResult - recursive defined", function(){

      SingleEliminationService.private.setResult(t.phases[0], 1, "home", 10, 5)
      SingleEliminationService.private.setResult(t.phases[0], 4, "home", 10, 7)

      assert.deepEqual(
        t.phases[0],
        {
          config: {
            track_score: false,
            type: "bracket"
          },
          phase: 1,
          state: "open",
          title: "Bracket",
          controller: "SingleElimBracketController",
          participants: [
            { name: "A", id: 1 },
            { name: "B", id: 2 },
            { name: "C", id: 3 },
            { name: "D", id: 4 },
            { name: "E", id: 5 },
            { name: "F", id: 6 },
            { name: "G", id: 7 }
          ],
          rounds: [
            {
              title: "Round 1",
              round: 1,
              games: [
                { round: 1, bye: true },
                { home: 4, away: 5, id: 1, round: 1, winner_to: 4, home_score: 10, away_score: 5, result: "home" },
                { round: 1, home: 2, away: 7, id: 2, winner_to: 5 },
                { home: 3, away: 6, id: 3, round: 1, winner_to: 5 }
              ]
            },
            {
              title: "Round 2",
              round: 2,
              games: [
                { home: 1, away_from: 1, away: 4, id: 4, round: 2, winner_to: 6, home_score: 10, away_score: 7, result: "home" },
                { home_from: 2, away_from: 3, id: 5, round: 2, winner_to: 6 }
              ]
            },
            {
              title: "Round 3",
              round: 3,
              games: [
                { home_from: 4, home: 1, away_from: 5, id: 6, round: 3 }
              ]
            }
          ]
        },
        "sets several results")

      SingleEliminationService.private.setResult(t.phases[0], 1, "away", 10, 15)
      
      assert.deepEqual(
        t.phases[0],
        {
          config: {
            track_score: false,
            type: "bracket"
          },
          phase: 1,
          state: "open",
          title: "Bracket",
          controller: "SingleElimBracketController",
          participants: [
            { name: "A", id: 1 },
            { name: "B", id: 2 },
            { name: "C", id: 3 },
            { name: "D", id: 4 },
            { name: "E", id: 5 },
            { name: "F", id: 6 },
            { name: "G", id: 7 }
          ],
          rounds: [
            {
              title: "Round 1",
              round: 1,
              games: [
                { round: 1, bye: true },
                { home: 4, away: 5, id: 1, round: 1, winner_to: 4, home_score: 10, away_score: 15, result: "away" },
                { round: 1, home: 2, away: 7, id: 2, winner_to: 5 },
                { home: 3, away: 6, id: 3, round: 1, winner_to: 5 }
              ]
            },
            {
              title: "Round 2",
              round: 2,
              games: [
                { home: 1, away_from: 1, away: 5, id: 4, round: 2, winner_to: 6 },
                { home_from: 2, away_from: 3, id: 5, round: 2, winner_to: 6 }
              ]
            },
            {
              title: "Round 3",
              round: 3,
              games: [
                { home_from: 4, away_from: 5, id: 6, round: 3 }
              ]
            }
          ]
        },
        "recursively removes results")

    })    

    it("result", function(){


    })

  })



  describe("Pairing", function(){

    it("private.pair", function(){
      assert.deepEqual(
        SingleEliminationService.private.pair(["a", "b", "c", "d"]),
        [ ["a", "d"], ["b", "c"] ],
        "checks simple 4-item array")

      assert.deepEqual(
        SingleEliminationService.private.pair([ ["a", "d"], ["b", "c"] ]),
        [ [ ["a", "d"], ["b", "c"] ] ],
        "checks layered 4-item array")

    })

    it("private.seed", function(){
      assert.deepEqual(
        SingleEliminationService.private.seed(8),
        [1, 8, 4, 5, 2, 7, 3, 6],
        "checks 8-entrant bracket")

      assert.deepEqual(
        SingleEliminationService.private.seed(5),
        [1, undefined, 4, 5, 2, undefined, 3, undefined],
        "checks 5-entrant bracket")

      assert.deepEqual(
        SingleEliminationService.private.seed(2),
        [1, 2],
        "checks 2-entrant bracket")

      assert.deepEqual(
        SingleEliminationService.private.seed(14),
        [1, undefined, 8, 9, 4, 13, 5, 12, 2, undefined, 7, 10, 3, 14, 6, 11],
        "checks 14-entrant bracket")
    })

    it("private.mapEntries", function(){

      assert.deepEqual(
        SingleEliminationService.private.mapEntries(["A", "B", "C", "D"]),
        [
          { name: "A", id: 1 },
          { name: "B", id: 2 },
          { name: "C", id: 3 },
          { name: "D", id: 4 }
        ],
        "checks 4-entrant bracket")

    })

    it("private.createMatches", function(){

      assert.deepEqual(
        SingleEliminationService.private.createMatches(4),
        [
          { round: 1, id: 1, home: 1, away: 4, winner_to: 3 },
          { round: 1, id: 2, home: 2, away: 3, winner_to: 3 },
          { round: 2, id: 3, home_from: 1, away_from: 2 }
        ],
        "checks 4-entrant bracket")

      assert.deepEqual(
        SingleEliminationService.private.createMatches(6),
        [
          { round: 1, bye: true },
          { round: 1, id: 1, home: 4, away: 5, winner_to: 3 },
          { round: 1, bye: true },
          { round: 1, id: 2, home: 3, away: 6, winner_to: 4 },
          { round: 2, id: 3, home: 1, away_from: 1, winner_to: 5 },
          { round: 2, id: 4, home: 2, away_from: 2, winner_to: 5 },
          { round: 3, id: 5, home_from: 3, away_from: 4 }
        ],
        "checks 6-entrant bracket")

    })

    it("private.createPhase", function(){


      assert.deepEqual(
        SingleEliminationService.private.createPhase({
          participants: [
            "A", "B", "C", "D"
          ],
          track_score: true
        }),
        {
          config: {
            track_score: true,
            type: "bracket",
          },
          phase: 1,
          state: "open",
          title: "Bracket",
          controller: "SingleElimBracketController",
          participants: [
            { name: "A", id: 1 },
            { name: "B", id: 2 },
            { name: "C", id: 3 },
            { name: "D", id: 4 }
          ],
          rounds: [
            {
              title: "Round 1",
              round: 1,
              games: [
                { home: 1, away: 4, id: 1, round: 1, winner_to: 3 },
                { home: 2, away: 3, id: 2, round: 1, winner_to: 3 }
              ]
            },
            {
              title: "Round 2",
              round: 2,
              games: [
                { home_from: 1, away_from: 2, id: 3, round: 2 }
              ]
            }
          ]
        },
        "checks 4-entrant bracket")

      assert.deepEqual(
        SingleEliminationService.private.createPhase({
          participants: [
            "A", "B", "C", "D", "E", "F"
          ],
          track_score: false
        }),
        {
          config: {
            track_score: false,
            type: "bracket",
          },
          state: "open",
          phase: 1,
          title: "Bracket",
          controller: "SingleElimBracketController",
          participants: [
            { name: "A", id: 1 },
            { name: "B", id: 2 },
            { name: "C", id: 3 },
            { name: "D", id: 4 },
            { name: "E", id: 5 },
            { name: "F", id: 6 }
          ],
          rounds: [
            {
              title: "Round 1",
              round: 1,
              games: [
                { round: 1, bye: true },
                { home: 4, away: 5, id: 1, round: 1, winner_to: 3 },
                { round: 1, bye: true },
                { home: 3, away: 6, id: 2, round: 1, winner_to: 4 }
              ]
            },
            {
              title: "Round 2",
              round: 2,
              games: [
                { home: 1, away_from: 1, id: 3, round: 2, winner_to: 5 },
                { home: 2, away_from: 2, id: 4, round: 2, winner_to: 5 }
              ]
            },
            {
              title: "Round 3",
              round: 3,
              games: [
                { home_from: 3, away_from: 4, id: 5, round: 3 }
              ]
            }
          ]
        },
        "checks 6-entrant bracket")


    })

    it("private.createStructure", function(){

      assert.deepEqual(
        SingleEliminationService.private.createStructure({
          participants: ["A", "B", "C", "D"],
          track_score: true,
          title: "Foo"
        }),
        {
          config: {},
          title: "Foo",
          service: "SingleEliminationService",
          participants: SingleEliminationService.private.mapEntries(["A", "B", "C", "D"]),
          phases: [
            SingleEliminationService.private.createPhase({
              participants: ["A", "B", "C", "D"],
              track_score: true,
              title: "Foo"
            })
          ]
        },
        "checks 4-entrant bracket")

      assert.deepEqual(
        SingleEliminationService.private.createStructure({
          participants: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
          track_score: true,
          title: "Bar"
        }),
        {
          config: {},
          title: "Bar",
          service: "SingleEliminationService",
          participants: SingleEliminationService.private.mapEntries(["A", "B", "C", "D", "E", "F", "G", "H", "I"]),
          phases: [
            SingleEliminationService.private.createPhase({
              participants: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
              track_score: true,
              title: "Bar"
            })
          ]
        },
        "checks 9-entrant bracket")

    })

    it("generate", function(){

      assert.equal(
        SingleEliminationService.generate({}).title,
        "Sample Tournament",
        "check default properties")

      assert.equal(
        SingleEliminationService.generate({ title: "baz" }).title,
        "baz",
        "check default overrides")

    })

  })
  
})