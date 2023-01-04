import React from 'react';
import cx from 'classnames';

import {FaPen, FaTrashAlt} from 'react-icons/fa';
import {Icon} from '@shared-components';

import map from 'lodash/map';

const getApiKeysTableData = (apiKeysList = [], {onHeaderCell, onEditKey, onDeleteKey, translate, orderDir, orderColumn}) => {
  const columns = [
    {
      title     : translate('Api Key'),
      dataIndex : 'apiKey',
      key       : 'apiKey',
      width     : '60%',

      onHeaderCell : column => ({
        className : cx('rc-table-thead--sortable', orderDir, {ordered : orderColumn === 'key'}),
        onClick   : () => onHeaderCell(column)
      })
    },
    {
      title     : translate('Description'),
      dataIndex : 'description',
      key       : 'description',
      width     : '20%',

      onHeaderCell : column => ({
        className : cx('rc-table-thead--sortable', orderDir, {ordered : orderColumn === 'description'}),
        onClick   : () => onHeaderCell(column)
      })
    },
    {
      title     : translate('Actions'),
      dataIndex : '',
      key       : 'actions',
      width     : '20%',
      render    : item => ( // eslint-disable-line
        <>
          <Icon icon={FaPen} onClick={() => onEditKey(item)} />
          <Icon className="icon--danger ml-2" icon={FaTrashAlt} onClick={() => onDeleteKey(item)} />
        </>
      )
    }
  ];

  const data = map(apiKeysList, item => ({
    ...item,
    apiKey : item.key,
    key    : `${item.id}`
  }));


  return {
    columns,
    data
  };
};

export {
  getApiKeysTableData
};
