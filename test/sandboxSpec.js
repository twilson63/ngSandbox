angular.module('test', ['ngSandbox']);
describe('sandbox#runner', function () {
  beforeEach(module('test'));
  it('should return foo in simple console.log', inject(function(sandbox){
      sandbox.exec({
        code: 'console.log("foo")'
      }, function(status, output){
        expect(status).toEqual('HAPPY');
        expect(output[0]).toEqual('foo');
      });
    })
  );
  it('should not be able to run eval', inject(function(sandbox){
      sandbox.exec({
        code: 'eval("alert()");'
      }, function(status){
        expect(status).toEqual('CONFUSED');
      });
    })
  );
  it('should be able to run a equals test', inject(function(sandbox){
      sandbox.exec({
        code: [
          'test("parent", function(){',
            'ok(typeof(parent) === "undefined","should eql undefined");',
          '});'
        ].join('\n')
      }, function(status){
        expect(status).toEqual('HAPPY');
      });
    })
  );
  it('should be able to run a equals test failure', inject(function(sandbox){
      sandbox.exec({
        code: [
          'test("parent", function(){',
            'ok(typeof(parent) === "object", "should eql undefined");',
          '});'
        ].join('\n')
      }, function(status, output){
        expect(output[0]).toEqual('parent should eql undefined');
      });
    })
  );
  it('should be able to run a code before', inject(function(sandbox){
      sandbox.exec({
        before: 'var foo = "bar";',
        code: [
          'test("parent", function(){',
            'ok(foo === "bar", "should eql bar");',
          '});'
        ].join('\n')
      }, function(status, output){
        expect(status).toEqual('HAPPY');
      });
    })
  );
  it('should be able to run a code after', inject(function(sandbox){
      sandbox.exec({
        code: 'var foo = "bar";',
        after: [
          'test("parent", function(){',
            'ok(foo === "bar", "should eql bar");',
          '});'
        ].join('\n')
      }, function(status, output){
        expect(status).toEqual('HAPPY');
      });
    })
  );
  it('should be able to enclose code and run before and after', inject(function(sandbox){
      sandbox.exec({
        before: '(function() { var foo = "bar";',
        code: 'foo = "baz";',
        after: [
          'test("parent", function(){',
            'ok(foo === "baz", "should eql bar");',
          '});',
          '})();'
        ].join('\n')
      }, function(status, output){
        expect(status).toEqual('HAPPY');
      });
    })
  );

});
