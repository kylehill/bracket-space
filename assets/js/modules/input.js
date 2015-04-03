angular.module("inputCtrl", [])
.controller("InputController", [ "$scope", "$http", "$state", function($scope, $http, $state){

  $scope.participants = [
    { name: "" },
  ];

  $scope.shuffle = true
  $scope.title = "Sample Tournament"

  $scope.keyupRow = function($event, text, index) {

    switch ($event.which) {
      case 38: // up
        $(".full-row:eq(" + (index - 1) + ") input").focus()
        return
      case 40: // down
      case 13: // enter
        $(".full-row:eq(" + (index + 1) + ") input").focus()
        return
    }

    if (text === "") {
      if ((index + 1) < $scope.participants.length) {
        $scope.participants.splice(index, 1)
        $(".full-row:last input").focus()
      }
      return
    }

    if (index === $scope.participants.length - 1) {
      $scope.participants.push({ name: "" })
    }

  }

  $scope.createClick = function() {
    var participants = $scope.participants.reduce(function(mem, i){
      if (i.name) {
        mem.push(i.name)
      }

      return mem
    }, [])

    if (participants.length < 2) {
      return
    }

    $http.post("/create", {
      participants: participants,
      title: $scope.title,
      shuffle: $scope.shuffle,
      type: "single"
    }).success(function(data){
      $state.go("bracket", { bracket: data.shortUrl })
    })
  }


}]);