'use strict';

angular.module('workspaceApp')
  .controller('PollCtrl', function ($scope, $stateParams, Poll, Auth) {
    $scope.vote = {};

    Poll.get({id: $stateParams.id}).$promise.then(function(r) {
      $scope.poll = r;
      if (r.selected) {
        $scope.vote.selected = r.selected;
        $scope.chartConfig.series = resultChartData($scope.poll);
        $scope.chartConfig.title = {text:$scope.poll.text};
      };
    });

    $scope.vote = function() {
      $scope.pending = true;
      Poll.vote({id:$scope.poll._id, choice:$scope.vote.selected}).$promise.then(function(res) {
        $scope.poll = res;
        $scope.chartConfig.series = resultChartData($scope.poll);
        $scope.chartConfig.title = {text:$scope.poll.text};
        $scope.pending = false;
      }, function(err) {
        $scope.errors = err;
        $scope.pending = false;
      });
    };

    $scope.currentUserId = function() {
      return Auth.getCurrentUser()._id;
    };

    $scope.chartConfig = {
      options: {
        chart: {
          type: 'bar'
        },
        colors: ['#bf616a', '#d08770', '#ebcb8b', '#a3be8c', '#96b5b4', '#8fa1b3', '#FF9655', '#b48ead', '#ab7967']
      },
      xAxis: {
        categories: ['Votes']
      },
      loading: false
    };
  });

function resultChartData(poll) {
  return poll.choices.map(function(choice) {
    return {name: choice.text, data:[choice.votes.length]};
  });
}
