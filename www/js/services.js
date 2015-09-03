angular.module('starter.services', [])

.factory('Chats', function() {
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
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
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
})
.factory('Scan', function($http,$log){

  $log.debug('Before');
  return {
    process: function(ImageForm){
      $log.debug('BeforeAfter:' + ImageForm.UploadedImage);
      $http(
         {
             method: 'POST',
             url: 'http://ocrservices.azurewebsites.net/api/Images/Upload',
             data: ImageForm,
             headers: {
               'Content-Type': undefined
             }
         }
       ).
         then(function(response) {
           $log.debug('After');
           return response.data;
           // this callback will be called asynchronously
           // when the response is available
         }, function(response) {
           $log.debug('After1');

           // called asynchronously if an error occurs
           // or server returns response with an error status.
         });
      }
  };
});
