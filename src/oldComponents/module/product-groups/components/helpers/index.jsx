import React from 'react';
import cx from 'classnames';

import {FaPen, FaTrashAlt} from 'react-icons/fa';
import {Icon} from '@shared-components';

import map from 'lodash/map';

const getProductGroupsTableData = (productGroupList = [], {onHeaderCell, onEdit, onDelete, translate, orderDir, orderColumn}) => {
  const columns = [
    {
      title     : translate('Users'),
      dataIndex : 'usersNumber',
      key       : 'usersNumber',
      width     : '20%',

      onHeaderCell : column => ({
        className : cx('rc-table-thead--sortable', orderDir, {ordered : orderColumn === 'usersNumber'}),
        onClick   : () => onHeaderCell(column)
      })
    },
    {
      title     : translate('Date added'),
      dataIndex : 'createdAt',
      key       : 'createdAt',
      width     : '20%',

      onHeaderCell : column => ({
        className : cx('rc-table-thead--sortable', orderDir, {ordered : orderColumn === 'createdAt'}),
        onClick   : () => onHeaderCell(column)
      })
    },
    {
      title     : translate('Name'),
      dataIndex : 'name',
      key       : 'name',
      width     : '20%',

      onHeaderCell : column => ({
        className : cx('rc-table-thead--sortable', orderDir, {ordered : orderColumn === 'name'}),
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
          <Icon icon={FaPen} onClick={() => onEdit(item)} />
          <Icon className="icon--danger ml-2" icon={FaTrashAlt} onClick={() => onDelete(item)} />
        </>
      )
    }
  ];

  const data = map(productGroupList, item => ({
    ...item,
    key : `${item.id}`
  }));


  return {
    columns,
    data
  };
};

export {
  getProductGroupsTableData
};
