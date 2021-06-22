/**
 * 自定义属性： 会签 signIn 属性
 * 
 */

var CustomSignInCtrl = ['$scope', '$modal', function ($scope, $modal) {

    // Config for the modal window
    var opts = {
        template: 'editor-app/configuration/properties/custom-signIn-popup.html?version=' + Date.now(),
        scope: $scope
    };
    // Open the dialog
    $modal(opts);
}];

var CustomSignInPopupCtrl = ['$scope', function ($scope) {

    // Put json representing form properties on scope
    if ($scope.property.value !== undefined && $scope.property.value !== null
        && $scope.property.value.signIn !== undefined
        && $scope.property.value.signIn !== null) {

        if ($scope.property.value.signIn.constructor == String) {
            $scope.signIn = JSON.parse($scope.property.value.signIn);
        }
        else {
            // Note that we clone the json object rather then setting it directly,
            // this to cope with the fact that the user can click the cancel button and no changes should have happened
            $scope.signIn = angular.copy($scope.property.value.signIn);
        }

    } else {
        // 默认值
        $scope.signIn = {
            orgId: '${orgId}',
            type: ''
        };
    }

    // Click handler for save button
    $scope.save = function () {
        if ($scope.signIn) {
            $scope.property.value = {};
            $scope.property.value.signIn = $scope.signIn;
        } else {
            $scope.property.value = null;
        }

        $scope.updatePropertyInModel($scope.property);
        $scope.close();
    };

    $scope.cancel = function () {
        $scope.close();
    };

    // Close button handler
    $scope.close = function () {
        $scope.property.mode = 'read';
        $scope.$hideFixed();
    };

    // $hide() 方法不生效，手动删除 dom 节点
    $scope.$hideFixed = function () {
        var bodyObj = document.getElementsByTagName("body")[0];
        var modalObj = document.getElementsByClassName("modal")[0];
        var modalBackObj = document.getElementsByClassName("modal-backdrop")[0];
        bodyObj.removeChild(modalObj);
        bodyObj.removeChild(modalBackObj);
    };

}];