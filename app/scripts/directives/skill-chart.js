'use strict';

/**
 * @ngdoc function
 * @name valorumApp.directives:bubbleChart
 * @description
 * # bubbleChart
 * Bubble Chart
 */
angular.module('valorumApp')
    .directive('skillChart', function () {
        return {
            restrict: 'EA', //E = element, A = attribute, C = class, M = comment
            scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                title: '@',
                skills: '=',
                salary: '=',
				max: '='
            },
            //Embed a custom controller in the directive
            link: function ($scope, element) {

				var theMax = $scope.max;
				var data, markers, markerSvg = [];

				var svg = d3.select(element[0]).append('svg');
				var locationLine = svg.append('line');

				var svgWidth  = element.parent().width() - 100,
					svgHeight = 500;

				var div = d3.select('body').append('div')
					.attr('class', 'chart-tooltip')
					.style('opacity', 0);

				function addAxesAndLegend (xAxis, yAxis, margin, chartWidth, chartHeight) {
					var legendWidth  = 200,
						legendHeight = 100;

					// clipping to make sure nothing appears behind legend
					svg.append('clipPath')
						.attr('id', 'axes-clip')
						.append('polygon')
						.attr('points', (-margin.left)                 + ',' + (-margin.top)                 + ' ' +
							(chartWidth - legendWidth - 1) + ',' + (-margin.top)                 + ' ' +
							(chartWidth - legendWidth - 1) + ',' + legendHeight                  + ' ' +
							(chartWidth + margin.right)    + ',' + legendHeight                  + ' ' +
							(chartWidth + margin.right)    + ',' + (chartHeight + margin.bottom) + ' ' +
							(-margin.left)                 + ',' + (chartHeight + margin.bottom));

					var axes = svg.append('g')
						.attr('clip-path', 'url(#axes-clip)');

					axes.append('g')
						.attr('class', 'x axis')
						.attr('transform', 'translate(0,' + chartHeight + ')')
						.call(xAxis);

					axes.append('g')
						.attr('class', 'y axis')
						.call(yAxis)
						.append('text')
						.attr('transform', 'rotate(-90)')
						.attr('y', 6)
						.attr('dy', '.71em')
						.style('text-anchor', 'end')
						.text('Time (s)');

					var legend = svg.append('g')
						.attr('class', 'legend')
						.attr('transform', 'translate(' + (chartWidth - legendWidth) + ', 0)');

					legend.append('rect')
						.attr('class', 'legend-bg')
						.attr('width',  legendWidth)
						.attr('height', legendHeight);

					legend.append('rect')
						.attr('class', 'outer')
						.attr('width',  75)
						.attr('height', 20)
						.attr('x', 10)
						.attr('y', 10);

					legend.append('text')
						.attr('x', 115)
						.attr('y', 25)
						.text('5% - 95%');

					legend.append('rect')
						.attr('class', 'inner')
						.attr('width',  75)
						.attr('height', 20)
						.attr('x', 10)
						.attr('y', 40);

					legend.append('text')
						.attr('x', 115)
						.attr('y', 55)
						.text('25% - 75%');

					legend.append('path')
						.attr('class', 'median-line')
						.attr('d', 'M10,80L85,80');

					legend.append('text')
						.attr('x', 115)
						.attr('y', 85)
						.text('Median');
				}

				function drawPaths (data, x, y) {
					var upperOuterArea = d3.svg.area()
						.interpolate('basis')
						.x (function (d) { return x(d.date) || 1; })
						.y0(function (d) { return y(d.pct95); })
						.y1(function (d) { return y(d.pct75); });

					var upperInnerArea = d3.svg.area()
						.interpolate('basis')
						.x (function (d) { return x(d.date) || 1; })
						.y0(function (d) { return y(d.pct75); })
						.y1(function (d) { return y(d.pct50); });

					var medianLine = d3.svg.line()
						.interpolate('basis')
						.x(function (d) { return x(d.date); })
						.y(function (d) { return y(d.pct50); });

					var lowerInnerArea = d3.svg.area()
						.interpolate('basis')
						.x (function (d) { return x(d.date) || 1; })
						.y0(function (d) { return y(d.pct50); })
						.y1(function (d) { return y(d.pct25); });

					var lowerOuterArea = d3.svg.area()
						.interpolate('basis')
						.x (function (d) { return x(d.date) || 1; })
						.y0(function (d) { return y(d.pct25); })
						.y1(function (d) { return y(d.pct05); });

					svg.datum(data);

					svg.append('path')
						.attr('class', 'area upper outer')
						.attr('d', upperOuterArea)
						.attr('clip-path', 'url(#rect-clip)');

					svg.append('path')
						.attr('class', 'area lower outer')
						.attr('d', lowerOuterArea)
						.attr('clip-path', 'url(#rect-clip)');

					svg.append('path')
						.attr('class', 'area upper inner')
						.attr('d', upperInnerArea)
						.attr('clip-path', 'url(#rect-clip)');

					svg.append('path')
						.attr('class', 'area lower inner')
						.attr('d', lowerInnerArea)
						.attr('clip-path', 'url(#rect-clip)');

					svg.append('path')
						.attr('class', 'median-line')
						.attr('d', medianLine)
						.attr('clip-path', 'url(#rect-clip)');
				}

				function addMarker (marker, chartHeight, x) {
					var radius = 32,
						xPos = ((parseInt(marker.threshold)/100) * svgWidth),
						yPosStart = chartHeight - radius - 3,
						//use modulus
						yPosEnd = ((markers.indexOf(marker) % 2) ? 160 : 80) + radius - 3;

					var markerG = svg.append('g')
						.attr('class', 'marker')
						.attr('transform', 'translate(' + xPos + ', ' + yPosStart + ')')
						.on('mouseover', function(d) {
							var newHtml = '<b>' + marker.name + ':</b> ' + marker.description;

							div.transition()
								.duration(200)
								.style('opacity', .9);
							div.html(newHtml)
								.style('left', (d3.event.pageX) + 'px')
								.style('top', (d3.event.pageY - 28) + 'px');
						})
						.on('mouseout', function(d) {
							div.transition()
								.duration(500)
								.style('opacity', 0);
						})
						.on('click', function(){
							$scope.max = marker.threshold;
							$scope.$apply();
						});

					markerG.transition()
						.duration(1000)
						.attr('transform', 'translate(' + xPos + ', ' + yPosEnd + ')')
						.attr('opacity', 1);

					markerG.append('path')
						.attr('d', 'M' + radius + ',' + (chartHeight-yPosStart) + 'L' + radius + ',' + (chartHeight-yPosStart))
						.transition()
						.duration(1000)
						.attr('d', 'M' + radius + ',' + (chartHeight-yPosEnd) + 'L' + radius + ',' + (radius*2));

					markerG.append('circle')
						.attr('class', 'marker-bg')
						.attr('cx', radius)
						.attr('cy', radius)
						.attr('r', radius);

					markerG.append('text')
						.attr('x', radius)
						.attr('y', radius*0.9)
						.text(marker.name);

					markerG.append('text')
						.attr('x', radius)
						.attr('y', radius*1.5)
						.text(marker.skills.length + ' skills');

					markerSvg.push(markerG);
				}

				function startTransitions (chartWidth, chartHeight, rectClip, markers, x) {
					rectClip.transition()
						.duration(300 * markers.length)
						.attr('width', chartWidth);

//					rectClip.attr('width', chartWidth);

					markers.forEach(function (marker, i) {
//						setTimeout(function () {
							addMarker(marker, chartHeight, x);
//						}, 300 + 300*i);
					});

				}

				function makeChart (chartData, markers) {
//					var margin = { top: 20, right: 20, bottom: 40, left: 40 },

					var margin = { top: 0, right: 0, bottom: 25, left: 0 },
						chartWidth  = svgWidth  - margin.left - margin.right,
						chartHeight = svgHeight - margin.top  - margin.bottom;

					var x = d3.time.scale().range([0, chartWidth])
							.domain(d3.extent(chartData, function (d) {
								return d.date;
							})),
						y = d3.scale.linear().range([chartHeight, 0])
							.domain([0, d3.max(chartData, function (d) {
								return d.pct95;
							})]);

					var xAxis = d3.svg.axis().scale(x).orient('bottom')
							.innerTickSize(-chartHeight).outerTickSize(0).tickPadding(5),
						yAxis = d3.svg.axis().scale(y).orient('left')
							.innerTickSize(-chartWidth).outerTickSize(0).tickPadding(5);

					svg.attr('width',  svgWidth)
						.attr('height', svgHeight)
						.append('g')
						.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

					// clipping to start chart hidden and slide it in later
					var rectClip = svg.append('clipPath')
						.attr('id', 'rect-clip')
						.append('rect')
						.attr('width', 0)
						.attr('height', chartHeight);

					addAxesAndLegend(xAxis, yAxis, margin, chartWidth, chartHeight);
					drawPaths(data, x, y);
					startTransitions(chartWidth, chartHeight, rectClip, markers, x);
				}

				var parseDate  = d3.time.format('%Y-%m-%d').parse;

				var buildMarkerData = function(markerGroups) {
					markers = markerGroups.map(function (marker) {
						return {
							type: marker.type,
							version: marker.version,
							name: marker.name,
							description: marker.description,
							skills: marker.skills,
							threshold: marker.threshold,
							date: parseDate(marker.date)
						};
					});

					if(data && markers) {
						makeChart(data, markers);
					}
				};

				var rebuildMarkerData = function() {
					angular.forEach(markerSvg, function (marker, i) {
						marker.classed('acquired', function() {
							return $scope.max >= markers[i].threshold;
						});
						marker.classed('needed', function() {
							return $scope.max <= markers[i].threshold;
						});
					});
				};

				var buildChartData = function(rawData) {
					data = rawData.map(function (d) {
						return {
							date:  parseDate(d.date),
							pct05: d.pct05 / 1000,
							pct25: d.pct25 / 1000,
							pct50: d.pct50 / 1000,
							pct75: d.pct75 / 1000,
							pct95: d.pct95 / 1000
						};
					});

					if(data && markers) {
						makeChart(data, markers);
					}
				};

				var moveIndexLine = function() {
					//Move the Line
					locationLine
						.attr('x1',  Math.round(((parseInt($scope.max)/100) * svgWidth + 33)))
						.attr('x2',  Math.round(((parseInt($scope.max)/100) * svgWidth + 33)))
						.attr('y1', 0)
						.attr('y2', svgHeight)
						.attr('stroke', 'rgb(230, 85, 13)')
						.attr('stroke-width', 2)
						.attr('stroke-linecap', 'round')
						.attr('stroke-dasharray', 30);

				};

				$scope.$watch('max', function() {
					if($scope.max) {
						moveIndexLine();
					}
				}, true);

				$scope.$watch('salary', function() {
					if($scope.salary && $scope.salary.length) {
						buildChartData($scope.salary);
					}
				}, true);

				$scope.$watch('skills.all', function() {
					if($scope.skills && $scope.skills.all && $scope.skills.all.length) {
						buildMarkerData($scope.skills.all);
					}
				}, true);

				$scope.$watch(function() {
					if($scope.skills.all && $scope.skills.all.length) {
						return $scope.skills.getAcquired($scope.max).length;
					}
				}, function() {
					if($scope.skills && $scope.skills.all && $scope.skills.all.length) {
						rebuildMarkerData();
					}
				}, true);
			}
        }
    });
