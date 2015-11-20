'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'citting';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('customers');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('prices');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('stores');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
	}
]);
'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listArticles', {
			url: '/articles',
			templateUrl: 'modules/articles/views/list-articles.client.view.html'
		}).
		state('createArticle', {
			url: '/articles/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html'
		}).
		state('viewArticle', {
			url: '/articles/:articleId',
			templateUrl: 'modules/articles/views/view-article.client.view.html'
		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);
'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$resource', '$stateParams', '$location', 'Authentication', 'Articles','Stores', 'Customers', 'Prices',
	function($scope, $resource, $stateParams, $location, Authentication, Articles, Stores, Customers, Prices) {
		$scope.authentication = Authentication;		
		$scope.stateParams = $stateParams;

		$scope.create = function() {				

			var amountRowsArticle = $scope.countArt,
				tableArt = document.getElementById('table-art'),
				arrResFullPrice = [],
				arr = [];

							
				$scope.calculate();
			for (var j = amountRowsArticle; j > 0; j--){																								
				$scope.thicknessCreate = tableArt.rows[j].cells[0].childNodes[1].childNodes[1].childNodes[1].value;
				$scope.widthListCreate = tableArt.rows[j].cells[1].childNodes[1].childNodes[1].childNodes[1].value; 
				$scope.lengthListCreate = tableArt.rows[j].cells[2].childNodes[1].childNodes[1].childNodes[1].value;				
				$scope.formListCreate = tableArt.rows[j].cells[3].childNodes[1].childNodes[1].childNodes[1].childNodes[1].checked;
				$scope.meterCut = tableArt.rows[j].cells[4].childNodes[1].childNodes[1].childNodes[1].value;
				$scope.pierceAmount = tableArt.rows[j].cells[5].childNodes[1].childNodes[1].childNodes[1].value;
				$scope.priseCut = tableArt.rows[j].cells[6].childNodes[1].childNodes[1].childNodes[1].value;					
				$scope.weighMetal = tableArt.rows[j].cells[7].childNodes[1].childNodes[1].childNodes[1].value;
				$scope.priseStoreMetalKg = 10;// вытаскивать из цены на складе
				$scope.priseSaleMetalKg = tableArt.rows[j].cells[9].childNodes[1].childNodes[1].childNodes[1].value;
				$scope.priseSaleMetal = tableArt.rows[j].cells[10].childNodes[1].childNodes[1].childNodes[1].value;					
				$scope.amountSheet = tableArt.rows[j].cells[11].childNodes[1].childNodes[1].childNodes[1].value;
				$scope.NamePr = tableArt.rows[j].cells[12].childNodes[1].childNodes[1].childNodes[1].value;
				$scope.sheetCut = tableArt.rows[j].cells[13].childNodes[1].childNodes[1].childNodes[1].childNodes[1].checked;
				
				arr.unshift({
					thicknessCreate: $scope.thicknessCreate,
					widthListCreate: $scope.widthListCreate,
					lengthListCreate: $scope.lengthListCreate,
					formListCreate: $scope.formListCreate,
					meterCut: $scope.meterCut,
					pierceAmount: $scope.pierceAmount,
					priseCut: $scope.priseCut,	
					weighMetal: $scope.weighMetal,
					priseStoreMetalKg:$scope.priseStoreMetalKg,
					priseSaleMetalKg: $scope.priseSaleMetalKg,
					priseSaleMetal:$scope.priseSaleMetal,
					amountSheet:$scope.amountSheet,
					NamePr: $scope.NamePr,
					sheetCut: $scope.sheetCut
				});
			}

					var article = new Articles({
						NameCustomerCreate: this.NameCustomerCreate,								
						contentArticle: this.contentArticle,
						formSale: this.formSale,
						prodSheepment: this.prodSheepment,
						restSheepment: this.restSheepment,
						invoiseCompl: this.invoiseCompl,
						invoisePaid: this.invoisePaid,
						NameAcceptanceOrder: this.NameAcceptanceOrder,
						discount: this.discount,
						sheet:arr,
						arrResFullPrice:$scope.calculate()
					});						
					article.$save(function(response) {
							$location.path('/articles');


							$scope.NameCustomerCreate = '';							
							$scope.thicknessCreate = 0;
							$scope.widthListCreate = 0;
							$scope.lengthListCreate = 0;
							$scope.priseCut = 0;
							$scope.priseSaleMetal = 0;
							$scope.amountSheet = 0;
							$scope.formListCreate = false;
							$scope.meterCut = 0;
							$scope.pierceAmount = 0;
							$scope.weighMetal = 0;
							$scope.priseSaleMetalKg = 0;
							$scope.formSale = false;
							$scope.NamePr = '';
							$scope.NameAcceptanceOrder = '';
							$scope.sheetCut = false;
							$scope.prodSheepment = false;
							$scope.restSheepment = false;
							$scope.invoiseCompl = false;
							$scope.invoisePaid = false;
							$scope.arrResFullPrice = [];
							arr = [];

						}, function(errorResponse) {
							$scope.error = errorResponse.data.message;
						});
			
		};		
				
		$scope.AddNewSheedToArticle = function() {
			var store = new Stores();
			store.$save();
			$scope.store = store;
		}

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
						$scope.find();
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article,
				tableArt = document.getElementById('table-art');
			article.arrResFullPrice = $scope.calculate();

			article.$update(function() {
						$location.path('articles');
					}, function(errorResponse) {
						$scope.error = errorResponse.data.message;
			});
			
			
		};

		$scope.updateList = function(article) {
			article.$update(function() {
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.storeArticles = document.getElementById('arhive-articles').checked;
			$scope.NameCustomerSelect = document.getElementById('name-customer-create').value;
			$scope.beforeDate = document.getElementById('before-date').value;
			$scope.afterDate = document.getElementById('after-date').value;
			$scope.sortPriceCut = document.getElementById('sort-cut').checked;
			$scope.sortPriceMettal = document.getElementById('sort-metal').checked;
			$scope.sortCreated = document.getElementById('sort-created').checked;
			$scope.select = '-created';

			if($scope.sortCreated){				
				$scope.select = '-created';				
			}

			if($scope.sortPriceCut){				
				$scope.select = '-arrResFullPrice[1].totallPriseCut';				
			}

			if($scope.sortPriceMettal){				
				$scope.select = '-arrResFullPrice[1].totallPriseMetal';				
			}

			$scope.customers = Customers.query();
			$scope.articles = Articles.query({arhive:$scope.storeArticles,NameCustomerSelect:$scope.NameCustomerSelect,CustomerBeforeDate:$scope.beforeDate,CustomerAfterDate:$scope.afterDate});




			$scope.Sum = 0;
			$scope.SumMetal = 0;
			$scope.SumCut = 0;
			$scope.SumProfitMetal = 0;

			$scope.articles.$promise.then(function (articles) {
				$scope.page = [];
				$scope.currentPage = 1;
				$scope.numPerPage = 30;
				$scope.maxSize = 10;

				for (var i = articles.length - 1; i >= 0; i--) {
					$scope.Sum = $scope.Sum + Math.round(articles[i].arrResFullPrice[1].totallPrise*100)/100;
					$scope.SumCut = $scope.SumCut + Math.round(articles[i].arrResFullPrice[1].totallPriseCut*100)/100;
					$scope.SumMetal = $scope.SumMetal + Math.round(articles[i].arrResFullPrice[1].totallPriseMetal*100)/100;
					$scope.SumProfitMetal = $scope.SumProfitMetal + Math.round(articles[i].arrResFullPrice[1].totallProfitSaleMetal*100)/100;

				}				
				$scope.makePages = function(arr) {
				  $scope.page = [];
				  for (var i=0; i <= arr.length - 1; i++) {
				    $scope.page.push(arr[i]);
				  }
				};
				$scope.makePages(articles); 

				$scope.$watch('currentPage + numPerPage', function() {
					var begin = (($scope.currentPage - 1) * $scope.numPerPage),
						end = begin + $scope.numPerPage;
				  $scope.articles = $scope.page.slice(begin, end);
				});
			});									
		};

		$scope.findOne = function() {
			
			$scope.customers = Customers.query();
			$scope.stores = Stores.query();
			$scope.prices = Prices.query();
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
			
		};

		$scope.findDiscount = function() {
			$scope.stores = Stores.query();
			$scope.prices = Prices.query();
			$scope.customers = Customers.query();
			var discount = document.getElementById('discount');
			$scope.NameCustomerCreate = document.getElementById('name-customer-create').value;

			$scope.customers.$promise.then(function (customers) {
				for (var n = customers.length - 1; n >= 0; n--) {
			    	if(customers[n].nameCustomer === $scope.NameCustomerCreate){
			    		discount.value = customers[n].discount;
			    	}
			    }
			});
		};
		$scope.removeStoreFromArticle = function(store) {
			store.statuss = 0;
			store.articleIdStore = "";
			store.sheetIdStore = "";
			store.$update();
		};
		

		$scope.calculate = function(articles){
			var amountRowsArticle = $scope.countArt,
				tableArt = document.getElementById('table-art'),
				discount = document.getElementById('discount'),
				article = $scope.article,
				price,
				priseSaleMetal,
				arrRes = [],				
				posPrice = {},
				j;
				$scope.totallPriseMetalFl = 0;
				$scope.totallPriseCutFL = 0;
				$scope.totallProfitSaleMetalFl = 0;
				$scope.arrResFull = [];
				$scope.arrResFullPrice = [];
				$scope.error = '';

							
			if (article) {
				j = article.sheet.length -1;
			} else {
				j = amountRowsArticle-1;
			}

			for ( j; j >= 0; j--){

				$scope.thicknessCreate = tableArt.rows[j+1].cells[0].childNodes[1].childNodes[1].childNodes[1].value;
				$scope.meterCut = tableArt.rows[j+1].cells[4].childNodes[1].childNodes[1].childNodes[1].value;
				$scope.pierceAmount = tableArt.rows[j+1].cells[5].childNodes[1].childNodes[1].childNodes[1].value;
				$scope.amountSheet = tableArt.rows[j+1].cells[11].childNodes[1].childNodes[1].childNodes[1].value;
				$scope.formListCreate = tableArt.rows[j+1].cells[3].childNodes[1].childNodes[1].childNodes[1].childNodes[1].checked;
				$scope.widthListCreate = tableArt.rows[j+1].cells[1].childNodes[1].childNodes[1].childNodes[1].value;
				$scope.lengthListCreate = tableArt.rows[j+1].cells[2].childNodes[1].childNodes[1].childNodes[1].value;
				$scope.sheetCut = tableArt.rows[j+1].cells[13].childNodes[1].childNodes[1].childNodes[1].childNodes[1].checked;

				if(!$scope.thicknessCreate ){
					$scope.error ='Заполните хотя-бы одно поле толщины металла!';
					throw new SyntaxError('Заполните хотя-бы одно поле толщины металла!');
				}
				$scope.discount = parseInt(discount.value);

				for (var i = $scope.prices.length - 1; i >= 0; i--) {
					
					if($scope.prices[i].thickness === parseFloat($scope.thicknessCreate)){
						if ($scope.sheetCut){
							if($scope.discount){
								$scope.price = (tableArt.rows[j+1].cells[6].childNodes[1].childNodes[1].childNodes[1].value * (1-($scope.discount/100)))*$scope.amountSheet;
							} else {
								$scope.price = tableArt.rows[j+1].cells[6].childNodes[1].childNodes[1].childNodes[1].value * $scope.amountSheet;
							}
								
						}else {
							if($scope.discount){
								$scope.price = (($scope.prices[i].thicknessPrice * $scope.meterCut + $scope.pierceAmount * $scope.prices[i].thicknessPiercePrice) * (1-($scope.discount/100)))*$scope.amountSheet;
							} else {
								$scope.price = ($scope.prices[i].thicknessPrice * $scope.meterCut + $scope.pierceAmount * $scope.prices[i].thicknessPiercePrice)*$scope.amountSheet;							
							}
						}
												
					}				    	
			    }
			    tableArt.rows[j+1].cells[6].childNodes[1].childNodes[1].childNodes[1].value = Math.round($scope.price*100)/100;
				if (article){article.sheet[j].priseCut = Math.round($scope.price*100)/100;}


				if(article){					
					if(article.sheet[j].formListCreate){												
						$scope.weighMetal = tableArt.rows[j+1].cells[7].childNodes[1].childNodes[1].childNodes[1].value;
					} else {
						if(article.sheet[j].widthListCreate || article.sheet[j].lengthListCreate){
							$scope.weighMetal = (article.sheet[j].thicknessCreate * article.sheet[j].widthListCreate * article.sheet[j].lengthListCreate)*7.96/1000000;
							tableArt.rows[j+1].cells[7].childNodes[1].childNodes[1].childNodes[1].value = $scope.weighMetal;
							article.sheet[j].weighMetal =  $scope.weighMetal;
						} else {							
							$scope.weighMetal = tableArt.rows[j+1].cells[7].childNodes[1].childNodes[1].childNodes[1].value;
						}
						 
					}
				} else {
					if($scope.formListCreate){						
						$scope.weighMetal = tableArt.rows[j+1].cells[7].childNodes[1].childNodes[1].childNodes[1].value;
					} else {
						if($scope.widthListCreate || $scope.lengthListCreate){
							$scope.weighMetal = ($scope.thicknessCreate * $scope.widthListCreate * $scope.lengthListCreate)*7.96/1000000;
							tableArt.rows[j+1].cells[7].childNodes[1].childNodes[1].childNodes[1].value = $scope.weighMetal;
						} else {							
							$scope.weighMetal = tableArt.rows[j+1].cells[7].childNodes[1].childNodes[1].childNodes[1].value;
						}
						 
					}
				}


			    $scope.priseSaleMetalKg = tableArt.rows[j+1].cells[9].childNodes[1].childNodes[1].childNodes[1].value;
			    $scope.priseSaleMetal = $scope.weighMetal*$scope.priseSaleMetalKg*$scope.amountSheet;
			    tableArt.rows[j+1].cells[10].childNodes[1].childNodes[1].childNodes[1].value =  Math.round($scope.priseSaleMetal*100)/100;
			    if(article){article.sheet[j].priseSaleMetal = Math.round($scope.priseSaleMetal*100)/100;}

			    $scope.priseStoreMetalKg = 10;// вытаскивать из цены на складе
			    tableArt.rows[j+1].cells[8].childNodes[1].childNodes[1].childNodes[1].value = $scope.priseStoreMetalKg;


			    if ($scope.priseSaleMetalKg) {
			    	$scope.profitSaleMetal = (($scope.priseSaleMetalKg - $scope.priseStoreMetalKg) * $scope.weighMetal)*$scope.amountSheet;
			    } else {
			    	$scope.profitSaleMetal = 0;
			    }
			    
			    
			    		      

			    posPrice = {'tricnes':$scope.thicknessCreate,'prMetall':Math.round($scope.priseSaleMetal*100)/100,'prCut':Math.round($scope.price*100)/100,'profitSaleMetal':Math.round($scope.profitSaleMetal*100)/100};			    
			    arrRes.push(posPrice);			    
			}

			
			if(!arrRes.length){
				$scope.error ='Нет данных для расчёта! Добавте хотя-бы один лист и заполните поля';
				throw new SyntaxError('Нет данных для расчёта! Добавте хотя-бы один лист и заполните поля');
			} else if (arrRes.length === 1) {
				$scope.arrResFull.push(posPrice);
			} else {

				arrRes.sort(function(a,b){
					return a.tricnes - b.tricnes;
				});
				
				arrRes.reduce(function (previous,el,index,arr){	

					if(el.tricnes === previous.tricnes){
						previous.prMetall = previous.prMetall + el.prMetall;
						previous.prCut = previous.prCut + el.prCut;
						previous.profitSaleMetal = previous.profitSaleMetal + el.profitSaleMetal;
					} else {					
						$scope.arrResFull.push({'tricnes': previous.tricnes, 'prMetall': Math.round(previous.prMetall*100)/100, 'prCut': Math.round(previous.prCut*100)/100,'profitSaleMetal':Math.round(previous.profitSaleMetal*100)/100}); 
						previous.prMetall = el.prMetall;
						previous.prCut = el.prCut;
						previous.tricnes = el.tricnes;
						previous.profitSaleMetal = el.profitSaleMetal;					
					}	
					if ( arr.length-1 === index) {
						$scope.arrResFull.push({'tricnes': el.tricnes, 'prMetall': Math.round(previous.prMetall*100)/100, 'prCut': Math.round(previous.prCut*100)/100,'profitSaleMetal':Math.round(previous.profitSaleMetal*100)/100});
						
					}				
					return previous;			
				});
			}

			for (var n = $scope.arrResFull.length - 1; n >= 0; n--) {
				$scope.totallPriseMetalFl = $scope.totallPriseMetalFl + Math.round($scope.arrResFull[n].prMetall*100)/100;
				$scope.totallPriseMetal = Math.round($scope.totallPriseMetalFl*100)/100;
				$scope.totallPriseCutFL = $scope.totallPriseCutFL + Math.round($scope.arrResFull[n].prCut*100)/100;
				$scope.totallPriseCut = Math.round($scope.totallPriseCutFL*100)/100;
				$scope.totallPrise =  $scope.totallPriseMetal + $scope.totallPriseCut;
				$scope.totallProfitSaleMetalFl = $scope.totallProfitSaleMetalFl + Math.round($scope.arrResFull[n].profitSaleMetal*100)/100;
				$scope.totallProfitSaleMetal = 	Math.round($scope.totallProfitSaleMetalFl*100)/100;		
			}



			$scope.arrResFullPrice.push($scope.arrResFull);
			$scope.arrResFullPrice.push({'totallPriseMetal': $scope.totallPriseMetal,'totallPriseCut': $scope.totallPriseCut,'totallPrise':$scope.totallPrise,'totallProfitSaleMetal':$scope.totallProfitSaleMetal});
			
			return $scope.arrResFullPrice;
			
		};
	}
]);
'use strict';

