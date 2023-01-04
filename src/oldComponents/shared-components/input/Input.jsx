import React from 'react';
import {string, func, bool, elementType} from 'prop-types';
import cx from 'classnames';
import Icon from '../icon/Icon';

import './Input.scss';

const Input = ({className : classNameProp, error, icon: ReactIcon, iconClassName : iconClassNameProp, isDisabled, isTextArea, ...rest}) => {
  const className = cx('rc-input', {
    'icon-input'      : Boolean(Icon),
    'rc-input--error' : Boolean(error)
  }, classNameProp);
  const iconClassName = cx('icon--base', iconClassNameProp);
  const InputComponent = isTextArea ? 'textarea' : 'input';

  if (ReactIcon) {
    return (
      <span className="icon-input">
        <InputComponent
          className={className}
          disabled={isDisabled}
          {...rest}
        />
        {error && <div><span className="rc-input--error">{error}</span></div>}
        <Icon className={iconClassName} icon={ReactIcon} />
      </span>
    );
  }

  return (
    <React.Fragment>
      <InputComponent
        className={className}
        disabled={isDisabled}
        {...rest}
      />
      {error && <div><span className="rc-input--error">{error}</span></div>}
    </React.Fragment>
  );
};

Input.propTypes = {
  autoComplete  : string,
  className     : string,
  error         : string,
  icon          : elementType,
  iconClassName : string,
  isDisabled    : bool,
  isTextArea    : bool,
  name          : string,
  onChange      : func
};
Input.defaultProps = {
  autoComplete  : 'off',
  className     : '',
  error         : '',
  icon          : null,
  iconClassName : '',
  isDisabled    : false,
  isTextArea    : false,
  name          : '',
  onChange      : () => false
};
Input.displayName = 'Input';

export default Input;
