# ngSandbox

ngSandbox is an Angular Service that allows you to execute
code in a Sandbox environment in the browser.

## How to add to your angular app

First you need to download the /src/sandbox.js file from the scr directory.  Include the file in your script import or minify package.  Then add reference to your angular app.

```
angular.module('app', ['ngSandbox']).
  controller('Main', function(sandbox){
    sandbox.exec({
      code: 'console.log("Hello World");'
    }, function(status) {
      $scope.result = status; //-> Hello World
    });
  });

```

## How to run the tests

```
npm install testacular -g
testacular start
[new window]
testacular run
```

Tested in: 

```
Safari 5.1: Executed 7 of 7 SUCCESS (0.582 secs / 0.101 secs)
Chrome 23.0: Executed 7 of 7 SUCCESS (0.736 secs / 0.269 secs)
Firefox 17.0: Executed 7 of 7 SUCCESS (0.877 secs / 0.145 secs)
PhantomJS 1.6: Executed 7 of 7 SUCCESS (0.675 secs / 0.108 secs)
Chrome 25.0: Executed 7 of 7 SUCCESS (0.81 secs / 0.242 secs)
```

## Roadmap

* Remove jQuery dependency
* Add JSHint check to exec
* Add `use strict`
* Improve Error Messages

## How to contribute

pull requests welcome.

## Thanks

* AngularJS Team
* NodeJS Team
* JavaScript Team
