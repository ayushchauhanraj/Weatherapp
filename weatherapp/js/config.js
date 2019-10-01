// app.config(function ($routeProvider, $locationProvider) {
//     $locationProvider.hashPrefix('');
//     $routeProvider
//         .when('/', { templateUrl: '../views/home.html' })
//         .otherwise({ template: 'Opps you type something wrong' })
// })
app.config(function ($routeProvider, $locationProvider) {
    console.log("inside the config file");
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/', {
            templateUrl: '../views/weather.html'
        })
});