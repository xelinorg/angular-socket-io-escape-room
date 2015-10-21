'use strict';

/* Controllers */
angular.module('myApp.controllers', ['timer'])
    .controller('TimerCtrl', function ($scope, socket) {
        $scope.countdown = {time : 500000000};
        socket.on('send:Message', function (message) {
            if(message.text === ''){
                $scope.myStyle = {'font-size':'xx-large'};
            }else{
                $scope.myStyle = {'font-size':'small'};
            }
            $scope.message = message.text;
        });

        socket.on('send:StopTimer', function () {
            $scope.$broadcast('timer-stop');
        });

        socket.on('send:StartTimer', function () {
            $scope.$broadcast('timer-start');
        });
        socket.on('send:SetTimer', function (message) {
            $scope.$broadcast('timer-set-countdown-seconds', message.timer_init_val);
        });

    })
    .controller('GameCtrl', function($rootScope, $scope, socket){
        $scope.message = 'Game is about to start...';
        socket.on('send:Message', function (message) {
            $scope.message = message.text;
        });
    })
    .controller('AppCtrl', function ($rootScope, $scope, socket) {
        $scope.message = '';
        $scope.timer_init_val = 0;
        $scope.messages = [];

        // Methods published to the scope
        // ==============================

        $scope.LoadMessage = function(message){
            $scope.message = message;
        };

        $scope.SendMessage = function () {
            socket.emit('send:Message', {
                message: $scope.message
            });
            //add message to history
            if($scope.message !== ''){
                $scope.messages.push($scope.message);
            }
            // clear message box
            $scope.message = '';
        };

        $scope.StopTimer = function () {
            socket.emit('send:StopTimer', {
                message: 'stopping timer'
            });
        };
        $scope.StartTimer = function () {
            socket.emit('send:StartTimer', {
                message: 'starting timer'
            });
        };
        $scope.SetTimer = function () {
            socket.emit('send:SetTimer', {
                message: $scope.timer_init_val
            });
        };
    });
