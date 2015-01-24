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

				var animate = function(root) {

					var rootCopy = angular.copy(root);
					var keep = 0;
					var remove = 0;

					if($scope.max) {
						keep = Math.round(root.children.length * ($scope.max) / 100);
					}

					if(keep == 0) {
						keep = 1;
					}
					remove = root.children.length - keep;
					rootCopy.children.splice(keep, remove);

					if(!angular.equals(rootCopy, oldData)) {
						svg.selectAll("*").remove();

						var node = svg.selectAll(".node")
							.data(bubble.nodes(classes(rootCopy))
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

						node.append("text")
							.attr("dy", ".3em")
							.style("text-anchor", "middle")
							.text(function (d) {
								return d.className.substring(0, d.r / 3);
							});

						oldData = angular.copy(rootCopy);
					}

				};

				// Returns a flattened hierarchy containing all leaf nodes under the root.
                function classes(root) {
                    var classes = [];

                    function recurse(name, node) {
                        if (node.children) node.children.forEach(function (child) {
                            recurse(node.name, child);
                        });
                        else classes.push({packageName: name, className: node.name, value: node.size});
                    }

                    recurse(null, root);
                    return {children: classes};
                }

                d3.select(self.frameElement).style("height", diameter + "px");

				$scope.$watch('max', function() {
					if($scope.skills && $scope.skills.children && $scope.skills.children.length) {
						animate($scope.skills);
					}
				}, true);

				$scope.$watch('skills', function() {
					if($scope.skills && $scope.skills.children && $scope.skills.children.length) {
						animate($scope.skills);
					}
				}, true);

            } //DOM manipulation
        }
    });
