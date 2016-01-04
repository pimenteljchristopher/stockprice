angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('NoteCtrl', function(
  $scope,
  localStorageService,
  $ionicModal,
  $filter) {


  //Remove from List
  $scope.removeNote = function(index){
    var array = localStorageService.get('note');
    if (index > -1) {
      array.splice(index, 1);
    }
    localStorageService.set('note',array);
   $scope.list =  localStorageService.get('note');
  };

  console.log( localStorageService.get('note'));
  $ionicModal.fromTemplateUrl('templates/note-modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.note_modal = modal;
  });
  // localStorageService.remove('note');
   if(localStorageService.get('note')!=null){
    $scope.list= localStorageService.get('note');
   }else{
     $scope.list = [];
   }
  $scope.note = {
    symbol:"",
    date: "",
    quantity:"",
    price:"",
    total:""
  };
 
  $scope.submitNote = function(insert){
    insert.date =  $filter('date')(insert.date, "dd/MM/yyyy");
    $scope.list.push({
      symbol: insert.symbol,
      date: insert.date,
      quantity: insert.quantity,
      price:insert.price,
      total:insert.total
    });
    localStorageService.set('note',$scope.list);
    $scope.note = {
    symbol:"",
    date: "",
    quantity:"",
    price:"",
    total:""
  };
    $scope.note_modal.hide();
  };
  $scope.showNote = function(){
    $scope.note_modal.show();
 
  };
  $scope.hideNote = function(){
    $scope.note_modal.hide();
  };
  $scope.changeTotal = function(){
   $scope.note.total =  $scope.note.price * $scope.note.quantity;
  };

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