angular.module('test').directive('addarticlefield',[  '$http','$compile', 
	 function( $http, $compile){

	 	var tmp_add_article = 'modules/articles/views/add-article.html';
	 	

		return function(scope, element, attrs){

			

			$http.get(tmp_add_article).then(function(response){
				scope.countArt = 0;
				element.bind('click', function(){
					scope.countArt++;
					angular.element(document.getElementById('add-article')).append($compile(response.data)(scope));					
	          	});
	         });
			
			
		};
}]);





'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

// Configuring the Customers module
angular.module('customers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Customers', 'customers', 'dropdown', '/customers(/create)?');
		Menus.addSubMenuItem('topbar', 'customers', 'List Customers', 'customers');
		Menus.addSubMenuItem('topbar', 'customers', 'New Customer', 'customers/create');
	}
]);
'use strict';

// Setting up route
angular.module('customers').config(['$stateProvider',
	function($stateProvider) {
		// Customers state routing
		$stateProvider.
		state('listAustomers', {
			url: '/customers',
			templateUrl: 'modules/customers/views/list-customers.client.view.html'
		}).
		state('createCustomers', {
			url: '/customers/create',
			templateUrl: 'modules/customers/views/create-customer.client.view.html'
		}).
		state('viewCustomers', {
			url: '/customers/:customerId',
			templateUrl: 'modules/customers/views/view-customer.client.view.html'
		}).
		state('editCustomers', {
			url: '/customers/:customerId/edit',
			templateUrl: 'modules/customers/views/edit-customer.client.view.html'
		});
	}
]);
'use strict';

