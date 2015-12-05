module.exports = function(config) {
  config.set({
    browsers: ['Chrome', 'Firefox'],
    color: true,
    autoWatch: true,
    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],
    frameworks: ['jasmine'],
    files: [
      '../bower_components/angular/angular.js',
      '../bower_components/ui-router/release/angular-ui-router.js',
      // '../bower_components/angular-mocks/angular-mocks.js',
      '../build/scripts/main.js',
      'unit/**/*.js'
    ],
    excludeFiles: [
      'tests/karma.conf.js'
    ]
  });
};
