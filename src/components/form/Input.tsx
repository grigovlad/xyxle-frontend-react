import React from 'react';
import Icon from '../ui/icon/Icon';
import {elementType} from "prop-types";

interface Props extends React.HTMLProps<any> {
  error         : string,
  icon          : typeof elementType,
  iconClassName : string,
  isTextarea    : boolean
}

class Input extends React.Component<Props, any> {
  static defaultProps = {
    error: undefined,
    icon: undefined,
    iconClassName: undefined,
    isTextarea: false
  }

  render() {
    const {isTextarea, error, icon} = this.props;

    const InputComponent = isTextarea ? 'textarea' : 'input';

    if(!!icon) {
      const {iconClassName} = this.props;
      return (
        <span className="icon-input">
        <InputComponent {...this.props}/>
          {error && <div><span className="rc-input--error">{error}</span></div>}
          <Icon className={iconClassName}>icon</Icon>
      </span>
      );
    }

    return (
      <React.Fragment>
        <InputComponent {...this.props}/>
        {error && <div><span className="rc-input--error">{error}</span></div>}
      </React.Fragment>
    )
  }
}

export default Input;