angular.module("sportsStoreAdmin")
.constant('productUrl', "http://localhost:5500/products/")
.config(['$httpProvider',function($httpProvider) {
	$httpProvider.defaults.withCredentials=true;
}])
.controller('productCtrl', ['$scope','$resource','productUrl', function($scope,$resource,productUrl){
	$scope.productsResource=$resource(productUrl+":id", {id:"@id"});

    //store products array from productsResource to products
	$scope.listProducts=function(){
		$scope.products=$scope.productsResource.query();
	};
	//delete product from products array
	$scope.deleteProduct=function(product){
		product.$delete().then(function(){
			$scope.products.splice($scope.products.indexOf(product),1);
		})
	};
	//create a product 
	$scope.createProduct=function(product){
		new $scope.productsResource(product).$save().then(function(newProduct){
			$scope.products.push(newProduct);
			$scope.editedProduct=null;
		})
	};
	//update product
	$scope.updateProduct=function(product){
		product.$save();
		$scope.editedProduct=null;
	};
	//start edit
	$scope.startEdit=function(product){
		$scope.editedProduct=product;
	};
	//cancel edit
	$scope.cancelEdit=function(){
		$scope.editedProduct=null;
	};
	$scope.listProducts();
	/*The access object doesn't automatically load the data from the server, which is why I call the query 
	method directly at the end of controller function. */
}])