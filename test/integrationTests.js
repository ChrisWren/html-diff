/*jshint expr: true*/

require('should');
var sinon = require('sinon');

var htmlDiff = require('../index');

describe('html-diff', function () {

  describe('when run on folders with html files to diff', function() {

    describe('if the folders have different contents', function () {

      it('should log files that are unique to each folder', function() {
        var consoleSpy = sinon.stub(console, 'log');
        htmlDiff([{
          path: 'test/fixtures/templateEngine1',
          name: 'engine1'
        }, {
          path: 'test/fixtures/templateEngine2',
          name: 'engine2'
        }]);
        consoleSpy.firstCall.args[0].should.include('which was not found for');
        console.log.restore();
      });

      it('should log the differences between files', function() {
        var stdoutSpy = sinon.stub(process.stdout, 'write');
        htmlDiff([{
          path: 'test/fixtures/templateEngine1',
          name: 'engine1'
        }, {
          path: 'test/fixtures/templateEngine2',
          name: 'engine2'
        }]);
        stdoutSpy.lastCall.args[0].should.include('Content');
        process.stdout.write.restore();
      });

      it('should log the differences between files', function() {
        var stdoutSpy = sinon.stub(process.stdout, 'write');
        htmlDiff([{
          path: 'test/fixtures/templateEngine1',
          name: 'engine1'
        }, {
          path: 'test/fixtures/templateEngine2',
          name: 'engine2'
        }]);
        stdoutSpy.lastCall.args[0].should.include('Content');
        process.stdout.write.restore();
      });

      it('should return false', function() {
        sinon.stub(process.stdout, 'write');
        htmlDiff([{
          path: 'test/fixtures/templateEngine1',
          name: 'engine1'
        }, {
          path: 'test/fixtures/templateEngine2',
          name: 'engine2'
        }]).should.eql(false);
        process.stdout.write.restore();
      });
    });
    describe('if the folders have the same contents', function () {

      it('should log a success message', function() {
        var consoleSpy = sinon.stub(console, 'log');
        htmlDiff([{
          path: 'test/fixtures/templateEngine1',
          name: 'engine1'
        }, {
          path: 'test/fixtures/templateEngine1Clone',
          name: 'engine1Clone'
        }]);
        consoleSpy.lastCall.args[0].should.include('All files matching');
        console.log.restore();
      });

      it('should return true', function() {
        sinon.stub(console, 'log');
        htmlDiff([{
          path: 'test/fixtures/templateEngine1',
          name: 'engine1'
        }, {
          path: 'test/fixtures/templateEngine1Clone',
          name: 'engine1Clone'
        }]).should.eql(true);
        console.log.restore();
      });
    });
  });
});
