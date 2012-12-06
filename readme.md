# ngSandbox

ngSandbox is an Angular Service that allows you to execute
code in a Sandbox environment in the browser.

## How to add to your angular app

First you need to download the sandbox.js file from the scr directory.

Include the file in your script import or minify package.

Then add reference to your angular app.

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

## How to contribute

pull requests welcome.

## Thanks

* AngularJS Team
* NodeJS Team
* JavaScript Team
