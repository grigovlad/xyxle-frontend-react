import React from 'react';
import {string, array} from 'prop-types';
import Table from 'rc-table';
import cx from 'classnames';

import './Table.scss';

const RCTable = ({className : classNameProp, columns, data, ...rest}) => {
  const className = cx(classNameProp);

  return (
    <Table
      className={className}
      columns={columns}
      data={data}
      {...rest}
    />
  );
};

RCTable.propTypes = {
  className : string,
  columns   : array,
  data      : array
};
RCTable.defaultProps = {
  className : '',
  columns   : [],
  data      : []
};
RCTable.displayName = 'RCTable';

export default RCTable;
