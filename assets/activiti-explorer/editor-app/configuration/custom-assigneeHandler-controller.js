/**
 * 自定义属性： AsigneeHandler 属性
 *
 */
var CustomAsigneeHandlerCtrl = ['$scope', function ($scope) {

    if ($scope.property.value == null || ($scope.property.value.assigneeHandler == undefined && $scope.property.value.assigneeHandler == null)) {
        $scope.property.value = {};
        $scope.property.value.assigneeHandler = null;
    } else {
        $scope.assigneeHandler = $scope.property.value.assigneeHandler;
        // console.info("$scope.property.value==============================" + $scope.property.value.assigneeHandler);
        $scope.property.value.assigneeHandler = $scope.assigneeHandler;
    }


    $scope.asigneeHandlerChanged = function () {
        if ($scope.property.value.assigneeHandler.handlerType == "None") {
            $scope.property.value = null;
        }
        $scope.updatePropertyInModel($scope.property);
    };
}];
