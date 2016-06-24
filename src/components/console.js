/**
 * 对于console事件做兼容
 */
import { window } from './LightningStorm';

if (!window.console) {
  window.console = {
    log: function () {},
    debug: function () {},
    error: function () {},
    warn: function () {}
  };
} else {
  if (!window.console.log) {
    window.console.log = function () {};
  }
  if (!window.console.debug) {
    window.console.debug = function () {};
  }
  if (!window.console.debug) {
    window.console.debug = function () {};
  }
  if (!window.console.debug) {
    window.console.debug = function () {};
  }
}
