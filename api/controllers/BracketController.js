module.exports = {

  generate: function(req, res) {

    var entrants = req.param("entrants")

    var bracket = BracketService.generate(entrants)

    return res.json({ bracket: bracket })

  },

  shuffle: function(req, res) {

    var entrants = _.shuffle(req.param("entrants"))

    var bracket = BracketService.generate(entrants)

    return res.json({ bracket: bracket })

  }

};

