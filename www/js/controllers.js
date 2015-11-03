var app = angular.module('starter.controllers', []);

app.controller('DashCtrl', function($scope) {
  $scope.title = "Moooo....";
});

app.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
});

app.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});

app.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

app.controller('MyCustomController', function( $scope ){
  $scope.title = 'Moooo....';
});

app.controller('FormCtrl', function( $scope ){

});

app.controller('firstCtrl', function( $scope ){

});

app.controller('secondCtrl', function( $scope ){
  // For the problem of binding different scope's variables you can not
  // just need bind a scale value, you need to declare the property of an object.
});
