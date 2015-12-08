angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})


.controller('PerfilCtrl', function($scope, $stateParams) {
})

// Processos
.controller('ProcessosCtrl', function($scope, $stateParams, $ionicModal, $http) {
    $scope.processos = [{
        title: 'TJSP Completo 000109…',
        id: 1
    }, {
        title: 'TJSP Completo 000110…',
        id: 2
    }, {
        title: 'TJSP Completo 000111',
        id: 3
    }, {
        title: 'TJSP Completo 000112',
        id: 4
    }];



    $scope.doRefresh = function() {
        $http.get('/new-processos')
            .success(function(newProcessos) {
                $scope.processos = newProcessos;
            })
            .finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
    };
})

.controller('addProcessoCtrl', function($scope, $stateParams) {
})

.controller('itemProcessoCtrl', function($scope, $ionicModal, $stateParams) {
    $scope.doRefresh = function() {
        $http.get('/item_processos')
            .success(function(itemProcessos) {
                $scope.item_processos = itemProcessos;
            })
            .finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
    };



    $ionicModal.fromTemplateUrl('templates/modal-add-cliente-processo.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });
})



// Notas
.controller('NotesCtrl', function($scope, $stateParams) {
    $scope.notas = [{
        title: 'nota 1',
        id: 1
    }, {
        title: 'nota 2',
        id: 2
    }, {
        title: 'nota 3',
        id: 3
    }, {
        title: 'nota 4',
        id: 4
    }];
})

.controller('addNotaCtrl', function($scope, $stateParams) {})



// Honorarios
.controller('HonorariosCtrl', function($scope, $stateParams) {})

.controller('addHonorarioCtrl', function($scope, $stateParams) {})



// Clientes
.controller('ClientesCtrl', function($scope, $stateParams, $ionicModal) {
    $scope.clientes = [{
        title: 'Filipe Raiz',
        id: 1
    }, {
        title: 'Renato Filho',
        id: 2
    }, {
        title: 'Gustavo Carvalho',
        id: 3
    }, {
        title: 'Gabriel',
        id: 4
    }];
})

.controller('addClienteCtrl', function($scope, $stateParams) {
})

.controller('itemClienteCtrl', function($scope, $stateParams) {
})


// Financeiro
.controller('FinanceiroCtrl', function($scope, $stateParams, $ionicModal) {
    $scope.meses = [{
        title: 'Janeiro',
        id: 1
    }, {
        title: 'Fevereiro',
        id: 2
    }, {
        title: 'Março',
        id: 3
    },{
        title: 'Abril',
        id: 4
    },
    {
        title: 'Maio',
        id: 5
    },
    {
        title: 'Junho',
        id: 6
    },
     {
        title: 'Julho',
        id: 7
    }];
})

.controller('itemFinanceiroMesCtrl', function($scope, $stateParams) {
    $scope.item_data_lancamentos = [{
        data: '03/01',
        id: 1
    }, {
        data: '04/01',
        id: 2
    }];

    $scope.item_lancamentos = [{
        categoria: 'Transporte',
        id: 1
    }, {
        categoria: 'Outros',
        id: 2
    }];

})

.controller('addLancamentoCtrl', function($scope, $stateParams) {
});