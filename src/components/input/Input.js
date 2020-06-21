import React, { PureComponent } from 'react';

class Input extends PureComponent {
  static defaultProps = {
    type: "text"
  }
  render() {
    const { label, placeholder, className, name, ...props } = this.props;
    
    return (
      <input name={name} id={name} placeholder={placeholder} {...props} />
    );
  }
}

export default Input;