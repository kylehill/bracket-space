module.exports = {
  
  generate: function(options) {
    options = _.extend({}, {
      title: "Sample Tournament",
      participants: [],
      track_score: false
    }, options)
    
    return this.private.createStructure(options)
  },

  result: function(tournament, options) {
    var phase = tournament.phases[0]

    tournament.phases[0] = this.private.setResult(phase, parseInt(options.match), options.result, options.home_score, options.away_score)

    return tournament
  },

  private: {

    setResult: function(phase, id, result, home, away) {
      var matches = this.flatten(phase.rounds)

      var match = _.find(matches, function(m){
        return m.id === id
      })

      var next, winner, loser

      if (match) {
        switch (result) {
          case "home":
          case "away":
            match.result = result
            
            if (!_.isUndefined(home)) {
              match.home_score = home
            }
            else {
              delete match.home_score
            }
            
            if (!_.isUndefined(away)) {
              match.away_score = away
            }
            else {
              delete match.away_score
            }

            if (match.winner_to) {
              winner = (result === "home" ? match.home : match.away)
              next = _.find(matches, function(m){
                return m.id === match.winner_to
              })

              delete next.result
              delete next.away_score
              delete next.home_score

              if (next.home_from === id) {
                next.home = winner
              }
              if (next.away_from === id) {
                next.away = winner
              }

              if (next.winner_to) {
                phase = this.setResult(phase, next.winner_to, "", next.id)
              }
              if (next.loser_to) {
                phase = this.setResult(phase, next.loser_to, "", next.id) 
              }
            }

            if (match.loser_to) {
              loser = (result === "home" ? match.away : match.home)
              next = _.find(matches, function(m){
                return m.id === match.loser_to
              })

              delete next.result
              delete next.away_score
              delete next.home_score

              if (next.home_from === match.id) {
                next.home = loser
              }
              if (next.away_from === match.id) {
                next.away = loser
              }

              if (next.winner_to) {
                phase = this.setResult(phase, next.winner_to, "", next.id)
              }
              if (next.loser_to) {
                phase = this.setResult(phase, next.loser_to, "", next.id) 
              }
            }

            if (match.final) {
              phase.winner = (result === "home" ? match.home : match.away)
            }

            break
          
          default:
            delete match.result
            delete match.away_score
            delete match.home_score

            if (home) {
              if (match.home_from === home) {
                delete match.home
              }
              if (match.away_from === home) {
                delete match.away
              }
            }

            if (match.winner_to) {
              phase = this.setResult(phase, match.winner_to, result, id)
            }

            if (match.loser_to) {
              phase = this.setResult(phase, match.loser_to, result, id)
            }

            if (match.final) {
              delete phase.winner
            }
        }
      }

      phase.rounds = this.inflate(matches)
      return phase
    },

    flatten: function(rounds) {
      return _.flatten(_.map(rounds, function(round){
        return round.games
      }))
    },

    inflate: function(matches) {
      return _.reduce(matches, function(mem, match){
        var round = match.round - 1
        mem[round] = mem[round] || {
          title: "Round " + match.round,
          round: match.round,
          games: []
        }

        mem[round].games.push(match)

        return mem
      }, [])
    },

    createStructure: function(options) {
      return {
        title: options.title,
        service: "SingleEliminationService",
        participants: this.mapEntries(options.participants),
        phases: [
          this.createPhase(options)
        ],
        config: {
          track_score: options.track_score
        }
      }
    },

    createPhase: function(options) {
      var participants = this.mapEntries(options.participants)
      var matches = this.createMatches(participants.length)

      var rounds = this.inflate(matches)

      return {
        phase: 1,
        title: "Bracket",
        controller: "SingleElimBracketController",
        participants: participants,
        state: "open",
        config: {
          type: "bracket",
          track_score: options.track_score
        },
        rounds: rounds
      }
    },

    createMatches: function(count) {
      var gameCounter = 1
      var gameDirectory = {}
      var matches = []
      var queue = this.seed(count)

      var roundCounter = 1

      while (queue.length > 1) {
        var h = queue.shift()
        var a = queue.shift()

        if (_.isUndefined(h) || _.isUndefined(a)) {
          matches.push({
            round: 1,
            bye: true
          })
          queue.push(h || a)
          continue
        }

        var match = {
          id: gameCounter
        }

        if (_.isNumber(h)) {
          match.home = h
        }
        else {
          match.home_from = h.id
          roundCounter = Math.max(h.round + 1, roundCounter)
          gameDirectory[h.id].winner_to = gameCounter
        }

        if (_.isNumber(a)) {
          match.away = a
        }
        else {
          match.away_from = a.id
          roundCounter = Math.max(a.round + 1, roundCounter)
          gameDirectory[a.id].winner_to = gameCounter
        }

        match.round = roundCounter

        gameDirectory[gameCounter] = match
        matches.push(match)
        queue.push(match)

        gameCounter++
      }

      var last = _.last(matches)
      if (last) {
        last.final = true
      }

      return matches
    },

    mapEntries: function(participants) {
      return _.map(participants, function(p, i) {
        return {
          name: p,
          id: i + 1
        }
      })
    },

    pair: function(array) {
      var out = []
      while (array.length > 0) {
        out.push([ array.shift(), array.pop() ])
      }
      return out
    },

    seed: function(count) {
      var p = _.range(1, count+1)

      var rounds = Math.ceil(Math.log(count) / Math.LN2)
      var byes = Math.pow(2, rounds) - count

      _.times(byes, function(){
        p.push(undefined)
      }) 

      while (p.length > 1) {
        p = this.pair(p)
      }

      return _.flatten(p)
    }

  }

}