angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
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
  }
})

.controller('CameraCtrl', function($scope, $cordovaCamera, Scan) {


   function dataURItoBlob(dataURI) {
   // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++)
    {
       ia[i] = byteString.charCodeAt(i);
    }

    var bb = new Blob([ab], { "type": mimeString });
    return bb;
   };


  $scope.takePicture = function() {
    var options = {
      quality : 75,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      //sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit : false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

   $cordovaCamera.getPicture(options).then(function(imageData) {
        var fd = new FormData();

        $scope.imgURI = "data:image/jpeg;base64," + imageData;

        fd.append('UploadedImage', dataURItoBlob("data:image/jpeg;base64,"+imageData));
        $scope.form = fd;
        //Load image into the scope

        alert('Form:' + fd.data);

        //$log.debug('image64:' + imageData);
        alert(Scan.process(fd));
        //$scope.imageURLp = Scan.process(fd);
        //Load Imaged


         //

              }, function(err) {
                  $scope.result='error-outside';
                 }
       );
     }
   })

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
