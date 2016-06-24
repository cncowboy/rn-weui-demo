import React from 'react';
import { Text } from 'react-native';
import TimerMixin from '../TimerMixin';
import DomEvent from '../DomEvent';
import { TemplateFill } from '../TemplateFill';

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

//
class Element extends React.Component {
  constructor() {
    super();
    this.state = this.state || {};
    this.events = {
      onClick: React.PropTypes.func,
      onDbClick: React.PropTypes.func,
        //
        // onAbort: React.PropTypes.func,
        // onError: React.PropTypes.func,
        //
      onFocus: React.PropTypes.func,
      onSelect: React.PropTypes.func,
      onBlur: React.PropTypes.func,
        //
      onLoad: React.PropTypes.func,
      onChange: React.PropTypes.func,
      onResize: React.PropTypes.func,
      onUnLoad: React.PropTypes.func,
        //
        // onKeyDown: React.PropTypes.func,
        // onKeyPress: React.PropTypes.func,
        // onKeyUp: React.PropTypes.func,
        //
        // onMouseDown: React.PropTypes.func,
        // onMouseMove: React.PropTypes.func,
        // onMouseUp: React.PropTypes.func,
        //
      onTouchStart: React.PropTypes.func,
      onTouchMove: React.PropTypes.func,
      onTouchEnd: React.PropTypes.func,
      onTouchCancel: React.PropTypes.func
    };
    for (let eventName in this.events) {
      this.eventHandle = this.eventHandle || {};
      this.eventHandle[eventName] = [];
    }
    this.setTimeout = TimerMixin.setTimeout;
    this.clearTimeout = TimerMixin.clearTimeout;
    this.setInterval = TimerMixin.setInterval;
    this.clearInterval = TimerMixin.clearInterval;
    this.setImmediate = TimerMixin.setImmediate;
    this.clearImmediate = TimerMixin.clearImmediate;
    this.requestAnimationFrame = TimerMixin.requestAnimationFrame;
    this.cancelAnimationFrame = TimerMixin.cancelAnimationFrame;
  }
  _walkAndBindParent() {
    this.childNodes = this.props.children ?
        (({}).toString.call(this.props.children) == '[object Array]' ?
            this.props.children :
              (({}).toString.call(this.props.children) != '[object String]' ?
                  [this.props.children] : null)) :
                    this.props.children;
    let self = this;
    this.childNodes && this.childNodes.forEach(function (node) {
      if (node) {
        if (node._store) {
          try {
            node._store.parentNode = self;

          } catch (e) {
            // console.debug(e);
          }
        }
      }
    });
  }
  parentNode() {
    if (this._reactInternalInstance && this._reactInternalInstance._currentElement) {
      let o = this._reactInternalInstance._currentElement;
      if (o && o._store && o._store.parentNode) {
        return o._store.parentNode;
      } else if (this.props.parentNode) {
        return this.props.parentNode;
      }
    }
    return null;
  }
  tagName() {
    return this.constructor.toString().match(/function (\w+)\(\)/)[1];
  }
  /**
   * event
   */
  addEventListener(eventName, handle) {
    eventName = 'on' + eventName.capitalizeFirstLetter();
    this.eventHandle[eventName].push(handle);
  }
  removeEventListener(eventName, handle) {
    eventName = 'on' + eventName.capitalizeFirstLetter();
    if (!handle) {
      this.eventHandle[eventName] = [];
    } else {
      for (let i = 0, a = this.eventHandle[eventName]; i < a.length; i++) {
        if (a[i] == handle) {
          a.splice(i, 1);
          break;
        }
      }
    }
  }
  handleEvent(event) {
    // dom 1 event
    let eventName = 'on' + event.type.capitalizeFirstLetter();
    let handle = this[eventName];
    handle && handle(event);
    // dom 2 event
    let self = this;
    self.eventHandle[eventName] && self.eventHandle[eventName].forEach(function (item, index) {
      item && item.call(self, event);
    });
    // bubble
    if (event.bubbles) {
      let o;
      if (this._reactInternalInstance && this._reactInternalInstance._currentElement) {
        o = this._reactInternalInstance._currentElement;
      }
      o && o._store && o._store.parentNode && o._store.parentNode.handleEvent.apply(o._store.parentNode, arguments);
    }
  }
  componentWillMount() {
    super.componentWillMount && super.componentWillMount();
  }
  componentDidMount() {
    super.componentDidMount && super.componentDidMount();
    this.handleEvent.call(this, { type: 'load' });
  }
  componentWillUnmount() {
    super.componentWillUnmount && super.componentWillUnmount();
    // this.eventHandle = null;
    TimerMixin.componentWillUnmount.call(this);
    this.handleEvent.call(this, { type: 'unload' });
  }
  /**
   * render
   */
  render() {
    this.compatHTML();
    if (({}).toString.call(this.props.children) == '[object String]') {
      return (
        <TouchableWithoutFeedback onPress={(e) => { this.handleEvent.call(this, new DomEvent({ type: 'click', reactEvent: e })); }}>
        <View
          ref="i1"
          {...this.htmlProps}
          onTouchStart={(e) => { this.handleEvent.call(this, new DomEvent({ type: 'touchStart', reactEvent: e })); }}
          onTouchMove={(e) => { this.handleEvent.call(this, new DomEvent({ type: 'touchMove', reactEvent: e })); }}
          onTouchEnd={(e) => { this.handleEvent.call(this, new DomEvent({ type: 'touchEnd', reactEvent: e })); }}
        >
          <Text style={TemplateFill({
            color: null,
            fontFamily: null,
            fontSize: null,
            fontStyle: null,
            fontWeight: null,
            letterSpacing: null,
            textAlign: 'justify',
            textDecorationLine: null,
            textDecorationStyle: null,
            textDecorationColor: null,
            writingDirection: null,
            lineHeight: null,
            textAlignVertical: 'center'
          }, this.htmlProps.style)}
          >{this.state.children}</Text>
        </View>
        </TouchableWithoutFeedback>
      );
    } else if (({}).toString.call(this.props.children) == '[object Array]') {
      let htmlChildren = [];
      let self = this;
      this.props.children.forEach(function (item, idx) {
        if (item) {
          if (({}).toString.call(item) == '[object String]') {
            htmlChildren.push(React.createElement(Text, { style: TemplateFill({
              color: null,
              fontFamily: null,
              fontSize: null,
              fontStyle: null,
              fontWeight: null,
              letterSpacing: null,
              textAlign: null,
              textDecorationLine: null,
              textDecorationStyle: null,
              textDecorationColor: null,
              writingDirection: null
            }, self.htmlProps.style), key: idx }, item));
          } else {
            htmlChildren.push(item);
          }
        }

      });
      this.state.children = htmlChildren;
      return (
          <TouchableWithoutFeedback onPress={(e) => { this.handleEvent.call(this, new DomEvent({ type: 'click', reactEvent: e })); }}>
          <View
            ref="i1"
            {...this.htmlProps}
            onTouchStart={(e) => { this.handleEvent.call(this, new DomEvent({ type: 'touchStart', reactEvent: e })); }}
            onTouchMove={(e) => { this.handleEvent.call(this, new DomEvent({ type: 'touchMove', reactEvent: e })); }}
            onTouchEnd={(e) => { this.handleEvent.call(this, new DomEvent({ type: 'touchEnd', reactEvent: e })); }}
          >{this.state.children}</View>
          </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback onPress={(e) => { this.handleEvent.call(this, new DomEvent({ type: 'click', reactEvent: e })); }}>
        <View
          ref="i1"
          {...this.htmlProps}
          onTouchStart={(e) => { this.handleEvent.call(this, new DomEvent({ type: 'touchStart', reactEvent: e })); }}
          onTouchMove={(e) => { this.handleEvent.call(this, new DomEvent({ type: 'touchMove', reactEvent: e })); }}
          onTouchEnd={(e) => { this.handleEvent.call(this, new DomEvent({ type: 'touchEnd', reactEvent: e })); }}
        >
          {this.state.children}
        </View>
        </TouchableWithoutFeedback>
      );
    }

  }
  /**
   * 做html的兼容，比如style和dom事件
   */
  compatHTML(conf) {
    //
  }
  _defineParentNode(parentNode) {
    if (this._reactInternalInstance._currentElement._store) {
      this._reactInternalInstance._currentElement._store.parentNode = parentNode;
    }
  }
  html(o) {
    if (o) {
      this.setState({
        children: o
      });
    } else {
      return this.state.children;
    }
  }
  attr(k, v) {
    if (arguments.length == 2) {
      this.htmlProps[k] = v;
      this.render();
    } else if (arguments.length == 1) {
      return this.htmlProps[k];
    }
  }
  append(o) {
    let children = this.state.children.slice(0).concat([o]);
    this.setState({
      children: children
    });
  }
  before(o) {
    let children = [o].concat(this.state.children.slice(0));
    this.setState({
      children: children
    });
  }
  on(eventType, fn) {
    this.addEventListener(eventType, fn);
  }
  off(eventType, fn) {
    this.removeEventListener(eventType, fn);
  }
}

module.exports = Element;
