'use strict';

function productsCtrl($scope, $mdDialog, $mdToast, productsService) {
    // read products
    
    $scope.isOpen = false;
    $scope.readProducts = function(){
        
        // use products factory
        productsService.readProducts().then(function successCallback(response){
            // console.log(response);
            $scope.products = response.data;
        }, function errorCallback(response){
            $scope.showToast("Unable to read record.");
        });
 
    }
    
    // show 'create product form' in dialog box
    $scope.showCreateProductForm = function(event){
    
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'views/modals/create_product.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            fullscreen: false // Only for -xs, -sm breakpoints.
        });
    }
     
    // methods for dialog box
    function DialogController($scope, $mdDialog) {
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    }
    // create new product
    $scope.createProduct = function(){
    
        productsService.createProduct($scope).then(function successCallback(response){
            // tell the user new product was created
            $scope.showToast(response.statusText);
    
            // refresh the list
            $scope.readProducts();
    
            // close dialog
            $scope.cancel();
    
            // remove form values
            $scope.clearProductForm();
    
        }, function errorCallback(response){
            $scope.showToast("Unable to create record.");
        });
    }
    // clear variable / form values
    $scope.clearProductForm = function(){
        $scope.id = "";
        $scope.name = "";
        $scope.description = "";
        $scope.price = "";
    }
    // show toast message
    $scope.showToast = function(message){
        $mdToast.show(
            $mdToast.simple()
                .textContent(message)
                .hideDelay(3000)
                .position("top right fixed")
        );
    }
    // retrieve record to fill out the form
    $scope.editProduct = function(id){
    
        // get product to be edited
        productsService.editProduct(id).then(function successCallback(response){
    
            // put the values in form
            $scope.id = response.data.id;
            $scope.name = response.data.name;
            $scope.description = response.data.description;
            $scope.price = response.data.price;
    
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/modals/edit_product.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                fullscreen: false
            }).then(
                function(){},
    
                // user clicked 'Cancel'
                function() {
                    // clear modal content
                    $scope.clearProductForm();
                }
            );
    
        }, function errorCallback(response){
            $scope.showToast("Unable to retrieve record.");
        });
    
    }
    // update product record / save changes
    $scope.updateProduct = function(){
    
        productsService.updateProduct($scope).then(function successCallback(response){
    
            // tell the user product record was updated
            $scope.showToast(response.statusText);
    
            // refresh the product list
            $scope.readProducts();
    
            // close dialog
            $scope.cancel();
    
            // clear modal content
            $scope.clearProductForm();
    
        },
        function errorCallback(response) {
            $scope.showToast("Unable to update record.");
        });
    
    }
    //deleting product
    // cofirm product deletion
    $scope.confirmDeleteProduct = function(event, id){
    
        // set id of record to delete
        $scope.id = id;
    
        // dialog settings
        var confirm = $mdDialog.confirm()
            .title('Are you sure?')
            .textContent('Product will be deleted.')
            .targetEvent(event)
            .ok('Yes, delete')
            .cancel('No');
    
        // show dialog
        $mdDialog.show(confirm).then(
            // 'Yes' button
            function() {
                // if user clicked 'Yes', delete product record
                $scope.deleteProduct(id);
            },
    
            // 'No' button
            function() {
                // hide dialog
            }
        );
    }
    $scope.deleteProduct = function(id){
 
        productsService.deleteProduct(id).then(function successCallback(response){
    
            // tell the user product was deleted
            $scope.showToast('Successfully deleted');
    
            // refresh the list
            $scope.readProducts();
    
        }, function errorCallback(response){
            $scope.showToast("Unable to delete record.");
        });
    
    }
}

app.controller('productsController', 
    [   
        '$scope',
        '$mdDialog',
        '$mdToast',
        'productsService',
        productsCtrl
    ]
); 