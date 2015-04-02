module.exports = {

  home: function(req, res, next) {
    res.render("homepage")
  },

  view: function(req, res, next) {
    Tournament.findOne({ shortUrl: req.params.shortUrl }).exec(function(err, tournament){
      if (!tournament) {
        return next()
      }

      res.render("homepage", { 
        tournament: tournament.shortUrl
      })
    })
  }

}