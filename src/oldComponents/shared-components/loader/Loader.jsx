import React from 'react';
import {string, bool} from 'prop-types';
import cx from 'classnames';

import './Loader.scss';

const Loader = ({className: classNameProp, isLoading}) => {
  const className = cx('loader-spinner', classNameProp);

  if (!isLoading) {
    return null;
  }

  return (
    <div className={className} />
  );
};

Loader.propTypes = {
  className : string,
  isLoading : bool
};
Loader.defaultProps = {
  className : '',
  isLoading : false
};
Loader.displayName = 'Loader';

export default Loader;
