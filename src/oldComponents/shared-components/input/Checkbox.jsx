import React from 'react';
import {string, bool} from 'prop-types';
import cx from 'classnames';
import Checkbox from 'rc-checkbox';

import 'rc-checkbox/assets/index.css';
import './Checkbox.scss';

const RcCheckbox = ({className : classNameProp, error, isDisabled, ...rest}) => {
  const className = cx({
    'rc-checkbox--error' : Boolean(error)
  }, classNameProp);

  return (
    <React.Fragment>
      <Checkbox
        className={className}
        disabled={isDisabled}
        {...rest}
      />
      {error && <div><span className="rc-checkbox--error">{error}</span></div>}
    </React.Fragment>
  );
};

RcCheckbox.propTypes = {
  className  : string,
  error      : string,
  isDisabled : bool
};
RcCheckbox.defaultProps = {
  className  : '',
  error      : '',
  isDisabled : false
};
RcCheckbox.displayName = 'RcCheckbox';

export default RcCheckbox;
