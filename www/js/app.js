// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])



.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

// Processos
    .state('app.processos', {
        url: '/processos',
        views: {
            'menuContent': {
                templateUrl: 'templates/processos.html',
                controller: 'ProcessosCtrl'
            }
        }
    })

    .state('app.add-processo', {
        url: '/add_processo',
        views: {
            'menuContent': {
                templateUrl: 'templates/add-processo.html',
                controller: 'addProcessoCtrl'
            }
        }
    })

    .state('app.item_processo', {
        url: '/processos/:item_processoId',
        views: {
            'menuContent': {
                templateUrl: 'templates/item_processo.html',
                controller: 'itemProcessoCtrl',

            }
        }
    })

// Notas
    .state('app.notes', {
        url: '/processos/:item_processoId/notes',
        views: {
            'menuContent': {
                templateUrl: 'templates/notes.html',
                controller: 'NotesCtrl'
            }
        }
    })

    .state('app.add-nota', {
        url: '/add_nota',
        views: {
            'menuContent': {
                templateUrl: 'templates/add-nota.html',
                controller: 'addNotaCtrl'
            }
        }
    })

// honorario
    .state('app.honorarios', {
        url: '/processos/:item_processoId/honorarios',
        views: {
            'menuContent': {
                templateUrl: 'templates/honorarios.html',
                controller: 'HonorariosCtrl'
            }
        }
    })

    .state('app.add-honorario', {
        url: '/add_honorario',
        views: {
            'menuContent': {
                templateUrl: 'templates/add-honorario.html',
                controller: 'addHonorarioCtrl'
            }
        }
    })




// Clientes

    .state('app.clientes', {
        url: '/clientes',
        views: {
            'menuContent': {
                templateUrl: 'templates/clientes.html',
                controller: 'ClientesCtrl'
            }
        }
    })

    .state('app.add-cliente', {
        url: '/add_cliente',
        views: {
            'menuContent': {
                templateUrl: 'templates/add-cliente.html',
                controller: 'addClienteCtrl'
            }
        }
    })

    .state('app.item_cliente', {
        url: '/clientes/:item_clienteId',
        views: {
            'menuContent': {
                templateUrl: 'templates/item_cliente.html',
                controller: 'itemClienteCtrl',

            }
        }
    })


// Financeiro

    .state('app.financeiro', {
        url: '/financeiro',
        views: {
            'menuContent': {
                templateUrl: 'templates/financeiro.html',
                controller: 'FinanceiroCtrl'
            }
        }
    })

    // .state('app.add-cliente', {
    //     url: '/add_cliente',
    //     views: {
    //         'menuContent': {
    //             templateUrl: 'templates/add-cliente.html',
    //             controller: 'addClienteCtrl'
    //         }
    //     }
    // })

    // .state('app.item_cliente', {
    //     url: '/clientes/:item_clienteId',
    //     views: {
    //         'menuContent': {
    //             templateUrl: 'templates/item_cliente.html',
    //             controller: 'itemClienteCtrl',

    //         }
    //     }
    // })












    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })

    .state('app.browse', {
        url: '/browse',
        views: {
            'menuContent': {
                templateUrl: 'templates/browse.html'
            }
        }
    });





    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/processos');
});
