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

  $scope.show = false;
});

app.controller('MyCustomController', function( $scope ){
  $scope.title = 'Moooo....';
});

app.controller('FormCtrl', function( $scope ){

});

app.controller('firstCtrl', function( $scope ){
  // For the problem of binding different scope's variables you can not
  // just need bind a scale value, you need to declare the property of an object.
});

app.controller('secondCtrl', function( $scope ){
  $scope.myvar = 'myvar';

  $scope.$watch('myvar', function(newVal, oldVal) {
    console.log(oldVal);
    console.log(newVal);
  })
});

app.controller('myFormCtrl', function( $scope ){
  $scope.model = {};

  $scope.login = function() {
    console.log('Login');
  }
});

app.controller('ClassCtrl', function( $scope ){
  // Starting the bar with stable color and class
  $scope.model = {
    'color' : 'stable'
  }
});

app.controller('RepeatFiltersCtrl', function( $scope, ContactService ){

  $scope.model = {
    'contacts' : []
  };

  ContactService.loadContacts().then(function success(data){
    console.log(data);
    $scope.model.contacts = ContactService.contacts;
  }, function error(msg){
    console.error(msg);
  });

  // $scope.model = ContactService;
});

app.controller('DigestCtrl', function( $scope, $timeout ){
  $scope.msg = "Hello";
  $scope.touch = 1;

  // setTimeout(function() {
  //   console.log("setTimeout called");
  //   $scope.msg = "World"
  // }, 1000);

  $timeout(function(){
    console.log('setTimeout called!');
    $scope.msg = "World";
  }, 1000);

});

app.controller('WPCtrl', function($scope, $state, $rootScope, WPService) {
  // Reseting all the motherfuckers
  $scope.loading = true;
  $scope.posts = [];
  $scope.error = false;

  WPService.loadPosts().then(function success(response){
    $scope.loading = WPService.isLoading;
    $scope.posts = WPService.posts;
  }, function error(err){
    $scope.error = true;
    $scope.loading = WPService.isLoading;
  });

  // Refresh
  $scope.doRefresh = function(){
    $scope.posts = [];

    if (!$scope.loading) {
      WPService.refresh().then(function(){
        $scope.loading = false;
        $scope.posts = WPService.posts;
        $scope.$broadcast('scroll.refreshComplete');
      });
    };
  }

  $scope.goToPost = function(post) {
    $rootScope.id = post.id;
    $state.go('tab.post');
  }
})

app.controller('PostCtrl', function($scope, $rootScope, WPPost) {
  $scope.id = $rootScope.id;
  $scope.post = {};

  WPPost.getPost($scope.id).then(function success(response){
    $scope.post = WPPost.post;
  }, function error(err){
    console.error(err);
  });
});
