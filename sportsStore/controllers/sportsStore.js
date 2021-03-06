angular.module("sportsStore")
	.constant("dataUrl", "http://localhost:5500/products")
	.constant('orderUrl', "http://localhost:5500/orders")
	.controller('sportsStoreCtrl', ['$scope','$http', '$location','dataUrl','orderUrl','cart', 
		function($scope,$http,$location,dataUrl,orderUrl,cart) {
			$scope.data={};
			//load data from server
			$http.get(dataUrl).success(function(data){
				$scope.data.products=data;
			})
			.error(function(error){
				$scope.data.error=error;
			});

			//send data to server
			$scope.sendOrder=function(shippingDetails){
				var order=angular.copy(shippingDetails);
				order.products=cart.getProducts();
				$http.post(orderUrl,order)
				.success(function(data){
					$scope.data.orderId=data.id;
					cart.getProducts().length=0;
				})
				.error(function(error){
					$scope.data.orderError=error;
				})
				.finally(function(){
					$location.path("/complete");
				})
			}
	}])