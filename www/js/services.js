var app = angular.module('starter.services', []);

app.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

app.service('ContactService', function( $http, $q ) {
  var self = {
    'contacts' : [],
    'loadContacts' : function(){
      var d = $q.defer();
      $http.get("https://codecraftpro.com/api/samples/v1/contact/")
      .success(function success(data){
        console.log(self);
        self.contacts = data.results;
        d.resolve('Yo, data received!');
      })

      .error(function error(msg){
        console.error(msg);
        d.reject('Ops! The http request returned an error.');
      });
      return d.promise;
    }
  };

  return self;
});

app.service('WPService', function($http, $q){
    var self = {
        'posts' : [],
        'isLoading' : false,
        'hasMore' : true,
        'page' : 1,
        'next' : function() {
          self.page += 1;
          return self.loadPosts();
        },
        'refresh': function () {
          self.isLoading = false;
          self.page = 1;
          self.posts = [];
          return self.loadPosts();
        },
        'loadPosts' : function(){
            var deferred = $q.defer();
            self.isLoading = true;

            $http.get('http://beta.cauealmeida.com/?json=1&page=' + self.page)
                .success(function(response){
                  console.log(response);
                  self.isLoading = false;

                  if (response.posts.length == 0) {
                    self.hasMore = false;
                  } else {
                    for (var i = 0; i < response.posts.length; i++) {
                      self.posts.push(response.posts[i]);
                    };
                  };

                  deferred.resolve();
                })

                .error(function(err){
                  self.isLoading = false;
                  console.log(err);
                  deferred.reject(err);
                })

            return deferred.promise;
        }
    }

    return self;
});

app.service('WPPost', function($http, $q){
  var self = {
    'post' : {},
    'getPost' : function(id){
      var d = $q.defer();

      $http.get('http://beta.cauealmeida.com/?json=get_post&post_id=' + id)
        .success(function(response){
          console.log('Cool');
          console.log(response);
          self.post = response.post;
          d.resolve();
        })

        .error(function(err){
          console.log('Fuckk!!');
          return err;
          d.reject();
        })

      return d.promise;
    }
  }

  return self;
});
