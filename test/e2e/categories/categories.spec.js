describe('E2E: categories', function() {

	describe('index', function(){
		beforeEach(function() {
	    browser.get('/categories');
	  });

	  it('should have a title', function() {
		  expect(browser.getTitle()).toBe('My monuments');
		});

		it('should have a heading', function() {
		  var ele = element(by.css('.index'));
		  expect(browser.isElementPresent(ele)).toBe(true);
		  ele.getText().then(function(text) {
			  expect(text).toBe('Categories');
			});
		});

		it('should have a link to new category page', function() {
		  var ele = element(by.css('.add-category-button'));
		  ele.click();
		  browser.getCurrentUrl().then(function(url){
		  	expect(url).toBe(browser.baseUrl + 'categories/new');
		  });
		});
	});

	describe('add new category', function(){

		it('should have a heading', function() {
			browser.get('/categories/new');
		  var ele = element(by.css('.new-category-title'));
		  expect(browser.isElementPresent(ele)).toBe(true);
		  ele.getText().then(function(text) {
			  expect(text).toBe('New Category');
			});
		});

		it('should be able to create a new category and go to the show page of this new category', function() {
			browser.get('/categories/new');
		  var ele = element(by.id('fieldName'));
		  ele.sendKeys('test category');
		  element(by.css('.save-btn')).click();
		  ele = element(by.css('.show-category-title'));
		  ele.getText().then(function(text) {
			  expect(text).toBe('Category test category');
			});
			element(by.css('.index-link')).click();
			browser.getCurrentUrl().then(function(url){
		  	expect(url).toBe(browser.baseUrl + 'categories');
		  });
		});

		it('the new element should be able in the index page', function() {
		  //Find the new category in the index page
		  browser.get('/categories');
		  var last = element.all(by.css('.link-show-category')).last();
			expect(last.getText()).toBe('test category');
		});

		it('edit the created element', function(){
			browser.get('/categories');
			var last = element.all(by.css('.link-edit-category')).last();
			element.all(by.css('.link-edit-category')).last().getAttribute('href').then(function(attr){
				last.click();
				browser.getCurrentUrl().then(function(url){
			  	expect(url).toBe(attr);
			  });
			  var ele = element(by.id('fieldName'));
			  ele.clear().then(function(){
			  	ele.sendKeys('category hola');
			  	element(by.css('.save-btn')).click();

			  	ele = element(by.css('.show-category-title'));
				  ele.getText().then(function(text) {
					  expect(text).toBe('Category category hola');
					});
					element(by.css('.index-link')).click();
					browser.getCurrentUrl().then(function(url){
				  	expect(url).toBe(browser.baseUrl + 'categories');
				  });
			  });
			});
		});

		it('delete last category', function(){
			browser.get('/categories');
		});
	});
});