angular.module('ngSandbox', []).factory('sandbox', function() {
  // Simple test framework for code runner
  var framework = [
  'window.run = eval;',
  'delete window.constructor;',
  'window.constructor = undefined;',
  'delete window.Window;',
  'delete window.DOMWindow;',
  'delete window.XMLHttpRequest;',
  'delete window.setTimeout;',
  'delete window.clearTimeout;', 
  'delete window.setInterval',
  'delete window.clearInterval;',
  'delete window.eval;', 
  'delete window.parent;',
  'delete window.execScript;',
  'window.location = undefined;',
  'window.document = undefined;',
  'parent = undefined;',
  'var out = [];',
  'var __ = "incomplete";',
  'var console = {};',
  'console.log = function(a) { out.push({status: "passed", msg: a}); };',
  'var test = function(desc, fn) {',
  '    try {',
  '        fn();',
  '    } catch (err) {',
  '        out.push({ status: "failed", msg: desc + " " + err.message});',
  '    }',
  '}',
  'var equals = function(a, b, msg) {',
  '    if(a !== b) {',
  '      throw new Error(msg);',
  '    } else {',
  '      out.push({ status: "passed"});',
  '    }',
  '}',
  'var ok = function(a, msg){ equals(a,true,msg); }',
  'var not = function(a, msg){ equals(a,false,msg); }'
  ];
  var runner = {};
  // run lessons code
  // 
  // parameters: 
  //   -  data - object containing {code, before, after} strings of code
  //   -  callback - function that is called when function is complete
  // Call back returns the status [HAPPY, SAD, CONFUSED]
  // and the output an array of strings representing the output of the code
  //
  runner.exec = function(data, cb){
    if (typeof(data) === 'function') { console.log('data required!'); return; }

    var $ = angular.element;
    var HAPPY = 'HAPPY';
    var SAD = 'SAD';
    var CONFUSED = 'CONFUSED';

    var status = HAPPY;
    var output = [];
    // create iframe
    var iframe = $('<iframe style="display: none;"></iframe>').appendTo('body')[0];
    // eval framework code in iframe
    iframe.contentWindow.eval(framework.join("\n"));
    // add jshint step...

    // eval test code in frame
    try {
      if(data.before) { iframe.contentWindow.run(data.before) };
      if(data.code) { iframe.contentWindow.run(data.code); };
      if(data.after) { iframe.contentWindow.run(data.after); };
    } catch(err) { 
      status = CONFUSED; 
      output = [err.message];
    }
    // if error show sad face and error
    if(!CONFUSED && iframe.contentWindow.out.length == 0) {
      status = CONFUSED;
      output = ['No Tests to run!'];
    } else {
      iframe.contentWindow.out.forEach(function(res){
        if(res.status === 'failed'){
          status = SAD;
        }
        output.push(res.msg);
      });
    };
    // remove iframe
    $('iframe').remove();
    // return code
    cb(status, output);
  };
  return runner;
});