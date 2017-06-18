'use strict';

function productsService($http) {
    
    var factory = {};
 
    // read all products
    factory.readProducts = function(){
        return $http.get(serviceBase + 'products');
    };
    
    // create product
    factory.createProduct = function($scope){
        var currentDate = new Date();
        return $http({
            method: 'POST',
            data: {
                'name' : $scope.name,
                'description' : $scope.description,
                'price' : $scope.price,
                'category_id' : 1,
                'created'  :  new Date().toISOString().slice(0, 19).replace('T', ' ')
            },
            url: serviceBase + 'products'
        });
    };
    
    // read one product
    factory.editProduct = function(id){
        return $http({
            method: 'GET',
            url: serviceBase + 'products/' + id
        });
    };
    // updating product
    factory.updateProduct = function($scope){

        return $http({
            method: 'PATCH',
            data: {
                'name' : $scope.name,
                'description' : $scope.description,
                'price' : $scope.price,
                'category_id' : 1,
                'modified'  :  new Date().toISOString().slice(0, 19).replace('T', ' ')
            },
            url: serviceBase + 'products/' + $scope.id
        });
    };
    //deleteing product
    factory.deleteProduct = function (id) {
        
        return $http({
            method: 'DELETE',
            url: serviceBase + 'products/' + id
        });
    };
    return factory;
}

app.factory("productsService", ['$http', productsService]);