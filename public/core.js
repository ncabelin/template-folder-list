angular.module('appFolders',[])
  .controller('appFolderController', function($scope, $http) {
    $scope.editMode = false;

    $scope.getFolders = function() {
      $http.get('http://localhost:8000/api/folders').then(function(result) {
        // get all folders
        console.log(result.data);
        $scope.folders = result.data;
        console.log($scope.folders);
      }, function(err) {
        alert(err);
      });
    };

    $scope.getFolders();

    $scope.newFolder = function() {
      $http.post('http://localhost:8000/api/folders/new', JSON.stringify(
        {
          foldername: $scope.folderName
        }
      ))
        .then(function(result) {
          console.log($scope.folderName);
          $scope.folders.push({
            _id: result.data._id,
            folderName: $scope.folderName
          });
          $scope.folderName = '';
        }, function(err) {
          alert(err);
        });
    };

    $scope.editFolder = function(folder) {
      $http.post('http://localhost:8000/api/folders/edit', JSON.stringify(
        {
          id: folder._id,
          foldername: folder.folderName
        })).then(function(result) {
          console.log(result.data);
        }, function(err) {
          console.log(err);
        });
    };

    $scope.deleteFolder = function(folder) {
      console.log(folder);
      $http.post('http://localhost:8000/api/folders/delete', JSON.stringify(
        { id: folder._id }
      )).then(function(result) {
        console.log(result.data);
        for (var i = 0, j = $scope.folders.length; i < j; i++) {
          if ($scope.folders[i]._id == folder._id) {
            $scope.folders.splice(i, 1);
          }
        }
      }, function(err) {
        alert(err);
      });
    };

  $scope.newTemplate = function() {
    // add new template in array
  };
});
