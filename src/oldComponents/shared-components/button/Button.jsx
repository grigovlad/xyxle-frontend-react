import React from 'react';
import {string, func, node} from 'prop-types';
import cx from 'classnames';

import './Button.scss';

const Button = ({children, className: classNameProp, onClick, size, type}) => {
  const className = cx('rc-button', `button--${size}`, classNameProp);

  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children  : node,
  className : string,
  onClick   : func,
  size      : string,
  type      : string
};
Button.defaultProps = {
  children  : null,
  className : '',
  onClick   : () => false,
  size      : 'normal',
  type      : 'button'
};
Button.displayName = 'Button';

export default Button;
