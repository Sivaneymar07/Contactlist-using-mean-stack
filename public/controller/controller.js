var app = angular.module("myApp", []);

app.controller("AppCtrl", function($scope, $http) {
var refresh = function(){

	

$http.get("/contactlist").success(function(response) {
  	console.log("I got the data");
    $scope.contactlist = response;
    $scope.contact="";
    });
};
 
refresh();

$scope.addContact = function(){
	console.log($scope.contact);
	if(!$scope.contact){
		alert("Please Enter Your Name,Email,Number");
	}else if(!$scope.contact.name){
		alert("Please Enter Name");
	}else if(!$scope.contact.email){
		alert("Please Enter Email");
	}else if(!$scope.contact.number){
		alert("Please Enter Number");
	}else{
		
	$http.post("/contactlist",$scope.contact).success(function(response){
	console.log(response);
	refresh();
	});
    }
}


$scope.remove = function(id){
	console.log(id);
	$http.delete('/contactlist/' + id).success(function(response){
	refresh();
	});
}

$scope.edit = function(id){
	console.log(id);
	$http.get('/contactlist/'+id).success(function(response){
	$scope.contact = response;
	});
}

$scope.update = function(){
	console.log($scope.contact._id);
	$http.put('/contactlist/'+ $scope.contact._id,$scope.contact).success(function(response){
	$scope.contact = response.data;
	refresh();
	});
}

$scope.deselect = function(){
	$scope.contact="";
}

});