angular.module('customers').controller('CustomersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Customers',
	function($scope, $stateParams, $location, Authentication, Customers) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var customer = new Customers({
				nameCustomer: this.nameCustomer,
				content: this.content,
				discount: this.discount
			});
			customer.$save(function(response) {
				$location.path('customers/' + response._id);

				$scope.nameCustomer = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(customer) {
			if (customer) {
				customer.$remove();

				for (var i in $scope.customers) {
					if ($scope.customers[i] === customer) {
						$scope.customers.splice(i, 1);
					}
				}
			} else {
				$scope.customer.$remove(function() {
					$location.path('customers');
				});
			}
		};

		$scope.update = function() {
			var customer = $scope.customer;

			customer.$update(function() {
				$location.path('customers/' + customer._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.select = 'nameCustomer';
			$scope.NameCustomerSelectC = document.getElementById('NameCustomerSelectC').value;
			$scope.sortName = document.getElementById('sort-name').checked;
			$scope.sortDiscount = document.getElementById('sort-discount').checked;
			$scope.sortCreate = document.getElementById('sort-create').checked;

			if($scope.sortName){
				$scope.select = 'nameCustomer';								
			}

			if($scope.sortDiscount){				
				$scope.select = '-discount';				
			}

			if($scope.sortCreate){				
				$scope.select = '-created';				
			}
			
			Customers.query({CustomerSelC:$scope.NameCustomerSelectC}, function(customers) {
	        	$scope.customers = customers;
	    	});


		};

		$scope.findOne = function() {
			$scope.customer = Customers.get({
				customerId: $stateParams.customerId
			});
		};

	}
]);
'use strict';

//Customers service used for communicating with the customers REST endpoints
angular.module('customers').factory('Customers', ['$resource',
	function($resource) {
		return $resource('customers/:customerId', {
			customerId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Prices module
angular.module('prices').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Prices', 'prices', 'dropdown', '/prices(/create)?');
		Menus.addSubMenuItem('topbar', 'prices', 'List Prices', 'prices');
		Menus.addSubMenuItem('topbar', 'prices', 'New Prices', 'prices/create');
	}
]);
'use strict';

// Setting up route
angular.module('prices').config(['$stateProvider',
	function($stateProvider) {
		// Prices state routing
		$stateProvider.
		state('listPrices', {
			url: '/prices',
			templateUrl: 'modules/prices/views/list-prices.client.view.html'
		}).
		state('createPrice', {
			url: '/prices/create',
			templateUrl: 'modules/prices/views/create-price.client.view.html'
		}).
		state('viewPrice', {
			url: '/prices/:priceId',
			templateUrl: 'modules/prices/views/view-price.client.view.html'
		}).
		state('editPrice', {
			url: '/prices/:priceId/edit',
			templateUrl: 'modules/prices/views/edit-price.client.view.html'
		});
	}
]);
'use strict';

angular.module('prices').controller('PricesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Prices',
	function($scope, $stateParams, $location, Authentication, Prices) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			$scope.prices = Prices.query();
			$scope.thickness = this.thickness;
			$scope.thicknessPrice = this.thicknessPrice;
			$scope.thicknessPiercePrice = this.thicknessPiercePrice;
			$scope.error = 0;

			$scope.prices.$promise.then(function (prices) {
				for (var i = prices.length - 1; i >= 0; i--) {
					if($scope.prices[i].thickness === $scope.thickness){
						return $scope.error = "Такая толщина уже существует в прайсе! В случае потребности редактируйте толщину!";
					}						
				}
				if(!$scope.error){
					var price = new Prices({
						thickness: $scope.thickness,
						thicknessPrice: $scope.thicknessPrice,
						thicknessPiercePrice: $scope.thicknessPiercePrice
					});
					price.$save(function(response) {
						$location.path('prices/' + response._id);

						$scope.thickness = 0;
						$scope.thicknessPrice = 0;
						$scope.thicknessPiercePrice = 0;
					}, function(errorResponse) {
						$scope.error = errorResponse.data.message;
					});
				}
									
			});

			
			
		};

		$scope.remove = function(price) {
			if (price) {
				price.$remove();

				for (var i in $scope.prices) {
					if ($scope.prices[i] === price) {
						$scope.prices.splice(i, 1);
					}
				}
			} else {
				$scope.price.$remove(function() {
					$location.path('prices');
				});
			}
		};

		$scope.update = function() {
			var price = $scope.price;

			price.$update(function() {
				$location.path('prices/' + price._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});			
		};



		$scope.find = function() {
			$scope.prices = Prices.query();
		};

		$scope.findOne = function() {			
			$scope.price = Prices.get({
				priceId: $stateParams.priceId
			});			
		};
	}
]);
'use strict';

//Prices service used for communicating with the prices REST endpoints
angular.module('prices').factory('Prices', ['$resource',
	function($resource) {
		return $resource('prices/:priceId', {
			priceId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Store module
angular.module('stores').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Stores', 'stores', 'dropdown', '/stores(/create)?');
		Menus.addSubMenuItem('topbar', 'stores', 'List Stores', 'stores');
		Menus.addSubMenuItem('topbar', 'stores', 'New Store', 'stores/create');
	}
]);
'use strict';

// Setting up route
angular.module('stores').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listStores', {
			url: '/stores',
			templateUrl: 'modules/stores/views/list-stores.client.view.html'
		}).
		state('createStore', {
			url: '/stores/create',
			templateUrl: 'modules/stores/views/create-store.client.view.html'
		}).
		state('editStore', {
			url: '/stores/:storeId/edit',
			templateUrl: 'modules/stores/views/edit-store.client.view.html'
		}).
		state('storeAddSheet', {
			url: '/store/article/:articleId/sheet/:sheetId/add',
			templateUrl: 'modules/stores/views/add-article-store.client.view.html'
		});
	}
]);
'use strict';

