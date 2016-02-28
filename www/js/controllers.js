angular.module('starter.controllers', [
    'ngResource'
])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})


.controller('loginCtrl', function($scope, $ionicModal) {
    $ionicModal.fromTemplateUrl('templates/modal-esquecisenha.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });
})

.controller('cadastrarCtrl', function($scope, $stateParams) {})

.controller('PerfilCtrl', function($scope, $stateParams) {})

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

.controller('addProcessoCtrl', function($scope, $stateParams) {})

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

.controller('addNotaCtrl', function($scope, $stateParams) {

})


// Honorarios
.controller('HonorariosCtrl', function($scope, $stateParams) {})

.controller('addHonorarioCtrl', function($scope, $stateParams) {})


// Clientes
.controller('ClientesCtrl', function($scope, $stateParams, $ionicModal, ClienteService) {
    $scope.clientes = ClienteService.clientes;
})

.controller('addClienteCtrl', function($scope, $stateParams, ClienteService) {
    $scope.salvarCliente = ClienteService.salvarCliente;
})

.controller('editClienteCtrl', function($scope, $stateParams, ClienteService) {
    $scope.object = ClienteService.get($stateParams.cliente_id);
    $scope.object.birthdate = new Date($scope.object.birthdate);
    $scope.salvarCliente = ClienteService.salvarCliente;
})

.controller('itemClienteCtrl', function($scope, $stateParams, ClienteService) {
    $scope.cliente = ClienteService.get($stateParams.item_clienteId);
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
    }, {
        title: 'Abril',
        id: 4
    }, {
        title: 'Maio',
        id: 5
    }, {
        title: 'Junho',
        id: 6
    }, {
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

.controller('itemFinanceiroDiaCtrl', function($scope, $stateParams) {

})

.controller('addLancamentoCtrl', function($scope, $stateParams) {

})


// Agendamentos
.controller('addAgendamentoCtrl', function($scope, $stateParams) {})


.controller('AgendamentoCtrl', function($scope) {

    $("#myCalendar-1").ionCalendar({
        lang: "pt-br",                     // language
        format: "DD.MM.YYYY",           // date format
    });

    $scope.agendamentos = [{
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
    }, {
        title: 'nota 5',
        id: 5
    }, {
        title: 'nota 3',
        id: 6
    }, {
        title: 'nota 4',
        id: 7
    }, {
        title: 'nota 5',
        id: 8
    }, {
        title: 'nota 6',
        id: 9
    }];
})

.factory('Cliente', function($resource) {
    return $resource('http://localhost:8000/api/v1/client/:id/', {id: '@id'}, {update: {method: 'PUT'}});
})

.service('ClienteService', function(Cliente, $location) {
    var self = {
        'clientes': [],
        'page': 1,
        'carregando': false,
        'temProxima': true,
        'temAnterior': false,
        'get': function(id) {
            return Cliente.get({id: id});
        },
        'carregarClientes': function() {
            if (!self.carregando) {
                self.carregando = true;
                var params = {
                    page: self.page
                };
                Cliente.get(params, function(data) {
                    angular.forEach(data.results, function(cliente) {
                        self.clientes.push(new Cliente(cliente));
                    });
                    self.temProxima = data.next;
                    self.temAnterior = !!data.previous;
                    self.carregando = false;
                });
            }
        },
        'salvarCliente': function(cliente, update) {
            var new_client = angular.copy(cliente);
            var birthdate = new Date(new_client.birthdate);
            new_client.birthdate = birthdate.toJSON().split('T')[0];
            if (!update) {
                Cliente.save(new_client).$promise.then(function () {});
            } else {
                delete new_client.picture;
                Cliente.update(new_client).$promise.then(function () {
                    $location.path("/app/clientes");
                });
            }
        }
    };
    self.carregarClientes();
    return self;
});
