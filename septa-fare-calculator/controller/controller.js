angular.module("myApp",[])
.controller('Ctrl', ['$scope', '$http', function($scope, $http){
	$http.get("fares.json").then(function(res){
		$scope.data=res.data;
		var destinations=[];
		var startTime=[];
		for(var i=0; i<$scope.data.zones.length; i++){
			if(destinations.indexOf($scope.data.zones[i].name)<0){
				destinations.push($scope.data.zones[i].name);
			}
			var tmp=$scope.data.zones[i];
			for(var j=0; j<tmp.fares.length; j++){
				if(startTime.indexOf(tmp.fares[j].type)<0){
					startTime.push(tmp.fares[j].type);
				}
			}
		}
		$scope.destinations=destinations;
		$scope.startTime=startTime;
	});		

	$scope.totalPrice=function(){
		if($scope.destination!=null && $scope.begin!=null && $scope.placeToBuy!=null && $scope.rideNum!=null){
			for(var i=0; i<$scope.data.zones.length; i++){
				if($scope.destination==$scope.data.zones[i].name){
					for(var j=0; j<$scope.data.zones[i].fares.length; j++){
						if($scope.begin==$scope.data.zones[i].fares[j].type && $scope.placeToBuy==$scope.data.zones[i].fares[j].purchase){
							$scope.price=$scope.data.zones[i].fares[j].price;
							if($scope.begin=="anytime"){
								$scope.price=$scope.data.zones[i].fares[j].price/10;
							}
						}
					}
				}
			}
		}
		return $scope.price*$scope.rideNum;
	};
}])
