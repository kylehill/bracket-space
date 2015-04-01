var controllerMap = function(controller) {

  switch(controller) {
    case "single":
    default:
      return sails.controllers.singleelimination
  }

}

var serviceMap = function(service) {

  switch(service) {
    case "SingleEliminationService":
    default:
      return sails.services.singleeliminationservice
  }

}


module.exports = {
  
  _config: {
    shortcuts: false,
    rest: false,
    actions: false
  },

  create: function(req, res) {

    controllerMap(req.body.tournament_type).create(req, res)

  },

  read: function(req, res) {

    Tournament.findOne({ shortUrl: req.params.shortUrl }).exec(function(err, tournament){

      res.json(tournament)

    })

  },

  result: function(req, res) {

    Tournament.findOne({ shortUrl: req.params.shortUrl }).exec(function(err, tournament){

      var options = {
        match: req.body.match,
        result: req.body.result
      }

      if (!!tournament.config.track_score) {
        options.home_score = req.body.home_score,
        options.away_score = req.body.away_score
      }

      var service = serviceMap(tournament.service)
      tournament = service.result(tournament, options)

      tournament.save(function(err, tournament){
        res.json(tournament)
      })

    })

  }

}