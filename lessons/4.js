//
// Lesson 4
// Listening to events
//

var Rx = require('rx');
var assert = require('assert');
var events = require('events');
var util = require('util');

function TestEvent() {}
util.inherits(TestEvent, events.EventEmitter);

describe('lesson 4', function() {
  var emitter;

  beforeEach(function() {
    emitter = new TestEvent();
  });

  it('SubscribingToEvents', function() {
    var result = '';
    var subscription = Rx.Observable
      .fromEvent(emitter, 'data')
      .subscribe(function(x) { result += x; });

    emitter.emit('data', 'h');
    emitter.emit('data', 'e');
    emitter.emit('data', 'l');
    emitter.emit('data', 'l');
    emitter.emit('data', 'o');

    assert.equal(result, 'hello'/*TODO:underscore*/);
  });

  it('DisposingOfSubscriptions', function() {
    var result = '';
    var subscription = Rx.Observable
      .fromEvent(emitter, 'data')
      .subscribe(function(x) { result += x; });

    emitter.emit('data', 'h');
    emitter.emit('data', 'e');
    emitter.emit('data', 'l');
    emitter.emit('data', 'l');
    subscription.dispose();
    emitter.emit('data', 'o');

    assert.equal(result, 'hell'/*TODO:underscore*/);
  });

  it('ThrottlingEvents', function(done) {
    var result = '';
    var subscription = Rx.Observable
      .fromEvent(emitter, 'data')
      .throttle(10)
      .subscribe(function(x) { result += x; });

    emitter.emit('data', 'h');
    emitter.emit('data', 'e');
    emitter.emit('data', 'l');
    emitter.emit('data', 'l');
    emitter.emit('data', 'o');

    setTimeout(function() {
      assert.equal(result, 'o'/*TODO:underscore*/);
      done();
    }, 20);
  });

  it('FilteringEvents', function() {
    var result = '';
    var subscription = Rx.Observable
      .fromEvent(emitter, 'data')
      .filter(function(x) { return x === 'l'/*TODO:underscore*/; })
      .subscribe(function(x) { result += x; });

    emitter.emit('data', 'h');
    emitter.emit('data', 'e');
    emitter.emit('data', 'l');
    emitter.emit('data', 'l');
    emitter.emit('data', 'o');

    assert.equal(result, 'll'/*TODO:underscore*/);
  });
});