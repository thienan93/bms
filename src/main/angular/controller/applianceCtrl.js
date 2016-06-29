/**
 * Created on 15/06/2016.
 * @author nthienan
 */
bms.controller('applianceCtrl', ['$scope', '$cookies', 'loginService', '$state', 'applianceService', '$log', '$mdDialog',
    function ($scope, $cookies, loginService, $state, applianceService, $log, $mdDialog) {
        $scope.selected = [];
        $scope.pageRequest = {
            sort: 'name',
            size: 5,
            page: 1
        };
        $scope.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: true,
            limitSelect: true,
            pageSelect: true
        };

        $scope.getAll = function () {
            $scope.promise = applianceService.getAll($scope.pageRequest).then(
                function (response) {
                    $scope.appliances = response.data;
                }, function (error) {
                    $log.error(error);
                });
        };

        $scope.add = function () {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'applianceAddCtrl',
                focusOnOpen: false,
                templateUrl: 'templates/appliance/add.html'
            }).then($scope.getAll);
        };

        $scope.delete = function () {
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete your appliances?')
                .textContent('All of the selected appliances will be deleted. Are you sure?')
                .ok('Yes, Please do it!')
                .cancel('No, I am not.');
            $mdDialog.show(confirm).then(function () {
                applianceService.deletes($scope.selected).then(function () {
                    $scope.selected = [];
                    $scope.getAll();
                }, function (error) {
                    $log.error(error);
                });
            });
        };

        $scope.edit = function (appliance) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'applianceEditCtrl',
                templateUrl: 'templates/appliance/edit.html',
                locals: {
                    appliance: appliance
                }
            }).then($scope.getAll);
        };

        $scope.getAll();
    }
]);