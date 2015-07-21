describe('E2E: main page', function() {

  beforeEach(function() {
    browser.get('http://127.0.0.1:3000/categories');
  });

  it('should load the home page', function() {
	  var ele = element(by.css('.index'));
	  expect(browser.getTitle()).toBe('My monuments');
	  expect(browser.isElementPresent(ele)).toBe(true);
	});
});

