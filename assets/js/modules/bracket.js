angular.module("bracketCtrl",[])
.controller("BracketController", [ "$scope", "$stateParams", "$http", function($scope, $stateParams, $http){

  var showGameInDisplay = function(phase, game) {
    $scope.activePhase = phase
    $scope.activeGame = game
    $scope.showResult = true
    $scope.inputGame = {}
  }

  $scope.saveResult = function() {
    $scope.data = {}
    $scope.showResult = false

    if ($scope.inputGame.home_score === undefined || 
        $scope.inputGame.away_score === undefined ||
        $scope.inputGame.home_score === $scope.inputGame.away_score) {
      $http.post("/result/" + tournamentId, {
        match: $scope.activeGame.id,
        result: ""
      }).success(function(data){
        setData(data)
      })

      return
    }

    $http.post("/result/" + tournamentId, {
      match: $scope.activeGame.id,
      result: ($scope.inputGame.home_score > $scope.inputGame.away_score ? "home" : "away"),
      home_score: $scope.inputGame.home_score,
      away_score: $scope.inputGame.away_score,
    }).success(function(data){
      setData(data)
    })
    return

  }

  $scope.roundTitle = function() {
    if ($scope.activeGame) {
      return "Round " + $scope.activeGame.round
    }
  }

  $scope.gameTitle = function() {
    if ($scope.activeGame) {
      return "Game " + $scope.activeGame.id
    }
  }

  $scope.roundMap = {
    1: "active",
    2: "activePlus1",
    3: "activePlus2",
    4: "activePlus3"
  }

  var tournamentId

  var setData = function(data) {
    //console.log("setting")
    $scope.data = data;
    tournamentId = data.shortUrl;

    $scope.participants = data.participants.reduce(function(mem, val){
      mem[val.id] = val.name
      return mem
    }, {})
  }

  if ($stateParams.bracket) {
    $http.get("/t/" + $stateParams.bracket).success(setData);
  }

  $scope.clickGame = function(phase, game) {
    if (!phase.config.track_score) {
      return
    }

    if (game.bye) {
      return
    }

    showGameInDisplay(phase, game)
  }

  $scope.clickPlayer = function(phase, game, result) {
    if (phase.config.track_score) {
      return
    }

    if (game.result === result) {
      $scope.data = {}
      $http.post("/result/" + tournamentId, {
        match: game.id,
        result: ""
      }).success(function(data){
        setData(data)
        $scope.$apply()
      })
      return
    }

    $http.post("/result/" + tournamentId, {
      match: game.id,
      result: result
    }).success(function(data){
      setData(data)
      $scope.$apply()
    })
  }

}])