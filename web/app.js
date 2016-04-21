/**
 * Created by vaio on 21.04.2016.
 */
var forumApp = angular.module('forumApp', []);

forumApp.controller('forumController',['$scope', '$http', '$location', forumController]);

function forumController($scope, $http, $location){
    var apiPORT = null;
    var apiURL = null;
    $scope.messages = [];
    $scope.newMessage = {};
    $scope.error = null;

    /**
     * get all [messages] from api
     */
    $scope.reloadMessages = function(){
        $http({method: 'GET', url: apiURL+'/messages'}).
            then(function(response) {
                $scope.error = null;
                $scope.messages = response.data;
            }, function(response) {
                $scope.error = 'internal server error, code '+response.status;
            });
    };

    /**
     * get message.body from api
     * @param message
     */
    $scope.getMessageBody = function(message){
        $http({method: 'GET', url: apiURL+'/message', params: {id: message._id}}).
            then(function(response) {
                $scope.error = null;
                message.body = response.data && response.data.body ? response.data.body : null;
            }, function(response) {
                $scope.error = 'internal server error, code '+response.status;
            });
    };

    /**
     * update {message} to api
     * @param message
     */
    $scope.updateMessage = function(message){
        $http({method: 'POST', url: apiURL+'/message', data: message}).
            then(function(response) {
                $scope.error = null;
                $scope.reloadMessages();
            }, function(response) {
                $scope.error = 'internal server error, code '+response.status;
            });
    };

    /**
     * delete {message} to api
     * @param message
     */
    $scope.deleteMessage = function(message){
        $http({method: 'DELETE', url: apiURL+'/message', params: {id: message._id}}).
            then(function(response) {
                $scope.error = null;
                $scope.reloadMessages();
            }, function(response) {
                $scope.error = 'internal server error, code '+response.status;
            });
    };

    /**
     * mark {message} as editing
     * @param message
     */
    $scope.editMessage = function(message){
        message.isEditing = true;
        $scope.getMessageBody(message);
    };

    /**
     * mark {message} as not editing
     * @param message
     */
    $scope.cancelEditMessage = function(message){
        message.isEditing = false;
    };

    /**
     * mark {message} as deleting
     * @param message
     */
    $scope.deleteConfirm = function(message){
        message.isDeleting = true;
    };

    /**
     * mark {message} as not deleting
     * @param message
     */
    $scope.deleteCancel = function(message){
        message.isDeleting = false;
    };

    /**
     * create {message} to api
     */
    $scope.createMessage = function(){
        $http({method: 'PUT', url: apiURL+'/message', data: $scope.newMessage}).
            then(function(response) {
                $scope.error = null;
                $scope.newMessage = {};
                $scope.reloadMessages();
            }, function(response) {
                if(response.status == 500) $scope.error = 'internal server error, code '+response.status;
                if(response.status == 400) $scope.error = 'validation error';
            });
    };
    /**
     * get api port from config
     * load all [messages]
     */
    $scope.run = function(){
        $http({method: 'GET', url: '/apiport'}).
            then(function(response) {
                apiPORT = response.data && response.data.port ? response.data.port : null;
                apiURL = 'http://'+$location.host()+':'+apiPORT+'/api';
                $scope.reloadMessages();
            }, function(response) {
                $scope.error = 'internal server error, code '+response.status;
            });
    };
    $scope.run();

}