module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    src: {
      js: ['src/**/*.js']
    },
    test: {
      js: ['test/**/*Spec.js']
    },
    lint:{
      files:['grunt.js', '<config:src.js>', '<config:test.js>']
    },
    jshint:{
      options:{
        curly:true,
        eqeqeq:true,
        immed:true,
        latedef:true,
        newcap:true,
        noarg:true,
        sub:true,
        boss:true,
        eqnull:true,
        evil: true
      },
      globals:{}
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint test');

  // Testacular stuff
  var testacularCmd = process.platform === 'win32' ? 'testacular.cmd' : 'testacular';
  var testConfigFile = 'testacular.conf.js';
  var runTestacular = function(cmd, options) {
    var args = [cmd, testConfigFile].concat(options);
    var done = grunt.task.current.async();
    var child = grunt.utils.spawn({cmd:testacularCmd, args:args}, function (err, result, code) {
      if (code) {
        grunt.fail.fatal("Test failed...");
      }
      done();
    });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  };

  grunt.registerTask('test-watch', 'watch file changes and test', function() {
    var options = ['--auto-watch', '--reporters=dots', '--no-single-run'];
    runTestacular('start', options);
    options.push('--browsers=PhantomJS');
  });

  grunt.registerTask('test', 'run testacular tests', function () {
    var options = ['--single-run', '--no-auto-watch', '--reporters=dots'];
    options.push('--browsers=PhantomJS');
    // if (process.env.TRAVIS) {
    //   options.push('--browsers=Firefox');
    // } else {
    //   options.push('--browsers=PhantomJS');
    // }
    runTestacular('start', options);
  });
};