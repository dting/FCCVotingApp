'use strict';

angular.module('workspaceApp').controller('PollCtrl', function($scope, $stateParams, Poll, Auth) {
  $scope.vote = {};

  Poll.get({id: $stateParams.id}).$promise.then(function(r) {
    $scope.poll = r;
    if (r.selected) {
      $scope.vote.selected = r.selected;
      $scope.chartConfig.series = chartSeries($scope.poll, $scope.chartConfig.options.chart.type);
      $scope.chartConfig.title = {text: $scope.poll.text};
    }
  });

  $scope.vote = function() {
    $scope.pending = true;
    Poll.vote({id: $scope.poll._id, choice: $scope.vote.selected}).$promise.then(function(res) {
      $scope.poll = res;
      $scope.chartConfig.series = chartSeries($scope.poll);
      $scope.chartConfig.title = {text: $scope.poll.text};
      $scope.pending = false;
    }, function(err) {
      $scope.errors = err;
      $scope.pending = false;
    });
  };
  $scope.unvote = function() {
    $scope.pending = true;
    $scope.vote.selected = '';
    Poll.vote({id: $scope.poll._id}).$promise.then(function(res) {
      $scope.poll = res;
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
      colors: ['#bf616a', '#d08770', '#ebcb8b', '#a3be8c', '#96b5b4', '#8fa1b3', '#FF9655', '#b48ead', '#ab7967'],
      plotOptions: {
        pie: {
          allowPointSelect: true, cursor: 'pointer', dataLabels: {
            enabled: true, format: '<b>{point.name}</b>:<br>{point.y} ({point.percentage:.1f} %)', style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }, showInLegend: true
        },
        bar: {
          dataLabels: {
            enabled: true, format: '<b>{series.name}</b>: {point.y}', style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }, showInLegend: true
        },
        column: {
          dataLabels: {
            enabled: true, format: '<b>{series.name}</b>: {point.y}', style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }, showInLegend: true
        }
      }
    }, xAxis: {
      categories: ['Votes'], labels: {
        enabled: false
      }
    }, yAxis: {
      allowDecimals: false, title: {
        enabled: false
      }
    }, loading: false
  };

  $scope.chartType = function(type) {
    $scope.chartConfig.options.chart.type = type;
    $scope.chartConfig.series = chartSeries($scope.poll, type);
  }
});

function chartSeries(poll, chartType) {
  if (chartType === 'bar' || chartType === 'column') {
    return barColSeries(poll);
  } else {
    return pieSeries(poll);
  }
}

function barColSeries(poll) {
  return _.map(poll.choices, function(choice) {
    return {name: choice.text, data: [choice.votes.length]};
  });
}

function pieSeries(poll) {
  var data = _.map(poll.choices, function(choice) {
    return {name: choice.text, y: choice.votes.length};
  });
  return [{name: 'Votes', data: data, colorByPoint: true}];
}
