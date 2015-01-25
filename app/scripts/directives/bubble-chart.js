'use strict';

/**
 * @ngdoc function
 * @name valorumApp.directives:lineChart
 * @description
 * # lineChart
 * Line Chart
 */
angular.module('valorumApp')
    .directive('bubbleChart', function () {
        return {
            restrict: 'EA', //E = element, A = attribute, C = class, M = comment
            scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                title: '@',
				skills: '=',
				max: '='
            },
            controller: function () {

            }, //Embed a custom controller in the directive
            link: function ($scope, element) {

				var oldData;

                var diameter = element.parent().width(),
                    format = d3.format(",d"),
                    color = d3.scale.category20c();


                var bubble = d3.layout.pack()
                    .sort(null)
                    .size([diameter, diameter])
                    .padding(1.5);


                var svg = d3.select(element[0]).append("svg")
                    .attr("width", diameter)
                    .attr("height", diameter)
                    .attr("class", "bubble");

				var animate = function(group) {

					if(!oldData || (group.children.length != oldData.children.length)) {
						svg.selectAll("*").remove();

						var node = svg.selectAll(".node")
							.data(bubble.nodes(group)
								.filter(function (d, x, y) {
									return !d.children;
								}))
							.enter().append("g")
							.attr("class", "node")
							.attr("transform", function (d) {
								return "translate(" + d.x + "," + d.y + ")";
							});

						node.append("title")
							.text(function (d) {
								return d.className + ": " + format(d.value);
							});

						node.append("circle")
							.attr("r", function (d) {
								return d.r;
							})
							.style("fill", function (d) {
								return color(d.packageName);
							});
//							.style('opacity', 0)
//							.transition()
//							.duration(200 * 1.2)
//							.style('opacity', 1);

						node.append("text")
							.attr("dy", ".3em")
							.style("text-anchor", "middle")
							.text(function (d) {
								return d.className.substring(0, d.r / 3);
							});

						oldData = angular.copy(group);
					}

				};

                d3.select(self.frameElement).style("height", diameter + "px");

				$scope.$watch('max', function() {
					if($scope.skills && $scope.skills.all && $scope.skills.all.length) {
						animate($scope.skills.getAcquiredDetailedSkills($scope.max));
					}
				}, true);

				$scope.$watch('skills.all', function() {
					if($scope.skills && $scope.skills.all && $scope.skills.all.length) {
						animate($scope.skills.getAcquiredDetailedSkills($scope.max));
					}
				}, true);

            } //DOM manipulation
        }
    });
