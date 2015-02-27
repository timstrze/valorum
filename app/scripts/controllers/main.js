'use strict';

/**
 * @ngdoc function
 * @name valorefyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the valorefyApp
 */
angular.module('valorefyApp')
    .controller('MainCtrl', function ($scope, $modal, ProgramTerms, Skills) {

		$scope.Skills = Skills;

        ProgramTerms.http.get().$promise.then(function (response) {
            $scope.selectedTerm = response.terms[0];
			$scope.selectedTermIndex = 0;
			$scope.programTerms = response;

			$scope.accumulatedSkills = $scope.getAccumulatedSkills();

			$scope.gainedSkills = $scope.getGainedSkills();
			$scope.futureSkills = $scope.getFutureSkills();

			$scope.setSelectedSkill("Javascript");

        });

		$scope.getGainedSkills = function() {
			var skills = [];
			var index = $scope.programTerms.terms.indexOf($scope.selectedTerm);

			angular.forEach($scope.programTerms.terms, function(term, $index){
				if($index <= index) {
					angular.forEach(term.skills, function(skill){
						skills.push(skill);
					});
				}
			});

			return skills;
		};

		$scope.getFutureSkills = function() {
			var skills = [];
			var index = $scope.programTerms.terms.indexOf($scope.selectedTerm);

			angular.forEach($scope.programTerms.terms, function(term, $index){
				if($index > index) {
					angular.forEach(term.skills, function(skill){
						skills.push(skill);
					});
				}
			});

			return skills;
		};

        $scope.changeTerm = function (term, index) {
            $scope.selectedTerm = term;
            $scope.selectedTermIndex = index;
			$scope.accumulatedSkills = $scope.getAccumulatedSkills();

			$scope.gainedSkills = $scope.getGainedSkills();
			$scope.futureSkills = $scope.getFutureSkills();

			$scope.setSelectedSkill("Javascript");
		};

		$scope.setSelectedSkill = function(skill) {

			if(skill == 'Javascript') {
				$scope.selectedSkill = {
					"name": "Javascript",
					"description": "JavaScript is the Netscape-developed object scripting language used in millions of web pages and server applications worldwide. Netscape's JavaScript is a superset of the ECMA-262 Edition 3 (ECMAScript) standard scripting language, with only mild differences from the published standard.",
					"jobs": [
						{
							"title": "JavaScript Developer",
							"link": "http://www.indeed.com",
							"description": "Launchiez $65,000 - $100,000 a year Launchiez is seeking a talented, motivated developer to join our growing team! We’re agile, we’re a startup, and we move quick! If you’re interested in being."
						},
						{
							"title": "Software Engineer",
							"link": "http://www.indeed.com",
							"description": "Echo Global Logistics The Software Engineer contributes to engineering of large scale solutions to enable Echo’s business while supporting the strategic architectural vision of."
						}
					]
				};
			} else if(skill == 'AngularJS') {
				$scope.selectedSkill = {
					"name": "AngularJS",
					"description": "AngularJS, commonly referred to as Angular, is an open-source web application framework maintained by Google and a community of individual developers and corporations to address many of the challenges encountered in developing single-page applications. Its goal is to simplify both development and testing of such applications by providing a framework for client-side model–view–controller (MVC) architecture, along with components commonly used in rich internet applications.",
					"jobs": [
						{
							"title": "Senior Front End Developer",
							"link": "http://www.indeed.com",
							"description": "Apartments.com is looking for a Senior Front End Developer to join our growing engineering team. In this role you'll be building the next generation Apartments."
						},
						{
							"title": "Angular JS developer",
							"link": "http://www.indeed.com",
							"description": "Job Description HTML5, CSS3, Angular JS, Bootstrap and JQuery developer Expert skills in HTML5, CSS3, JavaScript (Angular JS ), Charting Libraries, HTML5."
						}
					]
				};
			} else if(skill == 'jQuery') {
				$scope.selectedSkill = {
					"name": "jQuery",
					"description": "jQuery is a cross-platform JavaScript library designed to simplify the client-side scripting of HTML.[2] Used by over 60% of the 10,000 most visited websites,[3] jQuery is the most popular JavaScript library in use today.[4][5] jQuery is free, open-source software licensed under the MIT License.",
					"jobs": [
						{
							"title": "Technical Web Content Developer Job",
							"link": "http://www.indeed.com",
							"description": "Technical Web Content Developer-MAR000685 This role manages the static and dynamic templates of the website uscellular.com. This position is also responsible."
						},
						{
							"title": "Front End Developer",
							"link": "http://www.indeed.com",
							"description": "Script, JQuery, SQL, Python and API usage. Script, JQuery, HTML, HTML5, CSS, CSS3, Web Programming Skills, PHP, JAVA, SQL Python, Teamwork, Verbal Communication..."
						}
					]
				};
			} else if(skill == 'HTML') {
				$scope.selectedSkill = {
					"name": "HTML",
					"description": "HTML elements form the building blocks of all websites. HTML allows images and objects to be embedded and can be used to create interactive forms. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. It can embed scripts written in languages such as JavaScript which affect the behavior of HTML web pages.",
					"jobs": [
						{
							"title": "Web Design Consultant",
							"link": "http://www.indeed.com",
							"description": "Extensive knowledge of design and typography, HTML, and CSS. Utilize HTML, CSS, Adobe Creative Cloud, Dreamweaver, Illustrator, Photoshop and other design..."
						},
						{
							"title": "Web Developer-Level II",
							"link": "http://www.indeed.com",
							"description": "Web Developer-Level II About the Job: We are a professional services company seeking a Web Developer-Level II. Your focus will be on new and existing..."
						}
					]
				};
			} else if(skill == 'CSS') {
				$scope.selectedSkill = {
					"name": "CSS",
					"description": "Cascading Style Sheets (CSS) is a style sheet language used for describing the look and formatting of a document written in a markup language. While most often used to change the style of web pages and user interfaces written in HTML and XHTML, the language can be applied to any kind of XML document, including plain XML, SVG and XUL. Along with HTML and JavaScript, CSS is a cornerstone technology used by most websites to create visually engaging webpages, user interfaces for web applications, and user interfaces for many mobile applications.",
					"jobs": [
						{
							"title": "Web Developer/Designer",
							"link": "http://www.indeed.com",
							"description": "Advanced, demonstrated knowledge of HTML and CSS (including table-less markup, XHTML, and HTML5). Has an in-depth frontend and backend knowledge of Word...."
						},
						{
							"title": "Web Designer and Front-End Developer",
							"link": "http://www.indeed.com",
							"description": "HTML and CSS. Tecture is an established web and applications development firm seeking an experienced web designer and front-end developer (with 5 or more years..."
						}
					]
				};
			}
		};

		$scope.getAccumulatedSkills = function() {
			var flattened = {
				name: "Skills Earned",
				children: []
			};

			var index = $scope.programTerms.terms.indexOf($scope.selectedTerm);

			angular.forEach($scope.programTerms.terms, function(term, $index){
				if($index <= index) {
					angular.forEach(term.skills, function(skill){
						flattened.children.push({
							className: skill,
							value: $index + 10,
							packageName: term.name
						});
					});
				}
			});

			return flattened;
		};

		$scope.getRelatedSkills = function() {
			var flattened = {
				name: "Skills Earned",
				children: []
			};

			angular.forEach($scope.relatedSkillSet, function(skill){
				flattened.children.push({
					className: skill,
					value: 10,
					packageName: skill
				});
			});

			$scope.relatedSkills = flattened;
		};

		$scope.openSkillExplorer = function() {
			$scope.modalInstance = $modal.open({
				templateUrl: 'views/partials/skill-explorer.html',
				size: 'lg',
				scope: $scope
			});
		};

		$scope.cancel = function () {
			$scope.modalInstance.dismiss('cancel');
		};

		$scope.selectedSkill = "Javascript";
		$scope.previousSkills = ["HTML", "CSS", "Javascript", "AngularJS", "Ruby"];
		$scope.relatedSkillSet = ["Server", "Analysis", "Design", "Mathematics", "Monitoring", "Programming", "InDesign", "SEO", "Flash", "MySQL"];

		$scope.getRelatedSkills();

    });
