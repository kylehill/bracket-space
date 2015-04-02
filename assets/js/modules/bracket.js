angular.module("bracketCtrl",[])
.controller("BracketController", [ "$scope", "$stateParams", "$http", function($scope, $stateParams, $http){

  var tournamentId

  var setData = function(data) {
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

  $scope.clickPlayer = function(game, result) {
    
    if (game.result === result) {
      $scope.data = {}
      $.post("/result/" + tournamentId, {
        match: game.id,
        result: ""
      }).success(function(data){
        setData(data)
        $scope.$apply()
      })
      return
    }

    $.post("/result/" + tournamentId, {
      match: game.id,
      result: result
    }).success(function(data){
      setData(data)
      $scope.$apply()
    })
  }

}])