angular.module('stores').controller('StoresController', ['$scope', '$stateParams', '$location', 'Authentication', 'Stores', 'Customers', 'Articles', 
	function($scope, $stateParams, $location, Authentication, Stores, Customers, Articles) {
		$scope.authentication = Authentication;
		$scope.stateParams = $stateParams;
		$scope.create = function() {
			
			var	amountRows = $scope.count;
			try{
				for (var j = amountRows; j > 0; j--) {
					var table = document.getElementById('table'),
					NameCustomer = document.getElementById('NameCustomer');
					$scope.NameCustomer = NameCustomer.value;				
					$scope.thickness = table.rows[j].cells[0].childNodes[1].childNodes[1].childNodes[1].value;
					$scope.widthList = table.rows[j].cells[1].childNodes[1].childNodes[1].childNodes[1].value;
					$scope.lengthList = table.rows[j].cells[2].childNodes[1].childNodes[1].childNodes[1].value;
					$scope.amount = table.rows[j].cells[3].childNodes[1].childNodes[1].childNodes[1].value;
					$scope.priseAllList = table.rows[j].cells[4].childNodes[1].childNodes[1].childNodes[1].value;
					$scope.weightAllList = table.rows[j].cells[5].childNodes[1].childNodes[1].childNodes[1].value;
					$scope.formList = table.rows[j].cells[6].childNodes[1].childNodes[1].childNodes[1].childNodes[3].checked;
					$scope.NameAcceptanceInspector = table.rows[j].cells[7].childNodes[1].value;
					$scope.sheetContent = table.rows[j].cells[8].childNodes[1].childNodes[1].childNodes[1].value;
					if($scope.NameCustomer === 'цех'){
						$scope.weightList = Math.round(($scope.weightAllList/$scope.amount)*100)/100;
					} else {
						if(!$scope.formList){
							$scope.weightList = Math.round($scope.thickness*$scope.widthList*$scope.lengthList*7.9/10000)/100;
						} else {
							$scope.weightList = 0;
						}
					}
					
					$scope.priseKg = Math.round(($scope.priseAllList/$scope.weightAllList)*100)/100;
					$scope.priseOfList =  Math.round(($scope.priseAllList/$scope.amount)*100)/100;
					if(!$scope.thickness){
						$scope.error ='Укажите толщину';
						throw new SyntaxError("Укажите толщину");
					} else if(!$scope.widthList){
						$scope.error ='Укажите ширину';
						throw new SyntaxError("Укажите ширину");
					}else if(!$scope.lengthList){
						$scope.error ='Укажите длинну';
						throw new SyntaxError("Укажите длинну");
					} else if(!$scope.NameCustomer){
						$scope.error ='Укажите имя клиента';
					} else if($scope.NameCustomer === 'цех' && (!$scope.priseAllList || !$scope.weightAllList)){					
							$scope.error = 'Если лиcты принимаются на цех, укажите цену всех листов и вес всех листов из накладной';
							throw new SyntaxError("Если лиcты принимаются на цех, укажите цену всех листов и вес всех листов из накладной");										
					} else if(!$scope.amount){
						$scope.error ='Укажите колличество листов';
						 throw new SyntaxError("Укажите колличество листов");
					} else {

						for (var i = $scope.amount - 1; i >= 0; i--) {
							var store = new Stores({
								NameAcceptanceInspector: $scope.NameAcceptanceInspector,
								NameCustomer: $scope.NameCustomer,
								thickness: $scope.thickness,
								widthList: $scope.widthList,
								lengthList: $scope.lengthList,
								amount: $scope.amount,
								weightList: $scope.weightList,
								priseOfList:  $scope.priseOfList,
								priseKg: $scope.priseKg,
								formList: $scope.formList,
								sheetContent: $scope.sheetContent
								});
								store.$save(function(response) {
								$location.path('/stores');

								$scope.NameAcceptanceInspector = '';
								$scope.NameCustomer = '';
								$scope.thickness = 0;
								$scope.widthList = 0;
								$scope.lengthList = 0;
								$scope.amount = 0;
								$scope.priseAllList = 0;
								$scope.formList = false;
								$scope.sheetContent = '';
							}, function(errorResponse) {
								$scope.error = errorResponse.data.message;
							});			
						}
					}							
				}
			} catch(error) {
				console.log(error)
			}
		};

		$scope.remove = function(store) {
			if (store) {
				store.$remove();

				for (var i in $scope.stores) {
					if ($scope.stores[i] === store) {
						$scope.stores.splice(i, 1);
					}
				}
			} else {
				$scope.store.$remove(function() {
					$location.path('stores');
				});
			}
		};

		$scope.update = function() {
			var store = $scope.store,
				calculateWeightList;
						

			$scope.formList = document.getElementById('form-list').checked;
			$scope.thickness = document.getElementById('thickness').value;
			$scope.widthList = document.getElementById('widthList').value;
			$scope.lengthList = document.getElementById('lengthList').value;
			$scope.NameCustomer = document.getElementById('NameCustomer').value;

			calculateWeightList =  Math.round(($scope.thickness*$scope.widthList*$scope.lengthList*7.86/1000000)*100)/100;					
			 
			if(!$scope.formList && $scope.NameCustomer !== 'цех'){
				store.weightList = calculateWeightList
			}
			if($scope.NameCustomer === 'цех'){
				if( $scope.initFormList && !$scope.formList){
					store.weightList = calculateWeightList
				}
				if($scope.thickness !== $scope.initThickness || $scope.widthList !== $scope.initWidthList || $scope.lengthList !== $scope.initLengthList){	
					if(!$scope.formList){
						store.weightList = calculateWeightList
					}										
				} else {
					if($scope.formList){
						store.weightList = document.getElementById('weightList').value;
					}					
				}							
			}
			store.priseOfList =  Math.round(store.weightList*store.priseKg);		

			store.$update(function() {
				$location.path('stores');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.NameCustomerSelect = document.getElementById('NameCustomerSelect').value;			
			$scope.thicknesSel = parseFloat(document.getElementById('thicknesSel').value);
			$scope.widthSel = parseInt(document.getElementById('widthSel').value);
			$scope.lengthSel = parseInt(document.getElementById('lengthSel').value);
			$scope.beforeDate = document.getElementById('before-date').value;
			$scope.afterDate = document.getElementById('after-date').value;

			$scope.select = '-created';
			$scope.sortName = document.getElementById('sort-name').checked;
			$scope.sortCreated = document.getElementById('sort-created').checked;
			$scope.sortPriseKg = document.getElementById('sort-sortPriseKg').checked;
			$scope.thickness = document.getElementById('sort-thickness').checked;
			$scope.widthList = document.getElementById('sort-widthList').checked;
			$scope.lengthList = document.getElementById('sort-lengthList').checked;

			if($scope.sortName){
				$scope.select = 'NameCustomer';								
			}

			if($scope.sortCreated){				
				$scope.select = '-created';				
			}

			if($scope.sortPriseKg){				
				$scope.select = '-priseKg';				
			}

			if($scope.thickness){				
				$scope.select = 'thickness';				
			}

			if($scope.widthList){				
				$scope.select = '-widthList';				
			}

			if($scope.lengthList){				
				$scope.select = '-lengthList';				
			}


			$scope.stores = Stores.query({CustomerSel:$scope.NameCustomerSelect,CustomerTr:$scope.thicknesSel,CustomerW:$scope.widthSel,CustomerL:$scope.lengthSel,CustomerBeforeDate:$scope.beforeDate,CustomerAfterDate:$scope.afterDate});
	    	$scope.customers = Customers.query();

	    	$scope.SumOwnMetalWeight = 0;
	    	$scope.SumOwnPriceMetal = 0;
	    	$scope.stores.$promise.then(function (stores) {

				for (var i = stores.length - 1; i >= 0; i--) {
					if(stores[i].NameCustomer === 'цех'){
						$scope.SumOwnMetalWeight = $scope.SumOwnMetalWeight + Math.round(stores[i].weightList*100)/100;
						$scope.SumOwnPriceMetal = $scope.SumOwnPriceMetal + Math.round(stores[i].priseOfList*100)/100;
					}
				}

			});			
		};

		$scope.findOne = function() {
			$scope.store = Stores.get({
				storeId: $stateParams.storeId
			});
			$scope.customers = Customers.query();

			angular.element(document).ready(function () {
				$scope.initThickness = document.getElementById('thickness').value;
				$scope.initWidthList = document.getElementById('widthList').value;
				$scope.initLengthList = document.getElementById('lengthList').value;
				$scope.initFormList = document.getElementById('form-list').checked;
			});
		};	

		$scope.findCustomer = function() {
			$scope.customers = Customers.query();
		};
		//add sheet to article
		
		$scope.AddSheetToArticle = function() {
			var stores = $scope.stores;
			for (var i in stores) {
				if (stores[i].addstatus == 1) {	
					stores[i].statuss = 1;			
					stores[i].$update(function() {
						window.history.back();
					}, function(errorResponse) {
						$scope.error = errorResponse.data.message;
					});
				}
			}
		}
		
		
		
	}

]);
angular.module('stores').filter('convertSheetStatus', function () {	 
	  return function (item) {
	  	item = item.toString();
	  	switch (item) {
		   case '0':
		    	item = 'свободен';
		    	break
		   case '1':
		    	item = 'в роботе';
		    	break
		   default:
		      	item = '';
		      	break
		}
	    return item;
	  };
});
'use strict';

angular.module('test').directive('addlist',[  '$http','$compile', 
	 function( $http, $compile){

	 	var tmp_add_list = 'modules/stores/views/add-list.html';
	 	

		return function(scope, element, attrs){

			

			$http.get(tmp_add_list).then(function(response){
				scope.count = 0;
				element.bind('click', function(){
					scope.count++;
					angular.element(document.getElementById('add-list')).append($compile(response.data)(scope));					
	          	});
	         });
			
			
		};
}]);




//'<form name="storeForm'+scope.count+'" class="form-horizontal" data-ng-submit="create()" novalidate>'+response.data+'</form>'
'use strict';

//Store service used for communicating with the articles REST endpoints
angular.module('stores').factory('Stores', ['$resource',
	function($resource) {
		return $resource('stores/:storeId', {
			storeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);