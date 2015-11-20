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