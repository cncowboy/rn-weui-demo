/*
 *  Copyright (c) 2015-present, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';

import { window } from './LightningStorm';

let GLOBAL = typeof window === 'undefined' ? global : window;

let setter = function (_setter, _clearer, array) {
  return function (callback, delta) {
    let id = _setter(function () {
      _clearer.call(this, id);
      callback.apply(this, arguments);
    }.bind(this), delta);

    if (!this[array]) {
      this[array] = [id];
    } else {
      this[array].push(id);
    }
    return id;
  };
};

let clearer = function (_clearer, array) {
  return function (id) {
    if (this[array]) {
      let index = this[array].indexOf(id);
      if (index !== -1) {
        this[array].splice(index, 1);
      }
    }
    _clearer(id);
  };
};

let _timeouts = 'TimerMixin_timeouts';
let _clearTimeout = clearer(GLOBAL.clearTimeout, _timeouts);
let _setTimeout = setter(GLOBAL.setTimeout, _clearTimeout, _timeouts);

let _intervals = 'TimerMixin_intervals';
let _clearInterval = clearer(GLOBAL.clearInterval, _intervals);
let _setInterval = setter(GLOBAL.setInterval, function () { /* noop */ }, _intervals);

let _immediates = 'TimerMixin_immediates';
let _clearImmediate = clearer(GLOBAL.clearImmediate, _immediates);
let _setImmediate = setter(GLOBAL.setImmediate, _clearImmediate, _immediates);

let _rafs = 'TimerMixin_rafs';
let _cancelAnimationFrame = clearer(GLOBAL.cancelAnimationFrame, _rafs);
let _requestAnimationFrame = setter(GLOBAL.requestAnimationFrame, _cancelAnimationFrame, _rafs);

let TimerMixin = {
  componentWillUnmount: function () {
    this[_timeouts] && this[_timeouts].forEach(function (id) {
      GLOBAL.clearTimeout(id);
    });
    this[_timeouts] = null;
    this[_intervals] && this[_intervals].forEach(function (id) {
      GLOBAL.clearInterval(id);
    });
    this[_intervals] = null;
    this[_immediates] && this[_immediates].forEach(function (id) {
      GLOBAL.clearImmediate(id);
    });
    this[_immediates] = null;
    this[_rafs] && this[_rafs].forEach(function (id) {
      GLOBAL.cancelAnimationFrame(id);
    });
    this[_rafs] = null;
  },

  setTimeout: _setTimeout,
  clearTimeout: _clearTimeout,

  setInterval: _setInterval,
  clearInterval: _clearInterval,

  setImmediate: _setImmediate,
  clearImmediate: _clearImmediate,

  requestAnimationFrame: _requestAnimationFrame,
  cancelAnimationFrame: _cancelAnimationFrame
};

module.exports = TimerMixin;
