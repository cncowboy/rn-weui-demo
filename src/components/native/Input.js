import Element from './Element';
import DomEvent from '../DomEvent';

class Input extends Element {
  constructor() {
    super();
    this.defaultStyle = {
      borderBottomColor: 'black',
      borderWidth: 1,
      height: 30,
      width: 150
    };
    this.value = '';
  }
  render() {
    this.compatHTML();
    if (this.props.value) {
      this.value = this.props.value;
    }
    return (
      <TextInput ref="i1" autoCorrect={false} autoCapitalize="none"
        style={this.htmlProps.style}
        onChangeText={this._setValue.bind(this)}
        onChange={(e) => { this.handleEvent.call(this, new DomEvent({ type: 'change', reactEvent: e })); }}
        onFocus={(e) => { this.handleEvent.call(this, new DomEvent({ type: 'focus', reactEvent: e })); }}
        onBlur={(e) => { this.handleEvent.call(this, new DomEvent({ type: 'blur', reactEvent: e })); }}
        {...this.props}
      />
    );
  }
  _setValue(v) {
    this.value = v;
  }
  val(v) {
    if (v != null) {
      this.value = v;
    }
    if (v == undefined) {
      return this.value;
    }
  }

}
module.exports = Input;
