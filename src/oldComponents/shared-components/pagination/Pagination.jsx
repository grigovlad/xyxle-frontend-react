import React, {useState} from 'react';
import {string, func, number, oneOfType} from 'prop-types';
import Pagination from 'rc-pagination';
import cx from 'classnames';

import './Pagination.scss';

const RCPagination = ({total, className: classNameProp, onChange}) => {
  const [current, setCurrent] = useState(1);
  const className = cx(classNameProp);

  return (
    <Pagination
      className={className}
      current={current}
      onChange={(page, ...rest) => {
        setCurrent(page);
        onChange(page, ...rest);
      }}
      showSizeChanger
      showTotal={(totalNumber, range) => {
        if (range[1] < range[0]) {
          return `1 - ${totalNumber} of ${totalNumber} items`;
        }

        return `${range[0]} - ${range[1]} of ${totalNumber} items`;
      }
      }
      total={total}
    />
  );
};

RCPagination.propTypes = {
  className : string,
  onChange  : func,
  total     : oneOfType([string, number])
};
RCPagination.defaultProps = {
  className : '',
  onChange  : () => false,
  total     : 0
};
RCPagination.displayName = 'RCPagination';

export default RCPagination;
