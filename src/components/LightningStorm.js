/**
 * ReactMix Base Framework
 * @version alpha
 * @nickname lightningstorm project
 * @author xueduanyang1985@163.com
 */

export let window = window || new Function('return this')();
window.isNative = true;
if (window.document) {
  window.isNative = false;
}

import './String';
import './Date';
import './console';

//

// 并入定时器api，为componentWillUnMount做准备
window.TimerMixin = require('./TimerMixin');


if (window.isNative) {
  window.React = require('react-native');
  window.requireNativeComponent = window.React.requireNativeComponent;
  window.DomEvent = require('./DomEvent');

  //
  window.Element = require('./native/Element');
  window.Text = window.React.Text;
  window.View = window.React.View;
  window.StyleSheet = window.React.StyleSheet;
  window.Image = window.React.Image;
  window.TouchableOpacity = window.React.TouchableOpacity;
  window.TouchableWithoutFeedback = window.React.TouchableWithoutFeedback;
  window.TextInput = window.React.TextInput;
  //
  window.Input = require('./native/Input');
  window.Navigator = window.React.Navigator;
  // window.NavBar = require('react-native-navbar');

  window.ListView = window.React.ListView;

  //
  window.ScrollView = window.React.ScrollView;
  //

} else {
  // 这里是ui.js
}
/**
 * 全局加载css的函数方法
 */
window.includeCSS = function (o) {
  //
};

window.Animation = require('./Animation');
window.animation = new window.Animation();

// UI Component
if (window.isNative) {
  //
}

