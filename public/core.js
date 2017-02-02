angular.module('appFolders',[])
  .controller('appFolderController', function($scope, $http) {
    $scope.folders = [];
    $scope.newFolder = function() {
      $http.post('http://localhost:8000/api/folders/new', JSON.stringify(
        {
          folder: $scope.foldername
        }
      ))
        .then(function(result) {
          console.log(result.data);
        }, function(err) {
          console.log(err);
        });
    };

    $scope.editFolder = function(folder) {
      $http.post('http://localhost:8000/api/folders/edit'), JSON.stringify(
        {
          folder: $scope.folder
        }
      ))
    }

  $scope.newTemplate = function() {
    // add new template in array
  };
});
