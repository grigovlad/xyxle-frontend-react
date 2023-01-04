import React from 'react';
import {string, node, func, elementType} from 'prop-types';
import cx from 'classnames';

import './Icon.scss';

const Icon = ({className : classNameProp, icon: IconProp, onClick}) => {
  const className = cx('icon', classNameProp);

  return (
    <span className={className} onClick={onClick}>
      <IconProp />
    </span>
  );
};

Icon.propTypes = {
  children  : node,
  className : string,
  icon      : elementType,
  onClick   : func
};
Icon.defaultProps = {
  children  : null,
  className : '',
  icon      : null,
  onClick   : () => false
};
Icon.displayName = 'Icon';

export default Icon;
