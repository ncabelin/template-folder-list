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
        console.log(err);
      });
    };

  $scope.addTemplate = function(folder, newTemplate) {
    // add new template in array if $scope.newTemplate is not empty
    console.log(newTemplate);
    if (newTemplate) {
      $http.post('http://localhost:8000/api/template/add', JSON.stringify(
        {
          id: folder._id,
          templateName: newTemplate
        }
      )).then(function(result) {
        folder.templates = result.data;
      }, function(err) {
        console.log(err);
      });
    }
  };

  $scope.updateTemplate = function(folder, templates) {
    $http.post('http://localhost:8000/api/template/update', JSON.stringify(
        {
          id: folder._id,
          template: templates
        }
      )).then(function(result) {
        console.log('updated templates');
        console.log(result.data);
      }, function(err) {
        console.log(err);
      });
  };

  $scope.deleteTemplate = function(folder, template) {
    console.log(folder);
    $http.post('http://localhost:8000/api/template/delete', JSON.stringify(
      { id: folder._id }
    )).then(function(result) {
      console.log(result.data);
      for (var i = 0, j = $scope.folders.length; i < j; i++) {
        if ($scope.folders[i]._id == folder._id) {
          $scope.folders.splice(i, 1);
        }
      }
    }, function(err) {
      console.log(err);
    });
  };
});
