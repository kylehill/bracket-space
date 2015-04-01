var shortid = require("shortid")

module.exports = {

  _config: {
    shortcuts: false,
    rest: false,
    actions: false
  },

  create: function(req, res) {

    var options = {
      track_score: !!req.body.track_score,
      title: req.body.title,
      participants: req.body.participants
    }

    if (!!req.body.shuffle) {
      options.participants = _.shuffle(options.participants)
    }

    var tournament = SingleEliminationService.generate(options)

    Tournament.create(tournament, function(err, tournament){
      
      tournament.shortUrl = shortid.generate()
      tournament.save(function(err, tournament){

        res.json(tournament)

      })

    })

  }

};

