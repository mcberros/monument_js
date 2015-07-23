// An example configuration file.
exports.config = {
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },
  chromeDriver: './node_modules/protractor/selenium/chromedriver',
  seleniumAddress: 'http://0.0.0.0:4444/wd/hub',
  baseUrl: 'http://127.0.0.1:3000/',

  // Framework to use. Jasmine 2 is recommended.
  framework: 'jasmine2',

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['test/e2e/**/*.spec.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },
  onPrepare: function(){
    browser.ignoreSynchronization = true;
  }
};
