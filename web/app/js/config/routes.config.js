function routing ($routeProvider, $locationProvider, $mdThemingProvider){
    
    /*$locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });*/

    $routeProvider
        .when('/admin/products', {
            templateUrl: 'views/admin/products.html',
            controller: 'productsController'
        })
        .otherwise('/admin/products', {
            templateUrl: 'views/admin/products.html',
            controller: 'productsController'
        });
    $mdThemingProvider.theme('deep-orange')
        .primaryPalette('deep-orange');
    $mdThemingProvider.theme('blue')
        .primaryPalette('blue');
    $mdThemingProvider.theme('green')
        .primaryPalette('green');
}

app.config(['$routeProvider', '$locationProvider', '$mdThemingProvider', routing]);