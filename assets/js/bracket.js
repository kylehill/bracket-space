var app = angular.module("bracketApp", ["ui.router", "landingCtrl", "bracketCtrl", "inputCtrl"])

app.config([ "$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/");

  $stateProvider
    /*.state("landing", {
      url: "/",
      views: {
        main: { templateUrl: "/partials/landing.html" }
      }
    })
    */
    .state("input", {
      url: "/",
      views: {
        main: { templateUrl: "/partials/input.html" }
      }
    })
    .state("bracket", {
      url: "/:bracket",
      views: {
        main: { templateUrl: "/partials/bracket.html" }
      }
    })

}])

