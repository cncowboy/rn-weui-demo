import { window } from '../components/LightningStorm';

(function (global) {

  // __filename
  if (typeof global.__filename === 'undefined') {
    global.__filename = '__filename';
  }

})(global || window || this);
