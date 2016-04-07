app.controller("UserCtrl", ["$http", "$scope", 
	function ($http, $scope) {

		$scope.users = [];

		$scope.name = "";
		$scope.lastName = "";
		$scope.age = "";

		$scope.sendUser = function () {
			var params = {
				name: $scope.name,
	            lastName: $scope.lastName,
	            age: $scope.age
			}

			$http.post("user", params)
				.success(function (data, err) {
					$scope.users = JSON.stringify(data.users);
				});
		}

		$scope.getUsers = function () {
			$http.get("user")
				.success(function (data, err) {
					$scope.users = data.users;
				});
		}

	}]);