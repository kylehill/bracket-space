module.exports = {

  generate: function(entrants) {

    var count = entrants.length
    var seedArray = this._seed(count)

    var entries = this._mapEntries(entrants, seedArray)

    var games = []
    var gameCounter = 1
    
    while (entries.length > 1) {
      var a = entries.shift()
      var b = entries.shift()
      var game

      if (b === undefined) {
        game = {
          home: a.home || a,
          bye: true,
          round: (a.round || 0) + 1
        }
      }
      else {
        game = {
          round: (a.round || 0) + 1,
          game: gameCounter++
        }

        if (a.bye) {
          game.home = a.home
        }
        else {
          if (a.game) {
            game.home_from = a.game
          }
          else {
            game.home = a
          }          
        }

        if (b.bye) {
          game.away = b.home
        }
        else {
          if (b.game) {
            game.away_from = b.game
          }
          else {
            game.away = b
          }
        }
      }

      games.push(game)
      entries.push(game)
    }

    return games
  },

  /* Private -- included for testability */

  _mapEntries: function(entryArray, seedArray) {
    return _.map(seedArray, function(seed){
      if (seed === undefined) {
        return
      }

      return entryArray[seed]
    })
  },

  _pair: function(array) {
    var out = []
    while (array.length > 0) {
      out.push([ array.shift(), array.pop() ])
    }
    return out
  },

  _seed: function(count) {
    var p = _.range(count)

    var rounds = Math.ceil(Math.log(count) / Math.LN2)
    var byes = Math.pow(2, rounds) - count

    _.times(byes, function(){
      p.push(undefined)
    }) 

    while (p.length > 1) {
      p = this._pair(p)
    }

    return _.flatten(p)
  },
  


}